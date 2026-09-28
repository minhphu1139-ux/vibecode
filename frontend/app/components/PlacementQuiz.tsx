"use client";

import React, { useState } from "react";
import { 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  FastForward, 
  Award,
  Sparkles,
  AlertCircle
} from "lucide-react";

export interface QuizResult {
  level: "Beginner" | "Intermediate" | "Advanced";
  score: number;
  total: number;
  skipped: boolean;
}

interface PlacementQuizProps {
  onCompleteQuiz: (result: QuizResult) => void;
  onSkipQuiz: () => void;
}

const QUESTIONS = [
  {
    id: 1,
    question: "Trong kiến trúc web bảo mật, Access/Refresh Token thường được lưu trữ ở đâu để chống tấn công XSS tốt nhất?",
    options: [
      { id: "A", text: "Lưu trong LocalStorage của trình duyệt" },
      { id: "B", text: "Lưu trong HttpOnly, Secure Cookie của trình duyệt (Chuẩn nghiệp vụ)", isCorrect: true },
      { id: "C", text: "Lưu tạm vào biến Global Window của JavaScript" },
      { id: "D", text: "Mã hóa và in trực tiếp ra thẻ HTML meta tag" },
    ],
  },
  {
    id: 2,
    question: "Cơ chế Single Active Session được áp dụng trong hệ thống LMS nhằm mục tiêu nghiệp vụ cốt lõi nào?",
    options: [
      { id: "A", text: "Tăng tốc độ tải video bài giảng lên CDN" },
      { id: "B", text: "Ngăn chặn việc dùng chung/share tài khoản và bảo vệ bản quyền tác giả", isCorrect: true },
      { id: "C", text: "Tự động gửi thông báo chấm điểm về Telegram" },
      { id: "D", text: "Giới hạn thời gian học tập dưới 2 tiếng mỗi ngày" },
    ],
  },
  {
    id: 3,
    question: "Để giảm thiểu tối đa tỷ lệ học viên bỏ cuộc (Drop-off Rate) ở bước Onboarding, giải pháp tối ưu là gì?",
    options: [
      { id: "A", text: "Bắt buộc học viên làm bài kiểm tra 60 phút không được phép bỏ qua" },
      { id: "B", text: "Cho phép bỏ qua bài test (E4), tinh gọn các bước và gợi ý lộ trình ngay", isCorrect: true },
      { id: "C", text: "Yêu cầu cung cấp CCCD và số điện thoại trước khi xem thử khóa học" },
      { id: "D", text: "Khóa toàn bộ giao diện cho đến khi học viên đóng học phí" },
    ],
  },
];

