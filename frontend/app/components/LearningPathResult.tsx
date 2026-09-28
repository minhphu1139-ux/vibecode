"use client";

import React from "react";
import { 
  Sparkles, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Layers, 
  PlayCircle,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { QuizResult } from "./PlacementQuiz";
import { SurveyData } from "./OnboardingSurvey";

interface LearningPathResultProps {
  quizResult?: QuizResult;
  surveyData?: SurveyData;
  onGoToDashboard: () => void;
  onGoToCourseDeepLink: (courseTitle: string) => void;
}

export default function LearningPathResult({
  quizResult = { level: "Beginner", score: 0, total: 3, skipped: true },
  surveyData,
  onGoToDashboard,
  onGoToCourseDeepLink,
}: LearningPathResultProps) {
  const levelBadgeConfig = {
    Beginner: {
      color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      title: "Sơ Cấp (Beginner Level)",
      desc: "Lộ trình tối ưu tập trung xây dựng nền tảng vững chắc từ con số 0.",
    },
    Intermediate: {
      color: "bg-brand-orange/20 text-brand-orange text-white border-brand-orange/40",
      title: "Trung Cấp (Intermediate Level)",
      desc: "Bỏ qua các bài cơ bản để đi thẳng vào kiến trúc dự án thực tế và tối ưu hóa.",
    },
    Advanced: {
      color: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      title: "Chuyên Sâu (Advanced Architect)",
      desc: "Thực chiến với hệ thống phân tán, bảo mật bản quyền và tối ưu hiệu năng đỉnh cao.",
    },
  }[quizResult.level];

  const milestones = [
    {
      step: 1,
      title: "Chặng 1: Nền tảng & Tư duy Thiết kế Hệ thống",
      duration: "3 tuần",
      status: "Sẵn sàng học",
      lessons: "12 bài giảng &bull; 4 bài thực hành",
    },
    {
      step: 2,
      title: "Chặng 2: Triển khai Fullstack & Single Active Session",
      duration: "4 tuần",
      status: "Khóa mục tiêu",
      lessons: "18 bài giảng &bull; 1 đồ án thực tế",
    },
    {
      step: 3,
      title: "Chặng 3: Tối ưu Bảo mật, Giám sát & Cấp chứng chỉ",
      duration: "3 tuần",
      status: "Khóa nâng cao",
      lessons: "10 bài giảng &bull; Thi tốt nghiệp",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-card-glass relative">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-brand-teal to-brand-orange" />

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal-deep border border-brand-teal/40 text-brand-teal-light text-xs font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-brand-orange" />
            <span>AI Curriculum Engine &bull; Phân tích hoàn tất</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Lộ Trình Học Tập Dành Riêng Cho Bạn
          </h2>
          <p className="text-xs sm:text-sm text-brand-gray mt-1.5 max-w-lg mx-auto">
            Hệ thống đã tự động tính toán dựa trên mục tiêu khảo sát và bài trắc nghiệm phân loại trình độ.
          </p>
        </div>

        {/* Level Result Card */}
        <div className="p-5 rounded-2xl bg-brand-dark-surface/90 border border-brand-gray-border mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-teal/20 border border-brand-teal/40 flex items-center justify-center text-brand-teal-light shrink-0">
              <Award className="w-7 h-7 text-brand-orange" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-brand-gray-muted font-semibold uppercase">Cấp độ xếp lớp:</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${levelBadgeConfig.color}`}>
                  {levelBadgeConfig.title}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-brand-gray mt-1">
                {levelBadgeConfig.desc}
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right shrink-0 bg-brand-dark-bg/60 px-4 py-2.5 rounded-xl border border-brand-gray-border/40">
            <span className="text-[11px] text-brand-gray-muted block">Kết quả test</span>
            <strong className="text-sm text-white">
              {quizResult.skipped ? "Bỏ qua test (Mặc định)" : `${quizResult.score} / ${quizResult.total} câu đúng`}
            </strong>
          </div>
        </div>

        {/* Milestone Roadmap */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-orange" />
            <span>3 Giai Đoạn Đào Tạo Trực Tuyến</span>
          </h3>

          <div className="space-y-3">
            {milestones.map((m) => (
              <div
                key={m.step}
                className="p-4 rounded-xl border border-brand-gray-border/60 bg-brand-dark-bg/70 hover:border-brand-teal/50 transition flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-teal-deep text-brand-teal-light border border-brand-teal/40 flex items-center justify-center font-bold text-xs shrink-0">
                    {m.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{m.title}</h4>
                    <p className="text-xs text-brand-gray-muted mt-0.5" dangerouslySetInnerHTML={{ __html: m.lessons }} />
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-brand-teal-light font-medium flex items-center gap-1 bg-brand-teal/10 px-2 py-1 rounded-md">
                    <Clock className="w-3 h-3 text-brand-orange" />
                    {m.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deep link vs Dashboard CTAs */}
        <div className="p-4 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Khóa học mở đầu đề xuất
            </h4>
            <p className="text-sm font-bold text-white mt-0.5">
              Xây Dựng Hệ Thống E-Learning Chuẩn Kiến Trúc 2026
            </p>
          </div>
          <button
            onClick={() => onGoToCourseDeepLink("Xây Dựng Hệ Thống E-Learning Chuẩn Kiến Trúc 2026")}
            className="text-xs px-3.5 py-2 rounded-xl bg-brand-teal hover:bg-brand-teal-hover text-white font-semibold flex items-center gap-1.5 transition whitespace-nowrap"
          >
            <span>Học thử ngay (Deep Link)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Master CTA */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-brand-gray-border">
          <button
            type="button"
            onClick={onGoToDashboard}
            className="flex-1 py-3 px-6 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-bold shadow-glow-orange flex items-center justify-center gap-2 transition transform active:scale-95"
          >
            <span>Lưu Lộ Trình & Vào Dashboard Học Viên</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
