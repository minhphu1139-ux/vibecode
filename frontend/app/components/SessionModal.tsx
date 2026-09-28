"use client";

import React from "react";
import { AlertTriangle, Monitor, ShieldAlert, X } from "lucide-react";

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmRevoke: () => void;
}

export default function SessionModal({
  isOpen,
  onClose,
  onConfirmRevoke,
}: SessionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md glass-panel bg-brand-dark-card border border-rose-500/40 rounded-2xl p-6 shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-gray-muted hover:text-white p-1 rounded-lg hover:bg-brand-dark-surface transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Xung Đột Phiên Đăng Nhập</h3>
            <span className="text-xs text-rose-400 font-semibold tracking-wide uppercase">
              Cơ chế Single Active Session (E3)
            </span>
          </div>
        </div>

        {/* Warning Description */}
        <p className="text-sm text-brand-gray leading-relaxed mb-4">
          Tài khoản của bạn hiện đang hoạt động trên một thiết bị khác. Nhằm bảo vệ bản quyền nội dung và chống chia sẻ tài khoản, hệ thống chỉ cho phép <strong>01 thiết bị duy nhất</strong> đăng nhập tại một thời điểm.
        </p>

        {/* Conflict Device Details Card */}
        <div className="bg-brand-dark-bg/90 border border-brand-gray-border rounded-xl p-3.5 mb-5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-brand-gray-muted flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-brand-orange" />
              Thiết bị đang hoạt động:
            </span>
            <span className="font-semibold text-white">MacBook Pro (Chrome 124)</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-brand-gray-muted">Vị trí ước tính:</span>
            <span className="text-brand-gray">Hà Nội, Việt Nam (IP: 113.161.xx.xx)</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-brand-gray-muted">Hoạt động gần nhất:</span>
            <span className="text-emerald-400 font-medium">2 phút trước</span>
          </div>
        </div>

        {/* Policy notice */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-200 mb-5 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            Nếu bạn tiếp tục, phiên trên thiết bị cũ sẽ tự động bị đăng xuất ngay lập tức.
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={onConfirmRevoke}
            className="flex-1 py-2.5 px-4 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-bold shadow-glow-orange transition"
          >
            Đăng xuất thiết bị cũ & Tiếp tục
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-brand-dark-surface hover:bg-brand-teal-deep text-brand-gray text-sm font-semibold border border-brand-gray-border transition"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
}
