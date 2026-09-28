"use client";

import React, { useState } from "react";
import { 
  Code, 
  BrainCircuit, 
  Languages, 
  Palette, 
  TrendingUp, 
  Briefcase, 
  Award, 
  Rocket, 
  CheckCircle, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export interface SurveyData {
  interests: string[];
  goal: string;
  commitment: string;
}

interface OnboardingSurveyProps {
  onCompleteSurvey: (data: SurveyData) => void;
}

const INTEREST_OPTIONS = [
  { id: "tech", label: "Lập trình Web & Mobile", icon: Code, desc: "React, Next.js, Flutter, Node.js" },
  { id: "ai", label: "Trí Tuệ Nhân Tạo & Data", icon: BrainCircuit, desc: "GenAI, Python, Prompting, Machine Learning" },
  { id: "english", label: "Tiếng Anh & IELTS", icon: Languages, desc: "Giao tiếp công sở, Luyện thi 6.5+" },
  { id: "uiux", label: "Thiết Kế UI/UX & Đồ Họa", icon: Palette, desc: "Figma, Design System, Product Thinking" },
  { id: "business", label: "Kinh Doanh & Quản Trị", icon: TrendingUp, desc: "Marketing số, Quản trị dự án Agile/Scrum" },
];

const GOAL_OPTIONS = [
  { id: "job", label: "Tìm việc & Đi làm ngay", icon: Briefcase, desc: "Xây dựng portfolio thực chiến chuẩn yêu cầu nhà tuyển dụng" },
  { id: "cert", label: "Lấy chứng chỉ quốc tế", icon: Award, desc: "Ôn luyện có lộ trình và đạt chứng nhận uy tín" },
  { id: "startup", label: "Khởi nghiệp / Làm dự án riêng", icon: Rocket, desc: "Tự tay phát triển sản phẩm từ ý tưởng đến thực tế" },
  { id: "promotion", label: "Nâng cao nghiệp vụ hiện tại", icon: TrendingUp, desc: "Mở rộng kỹ năng để thăng tiến hoặc tăng thu nhập" },
];

const COMMITMENT_OPTIONS = [
  { id: "15m", label: "15 - 30 phút / ngày", tag: "Nhẹ nhàng" },
  { id: "1h", label: "1 giờ / ngày", tag: "Khuyến nghị", popular: true },
  { id: "2h", label: "2+ giờ / ngày", tag: "Cấp tốc" },
];

export default function OnboardingSurvey({ onCompleteSurvey }: OnboardingSurveyProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["tech"]);
  const [selectedGoal, setSelectedGoal] = useState<string>("job");
  const [selectedCommitment, setSelectedCommitment] = useState<string>("1h");

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((item) => item !== id));
      }
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleNext = () => {
    onCompleteSurvey({
      interests: selectedInterests,
      goal: selectedGoal,
      commitment: selectedCommitment,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-card-glass relative">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-brand-teal to-brand-orange" />

        {/* Stepper indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-gray-border">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Onboarding &bull; Bước 1/2
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Cá Nhân Hóa Trải Nghiệm Học Tập
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-brand-teal-light font-semibold bg-brand-teal-deep px-3 py-1.5 rounded-lg border border-brand-teal/30">
            <Sparkles className="w-4 h-4 text-brand-orange" />
            <span>AI Đề Xuất Lộ Trình</span>
          </div>
        </div>

        {/* Section 1: Lĩnh vực quan tâm */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-white mb-1">
            1. Bạn quan tâm đến lĩnh vực nào nhất?
          </label>
          <p className="text-xs text-brand-gray-muted mb-4">
            (Có thể chọn nhiều lĩnh vực để hệ thống xây dựng lộ trình tích hợp)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INTEREST_OPTIONS.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedInterests.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleInterest(item.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? "bg-brand-teal/20 border-brand-orange shadow-glow-orange/30 text-white"
                      : "bg-brand-dark-surface/60 border-brand-gray-border hover:border-brand-teal/50 text-brand-gray hover:bg-brand-teal-deep/30"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-brand-orange text-white"
                        : "bg-brand-dark-bg text-brand-teal-light border border-brand-teal/30"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white truncate">{item.label}</h4>
                      {isSelected && <CheckCircle className="w-4 h-4 text-brand-orange shrink-0" />}
                    </div>
                    <p className="text-xs text-brand-gray-muted mt-0.5">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Mục tiêu học tập */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-white mb-3">
            2. Mục tiêu chính yếu của bạn trong 6 tháng tới là gì?
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GOAL_OPTIONS.map((g) => {
              const Icon = g.icon;
              const isSelected = selectedGoal === g.id;
              return (
                <div
                  key={g.id}
                  onClick={() => setSelectedGoal(g.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? "bg-brand-teal/20 border-brand-teal-light shadow-glow-teal text-white"
                      : "bg-brand-dark-surface/60 border-brand-gray-border hover:border-brand-teal/50 text-brand-gray"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-brand-teal text-white"
                        : "bg-brand-dark-bg text-brand-gray-muted border border-brand-gray-border"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{g.label}</h4>
                    <p className="text-xs text-brand-gray-muted mt-0.5">{g.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Cam kết thời gian */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-white mb-3">
            3. Bạn sẵn sàng dành bao nhiêu thời gian học tập mỗi ngày?
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {COMMITMENT_OPTIONS.map((c) => {
              const isSelected = selectedCommitment === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCommitment(c.id)}
                  className={`p-3.5 rounded-2xl border text-center cursor-pointer transition-all relative ${
                    isSelected
                      ? "bg-brand-orange/20 border-brand-orange shadow-glow-orange text-white"
                      : "bg-brand-dark-surface/60 border-brand-gray-border hover:border-brand-teal/50 text-brand-gray"
                  }`}
                >
                  {c.popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-orange text-white uppercase tracking-wider">
                      Phổ biến
                    </span>
                  )}
                  <h4 className="text-sm font-bold text-white">{c.label}</h4>
                  <span className="text-[11px] text-brand-gray-muted block mt-1">
                    Cường độ: <strong className="text-brand-teal-light">{c.tag}</strong>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-brand-gray-border flex justify-end">
          <button
            type="button"
            onClick={handleNext}
            className="w-full sm:w-auto py-3 px-8 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-bold shadow-glow-orange flex items-center justify-center gap-2 transition transform active:scale-95"
          >
            <span>Tiếp Tục Sang Bước Phân Loại Trình Độ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
