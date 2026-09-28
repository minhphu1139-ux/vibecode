"use client";

import React from "react";
import { 
  LogIn, 
  UserPlus, 
  KeyRound, 
  Compass, 
  HelpCircle, 
  Sparkles, 
  LayoutDashboard,
  AlertTriangle,
  RotateCcw
} from "lucide-react";

export type FlowStep = 
  | "login" 
  | "register" 
  | "otp" 
  | "survey" 
  | "quiz" 
  | "recommendation" 
  | "dashboard";

interface FlowDemoBarProps {
  currentStep: FlowStep;
  onSelectStep: (step: FlowStep) => void;
  onTriggerSessionConflict: () => void;
  onTriggerLockout: () => void;
  onReset: () => void;
}

const STEPS: { id: FlowStep; label: string; icon: React.ElementType }[] = [
  { id: "login", label: "1. Đăng nhập", icon: LogIn },
  { id: "register", label: "2. Đăng ký", icon: UserPlus },
  { id: "otp", label: "3. Xác thực OTP", icon: KeyRound },
  { id: "survey", label: "4. Khảo sát", icon: Compass },
  { id: "quiz", label: "5. Quiz Đầu vào", icon: HelpCircle },
  { id: "recommendation", label: "6. Lộ trình", icon: Sparkles },
  { id: "dashboard", label: "7. Dashboard", icon: LayoutDashboard },
];

export default function FlowDemoBar({
  currentStep,
  onSelectStep,
  onTriggerSessionConflict,
  onTriggerLockout,
  onReset,
}: FlowDemoBarProps) {
  return (
    <aside aria-label="Thanh điều hướng demo" className="w-full bg-brand-dark-surface/90 border-b border-brand-gray-border py-2.5 px-4 backdrop-blur-md sticky top-16 z-30 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Step Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mr-1 shrink-0">
            Kịch bản:
          </span>
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => onSelectStep(step.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-brand-orange text-white shadow-glow-orange font-bold"
                    : "bg-brand-teal-deep/60 text-brand-gray hover:bg-brand-teal/30 hover:text-white border border-brand-teal/20"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Edge Cases Simulation Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
          <span className="text-[11px] text-brand-gray-muted hidden sm:inline">Giả lập ngoại lệ:</span>
          
          <button
            onClick={onTriggerLockout}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-950/70 hover:bg-amber-900/80 text-amber-300 border border-amber-500/40 transition"
            title="Mô phỏng lỗi sai mật khẩu quá 5 lần (E1)"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Sai 5 lần (E1)</span>
          </button>

          <button
            onClick={onTriggerSessionConflict}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-950/70 hover:bg-rose-900/80 text-rose-300 border border-rose-500/40 transition"
            title="Mô phỏng xung đột đăng nhập thiết bị khác (E3)"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Trùng phiên (E3)</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-brand-gray-muted hover:text-white bg-brand-dark-card hover:bg-brand-teal-dark border border-brand-gray-border transition"
            title="Làm mới trạng thái"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