export default function PlacementQuiz({ onCompleteQuiz, onSkipQuiz }: PlacementQuizProps) {
  const [mode, setMode] = useState<"prompt" | "testing">("prompt");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const startTest = () => {
    setMode("testing");
    setCurrentQIndex(0);
    setUserAnswers({});
    setSelectedOption(null);
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNextQuestion = () => {
    if (!selectedOption) return;

    const newAnswers = { ...userAnswers, [currentQIndex]: selectedOption };
    setUserAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQIndex < QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      QUESTIONS.forEach((q, idx) => {
        const chosenId = newAnswers[idx];
        const correctOpt = q.options.find((opt) => opt.isCorrect);
        if (chosenId === correctOpt?.id) {
          correctCount++;
        }
      });

      let evaluatedLevel: "Beginner" | "Intermediate" | "Advanced" = "Beginner";
      if (correctCount === 3) evaluatedLevel = "Advanced";
      else if (correctCount >= 1) evaluatedLevel = "Intermediate";

      onCompleteQuiz({
        level: evaluatedLevel,
        score: correctCount,
        total: QUESTIONS.length,
        skipped: false,
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-card-glass relative">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-brand-teal to-brand-orange" />

        {mode === "prompt" ? (
          /* Prompt to test or skip */
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-brand-teal/20 border border-brand-teal/40 flex items-center justify-center text-brand-teal-light shadow-glow-teal">
              <Award className="w-8 h-8 text-brand-orange" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Onboarding &bull; Bước 2/2
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 mb-3">
              Kiểm Tra Phân Loại Trình Độ (Tùy Chọn)
            </h2>
            <p className="text-sm text-brand-gray max-w-md mx-auto leading-relaxed mb-8">
              Làm bài trắc nghiệm nhanh <strong>3 câu (3 phút)</strong> để AI xếp bạn vào đúng lớp và bỏ qua các kiến thức bạn đã nắm vững!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              {/* Option A: Làm bài test */}
              <div 
                onClick={startTest}
                className="p-5 rounded-2xl border border-brand-orange bg-brand-orange/10 hover:bg-brand-orange/20 cursor-pointer transition text-left shadow-glow-orange/30 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center font-bold text-xs">
                    TEST
                  </div>
                  <Clock className="w-4 h-4 text-brand-orange" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-brand-orange transition">
                  Làm Bài Test Nhanh
                </h4>
                <p className="text-xs text-brand-gray-muted mt-1">
                  Đo lường năng lực chuẩn xác để nhận khóa học nâng cao
                </p>
              </div>

              {/* Option B: Bỏ qua (E4) */}
              <div 
                onClick={onSkipQuiz}
                className="p-5 rounded-2xl border border-brand-gray-border bg-brand-dark-surface/60 hover:bg-brand-teal-deep/30 hover:border-brand-teal/50 cursor-pointer transition text-left group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-dark-bg text-brand-gray-muted border border-brand-gray-border flex items-center justify-center font-bold text-xs">
                    SKIP
                  </div>
                  <FastForward className="w-4 h-4 text-brand-gray-muted" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-brand-teal-light transition">
                  Bỏ Qua Bài Test (E4)
                </h4>
                <p className="text-xs text-brand-gray-muted mt-1">
                  Bắt đầu ngay với lộ trình Cơ Bản (Beginner Level)
                </p>
              </div>
            </div>

            <p className="text-xs text-brand-gray-muted mt-8">
              * Quy tắc E4: Bạn có thể kiểm tra trình độ lại bất cứ lúc nào trong mục Cài đặt cá nhân.
            </p>
          </div>
        ) : (
          /* Mini Quiz In-Progress */
          <div>
            {/* Header progress */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                Câu hỏi {currentQIndex + 1} / {QUESTIONS.length}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-brand-teal-light font-medium">
                <Clock className="w-3.5 h-3.5 text-brand-orange" />
                <span>Thời gian: ~2 phút</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-brand-dark-bg rounded-full overflow-hidden mb-6 border border-brand-gray-border/40">
              <div
                className="h-full bg-gradient-to-r from-brand-teal to-brand-orange transition-all duration-300"
                style={{ width: `${((currentQIndex + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug mb-6">
              {QUESTIONS[currentQIndex].question}
            </h3>

            {/* Options list */}
            <div className="space-y-3 mb-8">
              {QUESTIONS[currentQIndex].options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                      isSelected
                        ? "bg-brand-orange/20 border-brand-orange text-white shadow-glow-orange/30"
                        : "bg-brand-dark-surface/70 border-brand-gray-border hover:border-brand-teal text-brand-gray hover:text-white"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? "bg-brand-orange text-white"
                          : "bg-brand-dark-bg text-brand-gray-muted border border-brand-gray-border"
                      }`}
                    >
                      {opt.id}
                    </div>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">{opt.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-brand-gray-border">
              <button
                type="button"
                onClick={onSkipQuiz}
                className="text-xs text-brand-gray-muted hover:text-white flex items-center gap-1 transition"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Bỏ qua bài test</span>
              </button>

              <button
                type="button"
                disabled={!selectedOption}
                onClick={handleNextQuestion}
                className="py-2.5 px-6 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-bold shadow-glow-orange flex items-center gap-2 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>{currentQIndex === QUESTIONS.length - 1 ? "Hoàn Thành & Xem Lộ Trình" : "Câu Tiếp Theo"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
