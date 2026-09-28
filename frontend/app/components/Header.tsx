"use client";

import React from "react";
import { ShieldCheck, BookOpen, Sparkles, ExternalLink } from "lucide-react";

interface HeaderProps {
  currentStepTitle?: string;
  onReset?: () => void;
}

export default function Header({ currentStepTitle, onReset }: HeaderProps) {
  return (
    <header className="w-full border-b border-brand-gray-border glass-panel sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-brand-teal flex items-center justify-center shadow-glow-teal">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-lg tracking-tight">
                VIBE<span className="text-brand-orange">EDU</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-brand-teal text-white border border-brand-teal-light/40">
                Flow 01
              </span>
            </div>
            <p className="text-xs text-brand-gray-muted hidden sm:block">
              Hệ Thống Xác Thực & Onboarding Chuẩn Hóa
            </p>
          </div>
        </div>

        {/* Current State / Badge */}
        {currentStepTitle && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-teal-deep/80 border border-brand-teal/40">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
            <span className="text-xs text-brand-gray font-medium">
              Đang ở bước: <strong className="text-white">{currentStepTitle}</strong>
            </span>
          </div>
        )}

        {/* Security & Action Indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-brand-teal-light px-2.5 py-1 rounded-md bg-brand-teal-deep border border-brand-teal/30">
            <ShieldCheck className="w-4 h-4 text-brand-orange" />
            <span className="hidden sm:inline">Single Active Session</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" title="Bảo mật đang kích hoạt" />
          </div>

          <a
            href="../01-Xac-Thuc-Va-Onboarding.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-orange/15 hover:bg-brand-orange/25 text-brand-orange border border-brand-orange/40 transition"
          >
            <span>Sơ đồ Mermaid</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
