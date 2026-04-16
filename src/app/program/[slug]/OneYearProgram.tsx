"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { PageReveal } from "@/components/PageReveal";
import ScrollReveal from "@/components/ScrollReveal";
import { CalendarDays, BookOpen, type LucideIcon } from "lucide-react";

const HEX = "#E8CCB2";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-8">
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dark mb-2">
        {children}
      </h2>
      <div
        className="w-12 h-1 mx-auto rounded-full"
        style={{ backgroundColor: HEX }}
      />
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <div
      className="rounded-2xl p-3 sm:p-6 text-center flex-1 min-w-0"
      style={{ backgroundColor: `${HEX}20`, border: `1px solid ${HEX}50` }}
    >
      <div className="flex justify-center mb-2 sm:mb-3">
        <Icon className="size-5 sm:size-7 text-dark/70" strokeWidth={1.5} />
      </div>
      <div className="font-serif text-lg sm:text-3xl font-bold text-dark mb-1 leading-none">
        {value}
      </div>
      <div className="text-earth text-[11px] sm:text-sm leading-tight">{label}</div>
    </div>
  );
}

const products = [
  {
    src: "/images/programs/1year/canta.png",
    alt: "Program Çantası",
    label: "Çanta",
    desc: "Taşıma kolaylığı sağlayan özel tasarım çanta",
  },
  {
    src: "/images/programs/1year/takvim.png",
    alt: "Program Takvimi",
    label: "Takvim",
    desc: "1 yılın her günü için özel olarak hazırlanmış ezber / tekrar takip takvimi",
  },
  {
    src: "/yeniklasor/ogrenci.png?v=20260408-220717",
    alt: "Öğrenci Ajandası",
    label: "Öğrenci Ajandası",
    desc: "Öğrenciler için program takibini kolaylaştıran Ajanda",
  },
  {
    src: "/yeniklasor/egitmen.png?v=20260408-220735",
    alt: "Eğitmen Ajandası",
    label: "Eğitmen Ajandası",
    desc: "Eğitmenler için öğrenci takibini kolaylaştıran Ajanda",
  },
  {
    src: "/images/programs/1year/ayrac.png",
    alt: "Ayraç Seti",
    label: "Ayraç",
    desc: "Sayfa takibini kolaylaştıran özel tasarım mıknatıslı ayraç",
  },
];

function computeOriginTransform(originRect: DOMRect, finalRect: DOMRect) {
  const scaleX = originRect.width / (finalRect.width || 1);
  const scaleY = originRect.height / (finalRect.height || 1);
  const scale = Math.min(scaleX, scaleY, 0.55);

  const dx = (originRect.left + originRect.width / 2) - (finalRect.left + finalRect.width / 2);
  const dy = (originRect.top + originRect.height / 2) - (finalRect.top + finalRect.height / 2);

  return `translate(${dx}px, ${dy}px) scale(${scale.toFixed(4)})`;
}

