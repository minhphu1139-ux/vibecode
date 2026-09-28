"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, ArrowRight } from "lucide-react";

interface LoginFormProps {
  onSuccessLogin: () => void;
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
  onTriggerSessionConflict: () => void;
  isLockedOut?: boolean;
}

export default function LoginForm({
  onSuccessLogin,
  onSwitchToRegister,
  onForgotPassword,
  onTriggerSessionConflict,
  isLockedOut = false,
}: LoginFormProps) {
  const [email, setEmail] = useState("hocvien.demo@vibeeducation.vn");
  const [password, setPassword] = useState("Matkhau@123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut || attempts >= 5) {
      setErrorMsg("Tài khoản đang bị tạm khóa 15 phút do nhập sai mật khẩu quá 5 lần (E1).");
      return;
    }

    // Demo validation
    if (!email || !password) {
      setErrorMsg("Vui lòng điền đầy đủ Email và Mật khẩu.");
      return;
    }

    // Success simulation
    setErrorMsg(null);
    onSuccessLogin();
  };

  const simulateFailedAttempt = () => {
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    if (nextAttempts >= 5) {
      setErrorMsg("BÁO ĐỘNG BẢO MẬT: Bạn đã nhập sai mật khẩu 5 lần! Tài khoản tạm thời bị khóa 15 phút (Quy tắc E1).");
    } else {
      setErrorMsg(`Mật khẩu không chính xác! Bạn còn ${5 - nextAttempts} lần thử.`);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Card Wrapper */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-card-glass relative overflow-hidden">
        {/* Accent top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-teal via-brand-orange to-brand-teal" />

        {/* Title & subtitle */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal-deep border border-brand-teal/30 text-brand-teal-light text-xs font-semibold mb-2">
            <span>Chào mừng trở lại!</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Đăng Nhập Học Viên
          </h2>
          <p className="text-xs sm:text-sm text-brand-gray-muted mt-1">
            Truy cập khóa học và quản lý lộ trình học tập cá nhân
          </p>
        </div>

        {/* Lockout Warning Banner (E1) */}
        {(isLockedOut || attempts >= 5) && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs leading-relaxed flex items-start gap-2.5 animate-pulse">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-rose-200">Tài khoản tạm khóa 15 phút (E1)</strong>
              Hệ thống đã gửi cảnh báo bảo mật đến email của bạn để xác minh danh tính.
            </div>
          </div>
        )}

        {/* Normal error message */}
        {errorMsg && !(isLockedOut || attempts >= 5) && (
          <div className="mb-5 p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gray-muted mb-1.5">
              Địa chỉ Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-brand-teal absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                disabled={isLockedOut || attempts >= 5}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gray-muted">
                Mật khẩu
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs text-brand-orange hover:text-brand-orange-light font-medium transition"
              >
                Quên mật khẩu?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-teal absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                disabled={isLockedOut || attempts >= 5}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl glass-input text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-gray-muted hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me & test helper */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-brand-gray">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded accent-brand-teal bg-brand-dark-bg cursor-pointer"
              />
              <span>Duy trì đăng nhập (14 ngày)</span>
            </label>

            <button
              type="button"
              onClick={simulateFailedAttempt}
              className="text-[11px] text-amber-400 hover:text-amber-300 underline font-medium"
              title="Click để test thử trường hợp gõ sai mật khẩu"
            >
              Thử gõ sai pass
            </button>
          </div>

          {/* Submit button (Bright Orange #F26B38) */}
          <button
            type="submit"
            disabled={isLockedOut || attempts >= 5}
            className="w-full py-3 px-4 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-bold shadow-glow-orange flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogIn className="w-4 h-4" />
            <span>Đăng Nhập</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-brand-gray-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-brand-dark-card text-brand-gray-muted">Hoặc tiếp tục với</span>
          </div>
        </div>

        {/* SSO Providers */}
        <div className="grid grid-cols-2 gap-3">
          {/* Google SSO */}
          <button
            type="button"
            onClick={onSuccessLogin}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-brand-dark-surface/90 hover:bg-brand-teal-deep text-xs font-semibold text-white border border-brand-gray-border transition hover:border-brand-teal"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.56 0 2.97.55 4.09 1.44l3.07-3.07C17.3 1.63 14.83 1 12 1 7.42 1 3.55 3.63 1.69 7.45l3.66 2.84C6.23 7.39 8.87 5 12 5z"/>
              <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.71 2.88c2.16-1.99 3.71-4.93 3.71-8.7z"/>
              <path fill="#FBBC05" d="M5.35 14.71c-.24-.71-.38-1.47-.38-2.26s.14-1.55.38-2.26L1.69 7.35C.61 9.47 0 11.66 0 14.45s.61 4.98 1.69 7.1l3.66-2.84z"/>
              <path fill="#34A853" d="M12 23.5c3.24 0 5.95-1.08 7.93-2.91l-3.71-2.88c-1.08.73-2.45 1.16-4.22 1.16-3.13 0-5.77-2.39-6.65-5.29L1.69 16.42C3.55 20.24 7.42 22.87 12 22.87z"/>
            </svg>
            <span>Google</span>
          </button>

          {/* Apple SSO */}
          <button
            type="button"
            onClick={onSuccessLogin}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-brand-dark-surface/90 hover:bg-brand-teal-deep text-xs font-semibold text-white border border-brand-gray-border transition hover:border-brand-teal"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.05-7.64-7.85-11.87-14.39-6.24-9.74-11.16-20.73-14.75-32.96-3.59-12.24-5.39-23.77-5.39-34.61 0-14.54 3.73-26.68 11.18-36.43 7.46-9.74 16.73-14.7 27.81-14.88 5.25.13 10.96 1.48 17.13 4.05 6.17 2.57 10.15 3.93 11.95 4.08 2.22-.38 6.44-1.89 12.67-4.52 6.23-2.63 11.64-3.79 16.24-3.48 15.08 1.03 26.61 6.53 34.58 16.51-13.23 8.01-19.64 19.16-19.23 33.45.41 11.17 4.54 20.48 12.39 27.93 7.85 7.45 17.27 11.75 28.27 12.89-2.22 6.64-4.87 13.06-7.95 19.26zM119.22 33.15c0-7.79 2.76-15.09 8.28-21.91 5.52-6.82 12.33-11.02 20.43-12.61.27 1.46.41 2.87.41 4.23 0 7.79-2.88 15.22-8.64 22.28-5.76 7.07-12.77 11.23-21.03 12.48-.41-1.46-.62-2.95-.62-4.47z"/>
            </svg>
            <span>Apple ID</span>
          </button>
        </div>

        {/* Switch to Register link */}
        <div className="mt-6 pt-4 border-t border-brand-gray-border text-center text-xs text-brand-gray">
          <span>Chưa có tài khoản học viên? </span>
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-brand-orange hover:text-brand-orange-light font-bold hover:underline ml-1"
          >
            Đăng ký ngay & Nhận lộ trình
          </button>
        </div>
      </div>
    </div>
  );
}
