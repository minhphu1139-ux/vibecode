"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, ArrowRight, X, KeyRound } from "lucide-react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md glass-panel bg-brand-dark-card border border-brand-teal/40 rounded-2xl p-6 shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 text-brand-gray-muted hover:text-white p-1 rounded-lg hover:bg-brand-dark-surface transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand-teal/20 border border-brand-teal/40 flex items-center justify-center text-brand-teal-light">
                <KeyRound className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Khôi Phục Mật Khẩu</h3>
                <span className="text-xs text-brand-teal-light">Quy trình cấp lại qua Email (E2)</span>
              </div>
            </div>

            <p className="text-sm text-brand-gray mb-4 leading-relaxed">
              Nhập địa chỉ email đăng ký tài khoản của bạn. Hệ thống sẽ gửi một liên kết bảo mật (Magic Link) có hiệu lực trong vòng <strong>15 phút</strong>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gray-muted mb-1.5">
                  Email đăng ký
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-brand-teal absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="hocvien@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm focus:border-brand-teal"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-bold shadow-glow-orange flex items-center justify-center gap-2 transition"
                >
                  <span>Gửi liên kết xác thực</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="py-2.5 px-4 rounded-xl bg-brand-dark-surface hover:bg-brand-teal-deep text-brand-gray text-sm font-semibold border border-brand-gray-border transition"
                >
                  Quay lại
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Đã Gửi Hướng Dẫn!</h3>
            <p className="text-sm text-brand-gray mb-6 leading-relaxed">
              Chúng tôi đã gửi email khôi phục mật khẩu tới <br />
              <strong className="text-brand-orange">{email}</strong>. Vui lòng kiểm tra hộp thư (kể cả mục Spam).
            </p>
            <button
              onClick={handleReset}
              className="w-full py-2.5 px-4 rounded-xl bg-brand-teal hover:bg-brand-teal-hover text-white text-sm font-bold transition shadow-glow-teal"
            >
              Đã hiểu, quay lại Đăng nhập
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
