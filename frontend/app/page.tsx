"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import FlowDemoBar, { FlowStep } from "./components/FlowDemoBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import OtpVerification from "./components/OtpVerification";
import OnboardingSurvey, { SurveyData } from "./components/OnboardingSurvey";
import PlacementQuiz, { QuizResult } from "./components/PlacementQuiz";
import LearningPathResult from "./components/LearningPathResult";
import SessionModal from "./components/SessionModal";
import ForgotPasswordModal from "./components/ForgotPasswordModal";
import { 
  CheckCircle2, 
  ShieldCheck, 
  BookOpen, 
  Play, 
  LogOut, 
  AlertTriangle,
  Monitor,
  Flame,
  ArrowRight
} from "lucide-react";

export default function Flow01Page() {
  const [currentStep, setCurrentStep] = useState<FlowStep>("login");
  const [registeredEmail, setRegisteredEmail] = useState("hocvien@gmail.com");
  const [surveyData, setSurveyData] = useState<SurveyData | undefined>(undefined);
  const [quizResult, setQuizResult] = useState<QuizResult | undefined>(undefined);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [deepLinkedCourse, setDeepLinkedCourse] = useState<string | null>(null);

  // Step labels for header
  const stepTitles: Record<FlowStep, string> = {
    login: "Đăng Nhập (Sign In)",
    register: "Đăng Ký Tài Khoản (Sign Up)",
    otp: "Xác Thực Email (OTP)",
    survey: "Khảo Sát Mục Tiêu (Onboarding)",
    quiz: "Trắc Nghiệm Đầu Vào (Placement Quiz)",
    recommendation: "Gợi Ý Lộ Trình (Learning Path)",
    dashboard: "Dashboard Học Viên",
  };

  // Handlers for happy path
  const handleSuccessLogin = () => {
    setCurrentStep("dashboard");
  };

  const handleSuccessRegister = (email: string) => {
    setRegisteredEmail(email);
    setCurrentStep("otp");
  };

  const handleSuccessOtp = () => {
    setCurrentStep("survey");
  };

  const handleCompleteSurvey = (data: SurveyData) => {
    setSurveyData(data);
    setCurrentStep("quiz");
  };

  const handleCompleteQuiz = (result: QuizResult) => {
    setQuizResult(result);
    setCurrentStep("recommendation");
  };

  const handleSkipQuiz = () => {
    setQuizResult({
      level: "Beginner",
      score: 0,
      total: 3,
      skipped: true,
    });
    setCurrentStep("recommendation");
  };

  const handleGoToDashboard = () => {
    setDeepLinkedCourse(null);
    setCurrentStep("dashboard");
  };

  const handleGoToDeepLink = (courseTitle: string) => {
    setDeepLinkedCourse(courseTitle);
    setCurrentStep("dashboard");
  };

  const handleResetAll = () => {
    setCurrentStep("login");
    setIsLockedOut(false);
    setIsSessionModalOpen(false);
    setIsForgotModalOpen(false);
    setDeepLinkedCourse(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Brand Header */}
      <Header 
        currentStepTitle={stepTitles[currentStep]} 
        onReset={handleResetAll} 
      />

      {/* Interactive Scenario Bar */}
      <FlowDemoBar
        currentStep={currentStep}
        onSelectStep={(step) => setCurrentStep(step)}
        onTriggerLockout={() => {
          setIsLockedOut(true);
          setCurrentStep("login");
        }}
        onTriggerSessionConflict={() => setIsSessionModalOpen(true)}
        onReset={handleResetAll}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-center">
        {/* STEP 1: Đăng nhập */}
        {currentStep === "login" && (
          <LoginForm
            onSuccessLogin={handleSuccessLogin}
            onSwitchToRegister={() => setCurrentStep("register")}
            onForgotPassword={() => setIsForgotModalOpen(true)}
            onTriggerSessionConflict={() => setIsSessionModalOpen(true)}
            isLockedOut={isLockedOut}
          />
        )}

        {/* STEP 2: Đăng ký */}
        {currentStep === "register" && (
          <RegisterForm
            onSuccessRegister={handleSuccessRegister}
            onSwitchToLogin={() => setCurrentStep("login")}
          />
        )}

        {/* STEP 3: Xác thực OTP */}
        {currentStep === "otp" && (
          <OtpVerification
            email={registeredEmail}
            onSuccessVerify={handleSuccessOtp}
            onBackToRegister={() => setCurrentStep("register")}
          />
        )}

        {/* STEP 4: Khảo sát mục tiêu */}
        {currentStep === "survey" && (
          <OnboardingSurvey
            onCompleteSurvey={handleCompleteSurvey}
          />
        )}

        {/* STEP 5: Trắc nghiệm phân loại */}
        {currentStep === "quiz" && (
          <PlacementQuiz
            onCompleteQuiz={handleCompleteQuiz}
            onSkipQuiz={handleSkipQuiz}
          />
        )}

        {/* STEP 6: Lộ trình đề xuất */}
        {currentStep === "recommendation" && (
          <LearningPathResult
            quizResult={quizResult}
            surveyData={surveyData}
            onGoToDashboard={handleGoToDashboard}
            onGoToCourseDeepLink={handleGoToDeepLink}
          />
        )}

        {/* STEP 7: Dashboard học viên */}
        {currentStep === "dashboard" && (
          <div className="w-full max-w-3xl mx-auto">
            <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-card-glass relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-brand-teal to-brand-orange" />

              {/* Welcome Badge & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-brand-gray-border">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tài khoản đã kích hoạt & Phân loại xong</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Xin Chào, Học Viên Mới! 👋
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-gray-muted mt-1">
                    Bạn đã hoàn thành Flow 01: Xác thực, Đăng nhập & Khởi tạo lộ trình Onboarding.
                  </p>
                </div>

                <button
                  onClick={() => setCurrentStep("login")}
                  className="self-start sm:self-center flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-dark-surface hover:bg-rose-950/40 text-brand-gray-muted hover:text-rose-300 text-xs font-semibold border border-brand-gray-border transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Đăng xuất</span>
                </button>
              </div>

              {/* Deep Link alert banner (if user came from deep link) */}
              {deepLinkedCourse && (
                <div className="mb-6 p-4 rounded-2xl bg-brand-orange/15 border border-brand-orange/40 text-xs text-brand-orange flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Flame className="w-5 h-5 text-brand-orange shrink-0" />
                    <span>
                      Đã tự động điều hướng theo Deep Link: <strong className="text-white font-bold">{deepLinkedCourse}</strong>
                    </span>
                  </div>
                  <span className="font-semibold underline cursor-pointer">Bắt đầu học</span>
                </div>
              )}

              {/* Security info card */}
              <div className="p-4 rounded-2xl bg-brand-dark-surface/80 border border-brand-gray-border mb-6 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-teal/20 border border-brand-teal/40 flex items-center justify-center text-brand-teal-light">
                    <Monitor className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Phiên Đăng Nhập Duy Nhất</span>
                    <span className="text-brand-gray-muted">Thiết bị hiện tại: Windows PC &bull; IP: 103.167.xx.xx</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-1 rounded-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    1/1 Session Active
                  </span>
                </div>
              </div>

              {/* Learning Progress Preview */}
              <div className="p-5 rounded-2xl bg-brand-teal-deep/50 border border-brand-teal/40 mb-8">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-brand-orange" />
                    <h3 className="text-sm font-bold text-white">Khóa Học Đang Theo Dõi</h3>
                  </div>
                  <span className="text-xs text-brand-orange font-bold">0% Tiến độ</span>
                </div>

                <h4 className="text-base font-bold text-white mb-1">
                  Kiến Trúc Hệ Thống E-Learning & Bảo Vệ Bản Quyền Đa Thiết Bị
                </h4>
                <p className="text-xs text-brand-gray-muted mb-4">
                  Bao gồm 8 User Flows chuẩn hóa: Onboarding, Thanh toán VietQR, SCORM Player, Zoom Live, Chứng chỉ số QR.
                </p>

                <div className="w-full h-2 bg-brand-dark-bg rounded-full overflow-hidden mb-4">
                  <div className="w-0 h-full bg-brand-orange rounded-full" />
                </div>

                <button
                  type="button"
                  onClick={() => alert("Chuyển tiếp sang Flow 03: Trải nghiệm Học tập (Player, SCORM, Watermarking)!")}
                  className="w-full py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-bold shadow-glow-orange flex items-center justify-center gap-2 transition"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Vào Học Ngay Bài 1: Tổng Quan Kiến Trúc</span>
                </button>
              </div>

              {/* Session test button */}
              <div className="text-center pt-2">
                <button
                  onClick={() => setIsSessionModalOpen(true)}
                  className="text-xs text-amber-300 hover:text-amber-200 underline font-medium"
                >
                  [Thử nghiệm]: Mô phỏng đăng nhập từ thiết bị khác để kiểm tra Single Active Session (E3)
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-brand-gray-border/40 py-6 text-center text-xs text-brand-gray-muted">
        <p>
          Hệ thống đào tạo trực tuyến E-Learning &bull; Giao diện chuẩn hóa <strong>Flow 01 (Auth & Onboarding)</strong>
        </p>
        <p className="mt-1 text-[11px] text-brand-teal-light">
          Next.js + Tailwind CSS &bull; Tone màu: Cam sáng (#F26B38), Xanh mòng két (#0B8374), Xám tối (#CBE5DF)
        </p>
      </footer>

      {/* Exception Modals */}
      <SessionModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
        onConfirmRevoke={() => {
          setIsSessionModalOpen(false);
          setCurrentStep("dashboard");
        }}
      />

      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </div>
  );
}
