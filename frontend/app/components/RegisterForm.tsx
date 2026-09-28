"use client";

import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Check, X, ShieldCheck } from "lucide-react";

interface RegisterFormProps {
  onSuccessRegister: (registeredEmail: string) => void;
  onSwitchToLogin: () => void;
}

export default function RegisterForm({
  onSuccessRegister,
  onSwitchToLogin,
}: RegisterFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Business Rule 1: Mật khẩu >= 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const criteriaMetCount = [hasMinLength, hasUppercase, hasLowercase, hasNumber].filter(Boolean).length;
  const isPasswordValid = criteriaMetCount === 4;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setErrorMsg("Vui lòng điền đầy đủ các trường thông tin bắt buộc.");
      return;
    }
    if (!isPasswordValid) {
      setErrorMsg("Mật khẩu chưa đáp ứng tiêu chuẩn an toàn bảo mật.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.");
      return;
    }
    if (!agreeTerms) {
      setErrorMsg("Bạn cần đồng ý với Điều khoản dịch vụ để tiếp tục.");
      return;
    }

    setErrorMsg(null);
    onSuccessRegister(email);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-card-glass relative overflow-hidden">
        {/* Accent top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-brand-teal to-brand-orange" />

        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-semibold mb-2">
            <span>Tạo tài khoản mới</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Khởi Tạo Tài Khoản
          </h2>
          <p className="text-xs sm:text-sm text-brand-gray-muted mt-1">
            Đăng ký để xác thực email & nhận đề xuất lộ trình học tối ưu
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Full name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gray-muted mb-1">
              Họ và tên học viên
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-brand-teal absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gray-muted mb-1">
              Địa chỉ Email (Nhận mã OTP)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-brand-teal absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="hocvien@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gray-muted mb-1">
              Mật khẩu bảo mật
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-teal absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Tối thiểu 8 ký tự..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl glass-input text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-gray-muted hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Strength Meter & Checklist */}
            {password.length > 0 && (
              <div className="mt-2.5 p-3 rounded-xl bg-brand-dark-surface/80 border border-brand-gray-border/50 text-[11px] space-y-1.5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between font-semibold mb-1">
                  <span className="text-brand-gray-muted">Độ an toàn mật khẩu:</span>
                  <span className={
                    criteriaMetCount <= 2 ? "text-rose-400" :
                    criteriaMetCount === 3 ? "text-amber-400" : "text-emerald-400"
                  }>
                    {criteriaMetCount <= 2 ? "Yếu" : criteriaMetCount === 3 ? "Khá" : "Rất an toàn"}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-brand-dark-bg rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      criteriaMetCount <= 2 ? "w-1/3 bg-rose-500" :
                      criteriaMetCount === 3 ? "w-2/3 bg-amber-500" : "w-full bg-emerald-500"
                    }`}
                  />
                </div>

                {/* Checklist (Business Rule 1) */}
                <div className="grid grid-cols-2 gap-1 pt-1 text-[10px]">
                  <span className={`flex items-center gap-1 ${hasMinLength ? "text-emerald-400" : "text-brand-gray-muted"}`}>
                    {hasMinLength ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} ≥ 8 ký tự
                  </span>
                  <span className={`flex items-center gap-1 ${hasUppercase ? "text-emerald-400" : "text-brand-gray-muted"}`}>
                    {hasUppercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Có chữ in hoa (A-Z)
                  </span>
                  <span className={`flex items-center gap-1 ${hasLowercase ? "text-emerald-400" : "text-brand-gray-muted"}`}>
                    {hasLowercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Có chữ thường (a-z)
                  </span>
                  <span className={`flex items-center gap-1 ${hasNumber ? "text-emerald-400" : "text-brand-gray-muted"}`}>
                    {hasNumber ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Có chữ số (0-9)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gray-muted mb-1">
              Xác nhận lại mật khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-teal absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Nhập lại mật khẩu..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2 text-xs text-brand-gray cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded accent-brand-orange bg-brand-dark-bg cursor-pointer"
              />
              <span>
                Tôi đồng ý với <strong className="text-white hover:underline">Điều khoản sử dụng</strong> và chính sách bảo vệ tài khoản Single Active Session.
              </span>
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full mt-3 py-3 px-4 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-bold shadow-glow-orange flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]"
          >
            <UserPlus className="w-4 h-4" />
            <span>Tiếp Tục Xác Thực Email (OTP)</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-brand-gray-border text-center text-xs text-brand-gray">
          <span>Đã có tài khoản học viên? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-brand-teal-light hover:text-white font-bold hover:underline ml-1"
          >
            Đăng nhập tại đây
          </button>
        </div>
      </div>
    </div>
  );
}