function ProductOverlay({
  product,
  onClose,
  originRect,
}: {
  product: (typeof products)[number];
  onClose: () => void;
  originRect: DOMRect | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [btnVisible, setBtnVisible] = useState(false);
  const closing = useRef(false);
  const animations = useRef<Animation[]>([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const backdrop = backdropRef.current;
    if (!card || !backdrop) return;

    const easeOut = "cubic-bezier(0.16, 1, 0.3, 1)";
    const blurAmount = window.innerWidth < 640 ? "blur(3px)" : "blur(6px)";

    let originT = "scale(0.85)";
    if (originRect) {
      const finalRect = card.getBoundingClientRect();
      originT = computeOriginTransform(originRect, finalRect);
    }

    const cardAnim = card.animate(
      [
        { opacity: 0, transform: originT, offset: 0 },
        { opacity: 1, transform: originT, offset: 0.15 },
        { opacity: 1, transform: "translate(0, 0) scale(1)", offset: 1 },
      ],
      { duration: 500, easing: easeOut, fill: "forwards" }
    );

    const backdropAnim = backdrop.animate(
      [
        { opacity: 0, backdropFilter: "blur(0px)" },
        { opacity: 1, backdropFilter: blurAmount },
      ],
      { duration: 400, easing: easeOut, fill: "forwards" }
    );

    animations.current = [cardAnim, backdropAnim];

    const btnTimer = setTimeout(() => setBtnVisible(true), 400);

    return () => {
      animations.current.forEach((a) => a.cancel());
      animations.current = [];
      clearTimeout(btnTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = useCallback(() => {
    if (closing.current) return;
    closing.current = true;

    const card = cardRef.current;
    const backdrop = backdropRef.current;
    if (!card || !backdrop) { onClose(); return; }

    animations.current.forEach((a) => { try { a.finish(); } catch { /* ok */ } });

    setBtnVisible(false);

    const easeIn = "cubic-bezier(0.4, 0, 0.2, 1)";

    let targetT = "scale(0.9)";
    if (originRect) {
      const currentRect = card.getBoundingClientRect();
      targetT = computeOriginTransform(originRect, currentRect);
    }

    const cardAnim = card.animate(
      [
        { opacity: 1, transform: "translate(0, 0) scale(1)" },
        { opacity: 0, transform: targetT },
      ],
      { duration: 380, easing: easeIn, fill: "forwards" }
    );

    backdrop.animate(
      [
        { opacity: 1, backdropFilter: window.innerWidth < 640 ? "blur(3px)" : "blur(6px)" },
        { opacity: 0, backdropFilter: "blur(0px)" },
      ],
      { duration: 350, easing: easeIn, fill: "forwards" }
    );

    cardAnim.onfinish = () => onClose();
  }, [onClose, originRect]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60"
        style={{ opacity: 0 }}
      />

      <div
        ref={cardRef}
        className="relative z-10 flex flex-col items-center max-w-sm sm:max-w-lg w-full mx-4"
        style={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative w-full rounded-3xl overflow-hidden"
          style={{
            backgroundColor: "#e8e4da",
            boxShadow: "0 25px 60px rgba(35,31,32,0.15), 0 10px 20px rgba(35,31,32,0.08)",
          }}
        >
          <div
            className="absolute top-0 inset-x-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent 10%, ${HEX} 50%, transparent 90%)` }}
          />

          <div className="pt-6 pb-2 text-center">
            <span
              className="inline-block px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-dark/70 uppercase"
              style={{ background: `linear-gradient(135deg, ${HEX}30, ${HEX}15)`, border: `1px solid ${HEX}40` }}
            >
              {product.label}
            </span>
          </div>

          <div
            className="relative flex h-[240px] sm:h-[320px] items-center justify-center px-8 py-6 sm:px-10 sm:py-8"
            style={{ backgroundColor: "#e8e4da" }}
          >
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[65%] h-[50%] rounded-full blur-[60px] opacity-40"
              style={{ background: `radial-gradient(ellipse, ${HEX} 0%, transparent 70%)` }}
            />
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[50%] h-[8px] rounded-full blur-md opacity-20"
              style={{ background: HEX }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.src}
              alt={product.alt}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className="relative z-10 w-auto h-[190px] sm:h-[260px] max-w-full object-contain select-none pointer-events-auto"
            />
          </div>

          <div
            className="mx-10 h-[1px]"
            style={{ background: `linear-gradient(90deg, transparent, ${HEX}60, transparent)` }}
          />

          <div className="px-8 sm:px-10 py-5 text-center min-h-[88px] sm:min-h-[96px] flex items-center justify-center">
            <p className="text-dark/55 text-sm sm:text-base leading-relaxed">
              {product.desc}
            </p>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="mt-5 px-4 py-1.5 rounded-full text-white/90 sm:text-white/60 text-xs border border-white/30 sm:border-white/15 bg-white/10 sm:bg-transparent hover:text-white/90 hover:border-white/30 hover:bg-white/10 cursor-pointer transition-opacity duration-300 ease-out"
          style={{ opacity: btnVisible ? 1 : 0 }}
        >
          Kapatmak için tıklayın
        </button>
      </div>
    </div>,
    document.body
  );
}

function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const longPressing = useRef(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const didLongPress = useRef(false);
  const currentPressed = useRef<number | null>(null);
  const cachedRects = useRef<DOMRect[]>([]);
  const rafId = useRef<number>(0);

  const handleClick = (index: number) => {
    if (didLongPress.current) {
      didLongPress.current = false;
      return;
    }
    const rect = cardRefs.current[index]?.getBoundingClientRect() ?? null;
    setOriginRect(rect);
    setActiveIndex(index);
  };

  const hitTest = useCallback((x: number, y: number) => {
    const rects = cachedRects.current;
    for (let i = 0; i < rects.length; i++) {
      const r = rects[i];
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
        return i;
      }
    }
    return null;
  }, []);

  const cacheRects = useCallback(() => {
    cachedRects.current = cardRefs.current.map(
      (el) => el?.getBoundingClientRect() ?? new DOMRect()
    );
  }, []);

  const pressCard = useCallback((idx: number | null) => {
    const prev = currentPressed.current;
    if (prev === idx) return;

    if (prev !== null) {
      cardRefs.current[prev]?.removeAttribute("data-pressed");
    }
    if (idx !== null) {
      cardRefs.current[idx]?.setAttribute("data-pressed", "true");
    }

    currentPressed.current = idx;
  }, []);

  const enterLongPress = useCallback((index: number) => {
    longPressing.current = true;
    didLongPress.current = true;
    if (gridRef.current) gridRef.current.style.touchAction = "none";
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    cacheRects();
    pressCard(index);
  }, [pressCard, cacheRects]);

  const handleTouchStart = useCallback((e: React.TouchEvent, index: number) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    didLongPress.current = false;

    longPressTimer.current = setTimeout(() => {
      enterLongPress(index);
    }, 300);
  }, [enterLongPress]);

  const handleMouseDown = useCallback((e: React.MouseEvent, index: number) => {
    touchStartPos.current = { x: e.clientX, y: e.clientY };
    didLongPress.current = false;

    longPressTimer.current = setTimeout(() => {
      enterLongPress(index);
    }, 300);
  }, [enterLongPress]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];

      if (!longPressing.current && touchStartPos.current) {
        const dx = Math.abs(touch.clientX - touchStartPos.current.x);
        const dy = Math.abs(touch.clientY - touchStartPos.current.y);
        if (dx > 10 || dy > 10) {
          if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
          }
          return;
        }
      }

      if (!longPressing.current) return;

      e.preventDefault();

      const x = touch.clientX;
      const y = touch.clientY;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const idx = hitTest(x, y);
        pressCard(idx);
      });
    };

    const onTouchEnd = () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
      cancelAnimationFrame(rafId.current);
      longPressing.current = false;
      touchStartPos.current = null;
      if (grid) grid.style.touchAction = "";
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      pressCard(null);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!longPressing.current && touchStartPos.current) {
        const dx = Math.abs(e.clientX - touchStartPos.current.x);
        const dy = Math.abs(e.clientY - touchStartPos.current.y);
        if (dx > 10 || dy > 10) {
          if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
          }
          return;
        }
      }

      if (!longPressing.current) return;

      e.preventDefault();

      const x = e.clientX;
      const y = e.clientY;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const idx = hitTest(x, y);
        pressCard(idx);
      });
    };

    const onMouseUp = () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
      cancelAnimationFrame(rafId.current);
      longPressing.current = false;
      touchStartPos.current = null;
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      pressCard(null);
    };

    grid.addEventListener("touchmove", onTouchMove, { passive: false });
    grid.addEventListener("touchend", onTouchEnd);
    grid.addEventListener("touchcancel", onTouchEnd);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      grid.removeEventListener("touchmove", onTouchMove);
      grid.removeEventListener("touchend", onTouchEnd);
      grid.removeEventListener("touchcancel", onTouchEnd);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [hitTest, pressCard]);

  const activeProduct = activeIndex !== null ? products[activeIndex] : null;

  return (
    <section className="product-section">
      <SectionTitle>1 Yıllık Has Programı Kiti</SectionTitle>

      <div aria-hidden className="absolute w-0 h-0 overflow-hidden">
        {products.map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={p.label} src={p.src} alt="" />
        ))}
      </div>

      <div className="relative pt-1 pb-8 sm:pb-10">
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 px-8 touch-pan-y"
        >
          {products.map((item, i) => (
            <ScrollReveal
              key={item.label}
              delay={i * 100}
              distance={24}
              className={i === products.length - 1 ? "col-span-2 mx-auto w-full max-w-[calc(50%-0.625rem)] sm:col-span-1 sm:max-w-none" : ""}
            >
              <div
                ref={(el) => { cardRefs.current[i] = el; }}
                onClick={() => handleClick(i)}
                onTouchStart={(e) => handleTouchStart(e, i)}
                onMouseDown={(e) => handleMouseDown(e, i)}
                onContextMenu={(e) => e.preventDefault()}
                className="product-card group relative rounded-2xl flex flex-col cursor-pointer origin-center overflow-hidden select-none"
                style={{
                  background: `linear-gradient(180deg, #faf9f6 0%, ${HEX}20 60%, ${HEX}35 100%)`,
                }}
              >
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

                <div className="relative flex min-h-[148px] sm:min-h-[188px] justify-center items-end pt-6 pb-2 px-4 sm:pt-8 sm:px-6 flex-1">
                  <div
                    className="product-card__glow absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-[40%] rounded-full blur-2xl"
                    style={{
                      background: `radial-gradient(ellipse, ${HEX} 0%, transparent 70%)`,
                    }}
                  />
                  {item.label.includes("Ajandası") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.src}
                      alt={item.alt}
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      className="product-card__img relative z-10 w-auto h-[112px] sm:h-[146px] max-w-[85%] object-contain select-none [filter:drop-shadow(0_8px_20px_rgba(0,0,0,0.2))_drop-shadow(0_3px_6px_rgba(0,0,0,0.1))]"
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={800}
                      height={800}
                      quality={75}
                      priority
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      className="product-card__img relative z-10 w-auto h-[112px] sm:h-[146px] max-w-[85%] object-contain select-none [filter:drop-shadow(0_8px_20px_rgba(0,0,0,0.2))_drop-shadow(0_3px_6px_rgba(0,0,0,0.1))]"
                    />
                  )}
                </div>

                <div
                  className="relative h-[3px] mx-6 rounded-full opacity-40"
                  style={{ background: `linear-gradient(90deg, transparent, ${HEX}, transparent)` }}
                />

                <div className="px-3 pt-3 pb-4 text-center">
                  <p className="text-[10px] sm:text-[11px] text-dark/35">
                    Detay için tıklayın
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {activeProduct && (
        <ProductOverlay
          product={activeProduct}
          originRect={originRect}
          onClose={() => { setActiveIndex(null); setOriginRect(null); }}
        />
      )}
    </section>
  );
}

