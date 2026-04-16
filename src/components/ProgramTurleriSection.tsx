"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

interface ProgramTurleriSectionProps {
  headingLevel?: "h1" | "h2";
  showSubtitle?: boolean;
}

const programs = [
  { year: "6", label: "6 Yıllık Program", image: "/yeniklasor/6yillik.png", hex: "#CDCBB7" },
  { year: "4", label: "4 Yıllık Program", image: "/yeniklasor/4yillik.png", hex: "#D9BCB4" },
  { year: "2", label: "2 Yıllık Program", image: "/yeniklasor/2yillik.png", hex: "#C1D2D2" },
  { year: "1", label: "1 Yıllık Program", image: "/yeniklasor/1yillik.png", hex: "#E8CCB2" },
];

function AnimatedCard({
  p,
  index,
  onIncele,
}: {
  p: (typeof programs)[number];
  index: number;
  onIncele: (href: string) => void;
}) {
  return (
    <ScrollReveal delay={index * 100} distance={24} duration={800}>
      <div
        className="relative rounded-2xl shadow-lg select-none group"
        onContextMenu={(e) => e.preventDefault()}
        style={{ backgroundColor: "transparent" }}
      >
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(77, 61, 45, 0.72) 0%, rgba(92, 72, 53, 0.42) 12%, rgba(92, 72, 53, 0.42) 88%, rgba(77, 61, 45, 0.72) 100%)",
          }}
        >
          <Image
            src={p.image}
            alt={p.label}
            width={1600}
            height={800}
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 80vw, 768px"
            draggable={false}
            className="w-full h-auto block pointer-events-none"
            style={{
              borderRadius: "inherit",
              maskImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.18) 0%, black 12%, black 88%, rgba(0, 0, 0, 0.18) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.18) 0%, black 12%, black 88%, rgba(0, 0, 0, 0.18) 100%)",
            }}
          />
        </div>
        <button
          type="button"
          onClick={() => onIncele(`/program/${p.year}yil`)}
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide cursor-pointer group/btn"
          style={{
            backgroundColor: `color-mix(in srgb, ${p.hex} 85%, white)`,
            color: "#2C2C2C",
            zIndex: 1,
            boxShadow: `0 2px 12px ${p.hex}44, 0 1px 3px rgba(0,0,0,0.08)`,
            backdropFilter: "blur(12px) saturate(1.4)",
            WebkitBackdropFilter: "blur(12px) saturate(1.4)",
            border: `1px solid ${p.hex}33`,
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          İncele
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </ScrollReveal>
  );
}

export default function ProgramTurleriSection({
  headingLevel = "h2",
  showSubtitle = true,
}: ProgramTurleriSectionProps) {
  const Heading = headingLevel;

  const handleIncele = (href: string) => {
    window.location.href = href;
  };

  return (
    <section id="programs" className="relative bg-transparent pb-10 sm:pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal duration={800} distance={32}>
          <div className="relative z-20 max-w-3xl mx-auto text-center mb-12">
            <Heading className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-2">
              Program Türleri
            </Heading>
            <div
              className={`w-16 h-1 bg-earth/30 mx-auto rounded-full ${
                showSubtitle ? "mb-6" : "mb-0"
              }`}
            />
            {showSubtitle ? (
              <p className="text-earth text-lg">
                Farklı şartlara ve ezber kabiliyetlerine sahip bireyleri göz
                önünde bulundurarak, günlük hayattan soğutmadan tasarlanmış dört
                farklı program.
              </p>
            ) : null}
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto flex flex-col gap-5">
          {programs.map((p, i) => (
            <AnimatedCard
              key={p.year}
              p={p}
              index={i}
              onIncele={handleIncele}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
