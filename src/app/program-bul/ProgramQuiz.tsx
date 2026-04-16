"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import {
  STEPS,
  getResult,
  getProgress,
  type QuizResult,
  type ProgramInfo,
} from "./quiz-data";
import { getBodyKey, BODY_TEXTS } from "./result-bodies";

// ─── Transition wrapper (mount-based) ───────────────────────────────
// Use with key={stepKey} so React remounts on each step change.
// This avoids the flash caused by stale `visible` state during re-renders.
function StepTransition({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: visible
          ? "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)"
          : "none",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

// ─── Option card ────────────────────────────────────────────────────
function OptionCard({
  label,
  index,
  selected,
  dimmed,
  onClick,
}: {
  label: string;
  index: number;
  selected: boolean;
  dimmed: boolean;
  onClick: () => void;
}) {
  const letter = String.fromCharCode(65 + index); // A, B, C, D

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-xl cursor-pointer sm:hover:shadow-md active:scale-[0.98]"
      style={{
        padding: "14px 18px",
        border: `1px solid ${selected ? "#A7A096" : "rgba(167,160,150,0.25)"}`,
        backgroundColor: selected
          ? "rgba(167,160,150,0.15)"
          : "#FDFCFA",
        boxShadow: selected
          ? "0 4px 16px rgba(167,160,150,0.3), 0 0 0 2px rgba(167,160,150,0.2)"
          : "none",
        transform: selected ? "scale(1.02)" : dimmed ? "scale(0.97)" : "scale(1)",
        opacity: dimmed ? 0.4 : 1,
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s cubic-bezier(0.16,1,0.3,1), background-color 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium"
          style={{
            backgroundColor: selected
              ? "#A7A096"
              : "rgba(167,160,150,0.08)",
            color: selected ? "#FDFCFA" : "#7a7168",
            transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {letter}
        </span>
        <span
          className="text-[14px] sm:text-[15px] leading-relaxed pt-0.5"
          style={{
            color: selected ? "#2C2C2C" : "rgba(44,44,44,0.8)",
            fontWeight: selected ? 600 : 400,
            transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {label}
        </span>
      </div>
    </button>
  );
}

// ─── Program result card ────────────────────────────────────────────
function ProgramCard({
  program,
  variant,
}: {
  program: ProgramInfo;
  variant: "primary" | "alternative" | "advanced";
}) {
  const isPrimary = variant === "primary";

  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-all ${
        isPrimary ? "shadow-lg" : "shadow-sm"
      }`}
      style={{
        borderColor: isPrimary ? `${program.hex}66` : "rgba(167,160,150,0.25)",
        backgroundColor: isPrimary ? "#FDFCFA" : "#FAF9F6",
      }}
    >
      {/* Top accent */}
      <div style={{ height: isPrimary ? 4 : 3, backgroundColor: program.hex }} />

      <div className={isPrimary ? "p-6 sm:p-8" : "p-4 sm:p-5"}>
        {variant === "alternative" && (
          <span className="text-xs font-medium text-earth/60 uppercase tracking-wider mb-2 block">
            Alternatif olarak değerlendirilebilir
          </span>
        )}
        {variant === "advanced" && (
          <span className="text-xs font-medium text-earth/60 uppercase tracking-wider mb-2 block">
            İleri seviye opsiyon
          </span>
        )}

        <h3
          className={`font-serif font-bold text-dark ${
            isPrimary ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
          }`}
        >
          {program.label}
        </h3>

        {isPrimary && (
          <p className="text-earth/70 mt-2 text-sm sm:text-base leading-relaxed">
            Paylaştığınız bilgiler doğrultusunda sizin için en uygun program
            olarak değerlendirilmiştir.
          </p>
        )}

        <a
          href={`/program/${program.slug}`}
          className={`group inline-flex items-center gap-2 font-medium rounded-xl transition-all duration-200 ${
            isPrimary
              ? "mt-4 px-6 py-3 text-sm"
              : "mt-3 px-4 py-2 text-xs sm:text-sm"
          }`}
          style={{
            backgroundColor: program.hex,
            color: "#2C2C2C",
          }}
        >
          Programı İncele
          <svg
            className="transition-transform duration-300 group-hover:translate-x-1"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ─── WhatsApp CTA ───────────────────────────────────────────────────
function WhatsAppButton({ text }: { text: string }) {
  return (
    <a
      href="https://wa.me/905300202483"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 px-7 py-4 rounded-xl font-medium text-sm sm:text-base transition-colors duration-300 cursor-pointer border max-sm:border-earth/40 max-sm:bg-ivory border-sand/40 bg-transparent sm:hover:border-earth/40 sm:hover:bg-earth/5"
      style={{
        color: "#2C2C2C",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <svg className="w-5 h-5 shrink-0" fill="#25D366" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span>{text}</span>
      <svg
        className="w-4 h-4 max-sm:opacity-70 opacity-40 sm:group-hover:opacity-70 transition-all duration-300 max-sm:translate-x-1 sm:group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </a>
  );
}

// ─── Body text block ────────────────────────────────────────────────
// Splits a long body string into readable paragraphs (~2–3 sentences each)
function BodyTextBlock({ text }: { text: string }) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) {
    paragraphs.push(sentences.slice(i, i + 3).join("").trim());
  }

  return (
    <div className="relative bg-ivory rounded-2xl p-6 sm:p-8 border border-sand/60 shadow-sm overflow-hidden mb-8">
      <div className="relative z-10 space-y-4 text-dark/80 text-[14px] sm:text-[15px] leading-[1.8]">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}

const EVALUATION_NOTE =
  "Hıfz-ı Bedîl Ekibi olarak bizler, sizin paylaştığınız bilgiler, işin ehli hocalarımız tarafından verilen tavsiyeler ve geçmiş aday deneyimlerinden edindiğimiz tecrübeler doğrultusunda naçizane bir değerlendirme sunmaktayız. Elbette kişi kendisini en iyi tanıyandır; bu nedenle kendi hayat düzeninizi, zamanınızı ve kabiliyetinizi göz önünde bulundurarak diğer program türlerini de inceleyip nihai kararı sizin vermeniz doğru bir yaklaşım olacaktır. Sevgi ve dua ile.";

// ─── Main quiz component ────────────────────────────────────────────
export default function ProgramQuiz() {
  const [currentStep, setCurrentStep] = useState("level");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const goToStep = useCallback(
    (nextStep: string) => {
      setHistory((prev) => [...prev, currentStep]);
      setCurrentStep(nextStep);
      setSelectedOption(null);
    },
    [currentStep]
  );

  const goBack = useCallback(() => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));

    // Remove the answer for current step
    setAnswers((a) => {
      const copy = { ...a };
      // Remove answers that were given at or after the step we're going back to
      const step = STEPS[currentStep];
      if (step) delete copy[step.id];
      return copy;
    });

    setCurrentStep(prev);
    setSelectedOption(null);
  }, [history, currentStep]);

  const handleOptionSelect = useCallback(
    (stepId: string, value: string, nextStep: string) => {
      setSelectedOption(value);
      setAnswers((a) => ({ ...a, [stepId]: value }));

      // Longer delay so the user clearly sees their selection before transitioning
      setTimeout(() => {
        goToStep(nextStep);
      }, 600);
    },
    [goToStep]
  );

  const progress = currentStep === "level" ? 0 : getProgress(currentStep, answers);
  const isResultScreen = currentStep === "result" || currentStep === "no-program";
  const showBack = currentStep !== "level" && !isResultScreen;

  // Compute result if needed
  const result: QuizResult | "no-program" | null =
    currentStep === "result" || currentStep === "no-program"
      ? getResult(answers)
      : null;

  // Look up body text for current result
  const bodyKey = isResultScreen ? getBodyKey(answers) : null;
  const bodyText = bodyKey ? BODY_TEXTS[bodyKey] : null;

  return (
    <div className="relative min-h-svh bg-ivory overflow-clip">
      {/* Background logo — mobile: right-bottom, desktop: right-center */}
      <div className="absolute right-0 z-[1] pointer-events-none translate-x-[43%] bottom-0 translate-y-[30%] sm:bottom-auto sm:translate-y-[-5%] sm:inset-y-0 sm:flex sm:items-center">
        <div
          className="relative w-[320px] h-[320px] sm:w-[700px] sm:h-[700px] lg:w-[900px] lg:h-[900px]"
          style={{
            opacity: 0.12,
            filter: "blur(0.5px)",
            maskImage: "radial-gradient(circle, black 50%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(circle, black 50%, transparent 80%)",
          }}
        >
          <Image
            src="/site-lgo/Untitled design (4).png"
            alt=""
            fill
            sizes="(max-width: 640px) 380px, (max-width: 1024px) 700px, 900px"
            className="object-contain rounded-full"
            priority
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-sand/30">
        <div
          className="h-full transition-all duration-700 ease-out"
          style={{
            width: `${progress * 100}%`,
            backgroundColor: "#A7A096",
          }}
        />
      </div>

      {/* Content area */}
      <div className="relative z-10 min-h-svh flex items-center justify-center px-5 sm:px-8 py-20">
        <div className="w-full max-w-lg">
          {/* Back button — inline, above content */}
          {showBack && (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 text-sm text-earth/60 hover:text-earth transition-colors cursor-pointer mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri
            </button>
          )}
          <StepTransition key={currentStep}>
            {/* ── Question screens ───────────────────────────── */}
            {currentStep !== "result" &&
              currentStep !== "no-program" &&
              STEPS[currentStep] && (
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-dark leading-snug mb-8">
                    {STEPS[currentStep].question}
                  </h2>
                  <div className="flex flex-col gap-3">
                    {STEPS[currentStep].options.map((opt, i) => (
                      <OptionCard
                        key={opt.value}
                        label={opt.label}
                        index={i}
                        selected={selectedOption === opt.value}
                        dimmed={selectedOption !== null && selectedOption !== opt.value}
                        onClick={() =>
                          handleOptionSelect(
                            STEPS[currentStep].id,
                            opt.value,
                            opt.nextStep
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

            {/* ── Result screen ───────────────────────────────── */}
            {currentStep === "result" && result && result !== "no-program" && (
              <div>
                <div className="text-center mb-8">
                  <div className="w-12 h-12 rounded-full bg-[#A7A096]/15 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-[#A7A096]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-dark">
                    Size Önerilen Program
                  </h2>
                </div>

                {bodyText && <BodyTextBlock text={bodyText} />}

                <div className="flex flex-col gap-4">
                  <ProgramCard
                    program={result.primary}
                    variant="primary"
                  />
                  {result.alternative && (
                    <ProgramCard
                      program={result.alternative}
                      variant="alternative"
                    />
                  )}
                  {result.advanced && (
                    <ProgramCard
                      program={result.advanced}
                      variant="advanced"
                    />
                  )}
                </div>

                <p className="text-earth/50 text-xs sm:text-sm leading-relaxed mt-8 text-center italic">
                  {EVALUATION_NOTE}
                </p>

                <div className="text-center mt-8">
                  <WhatsAppButton text="WhatsApp'tan Kit Talep Et" />
                </div>

                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep("level");
                      setAnswers({});
                      setHistory([]);
                      setSelectedOption(null);
                    }}
                    className="text-sm text-earth transition-colors duration-300 cursor-pointer px-5 py-2.5 rounded-xl border max-sm:border-earth/40 max-sm:bg-ivory border-sand/40 bg-transparent sm:hover:border-earth/40 sm:hover:bg-earth/5"
                  >
                    Yeniden Başla
                  </button>
                </div>
              </div>
            )}

            {/* ── No-program screen ──────────────────────────── */}
            {(currentStep === "no-program" || (currentStep === "result" && result === "no-program")) && (
              <div>
                <div className="text-center mb-8">
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-dark mb-3">
                    Önerimiz
                  </h2>
                </div>

                {bodyText ? (
                  <BodyTextBlock text={bodyText} />
                ) : (
                  <div className="rounded-2xl border border-sand/50 p-6 sm:p-8 bg-sand/5">
                    <div className="space-y-4 text-dark/80 text-sm sm:text-base leading-relaxed">
                      <p>
                        Öncelikle okuyuş temelinizi kuvvetlendirmenizi
                        öneriyoruz. Sağlam bir Kur&apos;ân-ı Kerîm okuyuşu,
                        hafızlık yolculuğunun en önemli adımıdır.
                      </p>
                    </div>
                  </div>
                )}

                <p className="text-earth/50 text-xs sm:text-sm leading-relaxed mt-6 text-center italic">
                  {EVALUATION_NOTE}
                </p>

                <div className="text-center mt-8">
                  <WhatsAppButton text="Detaylı Bilgi İçin Bize Ulaşın" />
                </div>

                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep("level");
                      setAnswers({});
                      setHistory([]);
                      setSelectedOption(null);
                    }}
                    className="text-sm text-earth transition-colors duration-300 cursor-pointer px-5 py-2.5 rounded-xl border max-sm:border-earth/40 max-sm:bg-ivory border-sand/40 bg-transparent sm:hover:border-earth/40 sm:hover:bg-earth/5"
                  >
                    Yeniden Başla
                  </button>
                </div>
              </div>
            )}
          </StepTransition>
        </div>
      </div>
    </div>
  );
}