export default function OneYearProgram() {
  return (
    <div className="space-y-12">
      {/* ───── PROGRAM HAKKINDA ───── */}
      <PageReveal delay={100}>
        <section>
          <div
            className="rounded-2xl p-6 sm:p-10"
            style={{
              backgroundColor: `${HEX}10`,
              border: `1px solid ${HEX}40`,
            }}
          >
            <p className="text-earth text-base sm:text-lg leading-relaxed mb-6 max-w-3xl mx-auto text-center">
              Diğer programlardan farklı olarak, önceden hafızlık yapmış olan
              kişilerin{" "}
              <span className="font-semibold text-dark">
                tekrar mahiyetinde yapacakları bir has çalışmasıdır.
              </span>
            </p>

            <p className="text-earth text-base sm:text-lg leading-relaxed mb-8 max-w-3xl mx-auto text-center">
              Çok hızlı ezber kabiliyeti gibi istisnai durumlar dışında hafızlığa
              ilk defa başlayacak öğrenciler için tavsiye edilmemektedir. Hafız
              olmakla birlikte hafızlığı çok zayıf olan bireyler için de uygun
              görülmemektedir.
            </p>

            {/* Stat cards — mobile and desktop: side-by-side */}
            <div className="grid grid-cols-2 gap-2 sm:hidden mx-auto w-full">
              <StatCard icon={CalendarDays} value="12 Ay" label="48 Hafta" />
              <StatCard icon={BookOpen} value="3 Cüz" label="Aylık Yeni Ezber" />
            </div>
            <div className="hidden sm:flex flex-wrap justify-center gap-6">
              <StatCard icon={CalendarDays} value="12 Ay" label="48 Hafta" />
              <StatCard icon={BookOpen} value="3 Cüz" label="Aylık Yeni Ezber" />
            </div>
          </div>
        </section>
      </PageReveal>

      {/* ───── ÜRÜN GALERİSİ ───── */}
      <ScrollReveal delay={100}>
        <ProductShowcase />
      </ScrollReveal>
    </div>
  );
}
