"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, Clock, RotateCcw, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

interface OtpVerificationProps {
  email?: string;
  onSuccessVerify: () => void;
  onBackToRegister: () => void;
}

export default function OtpVerification({
  email = "hocvien@gmail.com",
  onSuccessVerify,
  onBackToRegister,
}: OtpVerificationProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300s
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setErrorMsg(null);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = () => {
    const fullCode = otp.join("");
    if (fullCode.length < 6) {
      setErrorMsg("Vui lòng nhập đủ 6 chữ số mã OTP.");
      return;
    }

    if (timeLeft <= 0) {
      setErrorMsg("Mã OTP đã hết hiệu lực. Vui lòng bấm 'Gửi lại mã mới'.");
      return;
    }

    // Success simulation
    setIsSuccess(true);
    setTimeout(() => {
      onSuccessVerify();
    }, 900);
  };

  const handleResend = () => {
    setTimeLeft(300);
    setOtp(["", "", "", "", "", ""]);
    setErrorMsg(null);
    inputRefs.current[0]?.focus();
  };

  // Masked email: nguyen***@gmail.com
  const maskEmail = (str: string) => {
    const parts = str.split("@");
    if (parts.length < 2) return str;
    const name = parts[0];
    const domain = parts[1];
    const maskedName = name.slice(0, 2) + "***" + (name.length > 3 ? name.slice(-1) : "");
    return `${maskedName}@${domain}`;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-card-glass text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-teal via-brand-orange to-brand-teal" />

        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-brand-teal/20 border border-brand-teal/40 flex items-center justify-center text-brand-teal-light shadow-glow-teal">
          <Mail className="w-7 h-7 text-brand-orange" />
        </div>

        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Xác Thực Địa Chỉ Email
        </h2>
        
        <p className="text-xs sm:text-sm text-brand-gray mt-2 leading-relaxed">
          Chúng tôi đã gửi mã xác thực 6 chữ số đến địa chỉ email:
          <br />
          <strong className="text-brand-orange font-bold">{maskEmail(email)}</strong>
        </p>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>Xác thực thành công! Đang chuyển hướng...</span>
          </div>
        )}

        {/* 6 OTP Inputs */}
        <div className="flex justify-center gap-2 sm:gap-3 my-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={idx === 0 ? handlePaste : undefined}
              className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-black rounded-xl glass-input transition-all ${
                digit
                  ? "border-brand-orange text-brand-orange bg-brand-orange/10 shadow-glow-orange"
                  : "border-brand-gray-border focus:border-brand-teal"
              }`}
            />
          ))}
        </div>

        {/* Timer & Resend */}
        <div className="flex items-center justify-between text-xs text-brand-gray mb-6 px-1">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className={`w-3.5 h-3.5 ${timeLeft < 60 ? "text-rose-400" : "text-brand-teal-light"}`} />
            <span>
              Mã hết hạn sau:{" "}
              <strong className={timeLeft < 60 ? "text-rose-400" : "text-white"}>
                {formatTime(timeLeft)}
              </strong>
            </span>
          </div>

          <button
            type="button"
            onClick={handleResend}
            disabled={timeLeft > 0 && timeLeft < 280}
            className="flex items-center gap-1 text-brand-orange hover:text-brand-orange-light font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Gửi lại mã</span>
          </button>
        </div>

        {/* Verify CTA */}
        <button
          type="button"
          onClick={handleVerify}
          disabled={isSuccess || otp.join("").length < 6}
          className="w-full py-3 px-4 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-bold shadow-glow-orange flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Xác Nhận & Bắt Đầu Khảo Sát</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onBackToRegister}
          className="mt-4 text-xs text-brand-gray-muted hover:text-white underline transition"
        >
          Nhập sai email? Quay lại đăng ký
        </button>
      </div>
    </div>
  );
}
