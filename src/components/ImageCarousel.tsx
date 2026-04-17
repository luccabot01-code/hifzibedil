'use client';

import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import Image from "next/image";
const images = [
  { src: "/yeni-klasor2/1.JPG", alt: "Slide 1" },
  { src: "/yeni-klasor2/2.JPG", alt: "Slide 2" },
  { src: "/yeni-klasor2/3.JPG", alt: "Slide 3" },
  { src: "/yeni-klasor2/4.JPG", alt: "Slide 4" },
  { src: "/yeni-klasor2/5.JPG", alt: "Slide 5" },
  { src: "/yeni-klasor2/6.JPG", alt: "Slide 6" },
  { src: "/yeni-klasor2/7.JPG", alt: "Slide 7" },
  { src: "/yeni-klasor2/8.JPG", alt: "Slide 8" },
];

const carouselImageSizes =
  "(max-width: 639px) 72vw, (max-width: 767px) 48vw, (max-width: 1023px) 38vw, 320px";

const eagerlyLoadedSlideCount = 3;

export default function ImageCarousel() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const frameRef = useRef<number | null>(null);
  const metricsRef = useRef({
    inactiveBlur: 0,
    nearBlur: 0,
    inactiveScale: 0,
    prevScale: 0,
    nextScale: 0,
    activeScale: 0,
    inactiveOpacity: 0,
    nearOpacity: 0,
  });
  const [isNearViewport, setIsNearViewport] = useState(true);
  const [hasRevealed, setHasRevealed] = useState(false);

  const mix = (from: number, to: number, progress: number) =>
    from + (to - from) * progress;

  /** Smooth0→1 easing for blur only (keeps endpoints; softer than linear). */
  const smoothBlurT = (t: number) => {
    const x = Math.min(Math.max(t, 0), 1);
    return x * x * (3 - 2 * x);
  };

  const getCssNumber = (styles: CSSStyleDeclaration, propertyName: string) => {
    const value = Number.parseFloat(styles.getPropertyValue(propertyName));
    return Number.isFinite(value) ? value : 0;
  };

  const refreshPresentationMetrics = () => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const styles = window.getComputedStyle(sectionElement);
    metricsRef.current = {
      inactiveBlur: getCssNumber(styles, "--inactive-blur"),
      nearBlur: getCssNumber(styles, "--near-blur"),
      inactiveScale: getCssNumber(styles, "--inactive-scale"),
      prevScale: getCssNumber(styles, "--prev-scale"),
      nextScale: getCssNumber(styles, "--next-scale"),
      activeScale: getCssNumber(styles, "--active-scale"),
      inactiveOpacity: getCssNumber(styles, "--inactive-opacity"),
      nearOpacity: getCssNumber(styles, "--near-opacity"),
    };
  };

  const prevValuesRef = useRef<Map<HTMLElement, string>>(new Map());

  const syncSlidePresentation = (swiper: SwiperType) => {
    const {
      inactiveBlur,
      nearBlur,
      inactiveScale,
      prevScale,
      nextScale,
      activeScale,
      inactiveOpacity,
      nearOpacity,
    } = metricsRef.current;

    const slides = swiper.slides;
    const activeIndex = swiper.activeIndex;
    const prevValues = prevValuesRef.current;

    for (let i = 0; i < slides.length; i++) {
      const slideElement = slides[i] as HTMLElement & { progress?: number };
      const slideProgress = slideElement.progress ?? 0;
      const absoluteProgress = Math.min(Math.abs(slideProgress), 2);

      // Skip slides far from active - they won't be visually changing
      if (Math.abs(i - activeIndex) > 3) {
        const key = `${inactiveBlur}|${inactiveScale}|${inactiveOpacity}`;
        if (prevValues.get(slideElement) === key) continue;
        prevValues.set(slideElement, key);
        slideElement.style.setProperty("--card-blur-live", `${inactiveBlur}px`);
        slideElement.style.setProperty("--card-scale-live", String(inactiveScale));
        slideElement.style.setProperty("--card-opacity-live", String(inactiveOpacity));
        continue;
      }

      const isNextSlide = slideProgress > 0;
      const nearScale = isNextSlide ? nextScale : prevScale;

      let blur: number;
      let scale: number;
      let opacity: number;

      if (absoluteProgress <= 1) {
        blur = mix(0, nearBlur, smoothBlurT(absoluteProgress));
        scale = mix(activeScale, nearScale, absoluteProgress);
        opacity = mix(1, nearOpacity, absoluteProgress);
      } else {
        const outerProgress = absoluteProgress - 1;
        blur = mix(nearBlur, inactiveBlur, smoothBlurT(outerProgress));
        scale = mix(nearScale, inactiveScale, outerProgress);
        opacity = mix(nearOpacity, inactiveOpacity, outerProgress);
      }

      // Round to reduce style recalcs for tiny changes (extra precision for blur ramps)
      const blurR = Math.round(blur * 1000) / 1000;
      const scaleR = Math.round(scale * 1000) / 1000;
      const opacityR = Math.round(opacity * 1000) / 1000;

      const key = `${blurR}|${scaleR}|${opacityR}`;
      if (prevValues.get(slideElement) === key) continue;
      prevValues.set(slideElement, key);

      slideElement.style.setProperty("--card-blur-live", `${blurR}px`);
      slideElement.style.setProperty("--card-scale-live", String(scaleR));
      slideElement.style.setProperty("--card-opacity-live", String(opacityR));
    }
  };

  const scheduleSlidePresentationSync = (swiper: SwiperType) => {
    swiperRef.current = swiper;

    if (frameRef.current !== null) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      syncSlidePresentation(swiper);
    });
  };

  const refreshAndSchedulePresentation = useEffectEvent(() => {
    refreshPresentationMetrics();

    if (swiperRef.current) {
      scheduleSlidePresentationSync(swiperRef.current);
    }
  });

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
      },
      { rootMargin: "240px 0px" }
    );

    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          revealObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionElement);
    revealObserver.observe(sectionElement);
    refreshAndSchedulePresentation();
    window.addEventListener("resize", refreshAndSchedulePresentation, { passive: true });

    return () => {
      window.removeEventListener("resize", refreshAndSchedulePresentation);
      observer.disconnect();
      revealObserver.disconnect();

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`image-carousel py-10 sm:py-12${isNearViewport ? " is-near-viewport" : ""}${hasRevealed ? " cards-revealed" : ""}`}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .image-carousel {
              --carousel-slide-width: clamp(228px, 72vw, 276px);
              --carousel-panel-padding-y: clamp(42px, 10vw, 56px);
              --carousel-panel-radius: 0px;
              --carousel-stage-padding-x: 6px;
              --carousel-card-radius: 18px;
              --inactive-scale: 0.86;
              --inactive-blur: 0px;
              --inactive-opacity: 0.32;
              --backdrop-logo-opacity: 0.41;
              --backdrop-logo-blur: 0.7px;
              --prev-scale: 0.94;
              --next-scale: 0.94;
              --near-blur: 0px;
              --near-opacity: 0.62;
              --active-scale: 1.02;
            }

            .image-carousel .swiper {
              overflow: visible;
              touch-action: pan-y pinch-zoom;
              user-select: none;
              -webkit-user-select: none;
            }

            .image-carousel .swiper-wrapper {
              align-items: center;
            }

            .image-carousel .swiper-slide {
              z-index: 1;
              --card-blur: var(--inactive-blur);
              --card-blur-live: var(--card-blur);
              --card-scale: var(--inactive-scale);
              --card-scale-live: var(--card-scale);
              --card-opacity: var(--inactive-opacity);
              --card-opacity-live: var(--card-opacity);
            }

            .image-carousel .swiper-slide-prev,
            .image-carousel .swiper-slide-next {
              z-index: 4 !important;
            }

            .image-carousel .swiper-slide-active {
              z-index: 8 !important;
            }

            .image-carousel .carousel-panel {
              padding-top: var(--carousel-panel-padding-y);
              padding-bottom: var(--carousel-panel-padding-y);
              border-radius: var(--carousel-panel-radius);
              contain: paint;
            }

            .image-carousel .carousel-ambient {
              position: absolute;
              inset: -10%;
              z-index: 0;
              pointer-events: none;
              background:
                radial-gradient(58% 52% at 8% 32%, rgba(249, 238, 223, 0.28) 0%, rgba(249, 238, 223, 0.16) 24%, rgba(249, 238, 223, 0.04) 46%, rgba(249, 238, 223, 0) 72%),
                radial-gradient(58% 52% at 92% 40%, rgba(225, 191, 159, 0.18) 0%, rgba(225, 191, 159, 0.08) 26%, rgba(225, 191, 159, 0.02) 46%, rgba(225, 191, 159, 0) 72%),
                radial-gradient(72% 48% at 50% 86%, rgba(214, 171, 137, 0.14) 0%, rgba(214, 171, 137, 0.06) 28%, rgba(214, 171, 137, 0.02) 46%, rgba(214, 171, 137, 0) 72%);
              opacity: 0.42;
              transform: translateZ(0);
            }

            @keyframes carouselBackdropRotate {
              from {
                transform: rotate(0deg) scale(1.03);
              }
              to {
                transform: rotate(360deg) scale(1.03);
              }
            }

            .image-carousel .carousel-stage {
              padding-left: var(--carousel-stage-padding-x);
              padding-right: var(--carousel-stage-padding-x);
              transform: translateZ(0);
              backface-visibility: hidden;
            }

            .image-carousel .carousel-backdrop-art {
              position: absolute;
              inset: 0;
              z-index: 1;
              pointer-events: none;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 6%;
              opacity: 0.72;
              transform: translateZ(0);
              backface-visibility: hidden;
            }

            .image-carousel .carousel-backdrop-art::after {
              content: "";
              position: absolute;
              inset: 0;
              background: linear-gradient(
                180deg,
                rgba(246, 240, 233, 0.18) 0%,
                rgba(246, 240, 233, 0.04) 24%,
                rgba(222, 192, 169, 0) 52%,
                rgba(201, 149, 120, 0.1) 100%
              );
            }

            /* Full bleed veil; below .carousel-stage (z-index 2) so cards sit on top. */
            .image-carousel .carousel-edge-fade {
              position: absolute;
              inset: 0;
              z-index: 1;
              pointer-events: none;
              background: linear-gradient(
                180deg,
                rgba(246, 240, 233, 0.98) 0%,
                rgba(246, 240, 233, 0.84) 8%,
                rgba(246, 240, 233, 0.2) 16%,
                rgba(246, 240, 233, 0) 24%,
                rgba(246, 240, 233, 0) 76%,
                rgba(246, 240, 233, 0.2) 84%,
                rgba(246, 240, 233, 0.84) 92%,
                rgba(246, 240, 233, 0.98) 100%
              );
            }

            .image-carousel .carousel-backdrop-art-image {
              position: relative;
              width: min(186%, 2080px);
              height: min(156%, 1040px);
              overflow: hidden;
              opacity: var(--backdrop-logo-opacity);
              transform: translateY(1%) scale(1.02);
            }

            .image-carousel .carousel-backdrop-art-image img {
              animation: carouselBackdropRotate 120s linear infinite;
              animation-play-state: paused;
              transform-origin: center center;
              will-change: transform;
              filter: blur(var(--backdrop-logo-blur));
              backface-visibility: hidden;
            }

            .image-carousel.is-near-viewport .carousel-backdrop-art-image img {
              animation-play-state: running;
            }

            .image-carousel .carousel-backdrop-art-image::after {
              content: "";
              position: absolute;
              inset: 18% 16%;
              border-radius: 999px;
              pointer-events: none;
              opacity: 0.38;
              background: radial-gradient(
                circle at center,
                rgba(245, 236, 226, 0.14) 0%,
                rgba(245, 236, 226, 0.06) 44%,
                rgba(245, 236, 226, 0.015) 68%,
                rgba(245, 236, 226, 0) 100%
              );
            }

            .image-carousel .carousel-slide {
              width: var(--carousel-slide-width) !important;
              max-width: 320px;
            }

            /* === INACTIVE cards (all slides by default) === */
            .image-carousel .swiper-slide .carousel-card {
              transition: transform 0.55s cubic-bezier(0.28, 0.72, 0.36, 1),
                          opacity 0.55s cubic-bezier(0.28, 0.72, 0.36, 1),
                          filter 1.05s cubic-bezier(0.18, 0.88, 0.32, 1),
                          box-shadow 0.55s cubic-bezier(0.28, 0.72, 0.36, 1);
              filter: blur(var(--card-blur-live));
              opacity: var(--card-opacity-live);
              transform: translate3d(0,0,0) scale(var(--card-scale-live));
              transform-origin: center center;
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
              isolation: isolate;
              contain: layout style paint;
            }

            .image-carousel .swiper-slide-prev .carousel-card,
            .image-carousel .swiper-slide-next .carousel-card,
            .image-carousel .swiper-slide-active .carousel-card {
              will-change: transform, opacity, filter;
            }

            .image-carousel .carousel-card::before {
              content: "";
              position: absolute;
              inset: 0;
              z-index: 0;
              opacity: 1;
              border-radius: inherit;
              background: linear-gradient(
                180deg,
                rgba(244, 237, 228, 0.78) 0%,
                rgba(239, 229, 218, 0.72) 52%,
                rgba(231, 217, 202, 0.8) 100%
              );
            }

            .image-carousel .carousel-card img {
              position: relative;
              z-index: 1;
            }

            /* === ACTIVE card === */
            .image-carousel .swiper-slide-active {
              --card-blur: 0px;
              --card-scale: var(--active-scale);
              --card-opacity: 1;
            }

            .image-carousel .swiper-slide-active .carousel-card {
              box-shadow:
                0 10px 20px rgba(91, 67, 48, 0.09),
                0 0 0 1px rgba(255, 255, 255, 0.08);
            }

            /* === Cards immediately adjacent to active === */
            .image-carousel .swiper-slide-prev,
            .image-carousel .swiper-slide-next {
              --card-blur: var(--near-blur);
              --card-opacity: var(--near-opacity);
            }

            .image-carousel .swiper-slide-prev {
              --card-scale: var(--prev-scale);
            }

            .image-carousel .swiper-slide-next {
              --card-scale: var(--next-scale);
            }

            .image-carousel .swiper-slide-prev .carousel-card,
            .image-carousel .swiper-slide-next .carousel-card {
              box-shadow: none;
            }

            @media (max-width: 639px) {
              .image-carousel {
                --backdrop-logo-opacity: 0.36;
                --backdrop-logo-blur: 0.55px;
                --inactive-blur: 0.1px;
                --near-blur: 0.72px;
              }

              .image-carousel .carousel-backdrop-art {
                padding: 5%;
              }

              .image-carousel .carousel-backdrop-art-image {
                width: min(196%, 2200px);
                height: min(168%, 1140px);
                transform: translateY(1.5%) scale(1.04);
              }

              .image-carousel .swiper-slide .carousel-card {
                transition:
                  transform 0.5s cubic-bezier(0.28, 0.72, 0.36, 1),
                  opacity 0.5s cubic-bezier(0.28, 0.72, 0.36, 1),
                  filter 0.95s cubic-bezier(0.18, 0.88, 0.32, 1),
                  box-shadow 0.5s cubic-bezier(0.28, 0.72, 0.36, 1);
              }

              .image-carousel .swiper-slide-active .carousel-card {
                box-shadow:
                  0 8px 16px rgba(91, 67, 48, 0.08),
                  0 0 0 1px rgba(255, 255, 255, 0.06);
              }
            }

            @media (min-width: 640px) {
              .image-carousel {
                --carousel-slide-width: clamp(240px, 48vw, 292px);
                --carousel-panel-padding-y: 64px;
                --carousel-stage-padding-x: 10px;
                --carousel-card-radius: 19px;
                --inactive-scale: 0.83;
                --inactive-blur: 0.35px;
                --inactive-opacity: 0.3;
                --prev-scale: 0.91;
                --next-scale: 0.91;
                --near-blur: 0.18px;
                --near-opacity: 0.6;
                --active-scale: 1.04;
              }
            }

            @media (min-width: 768px) {
              .image-carousel {
                --carousel-slide-width: clamp(250px, 38vw, 304px);
                --carousel-panel-padding-y: 72px;
                --carousel-panel-radius: 0px;
                --carousel-stage-padding-x: 12px;
                --carousel-card-radius: 20px;
                --inactive-scale: 0.8;
                --inactive-blur: 1px;
                --inactive-opacity: 0.34;
                --prev-scale: 0.89;
                --next-scale: 0.89;
                --near-blur: 0.83px;
                --near-opacity: 0.62;
                --active-scale: 1.05;
              }

              .image-carousel .swiper-slide .carousel-card {
                transition: transform 0.6s cubic-bezier(0.28, 0.72, 0.36, 1),
                            opacity 0.6s cubic-bezier(0.28, 0.72, 0.36, 1),
                            filter 1.12s cubic-bezier(0.18, 0.88, 0.32, 1),
                            box-shadow 0.6s cubic-bezier(0.28, 0.72, 0.36, 1);
              }

              .image-carousel .carousel-backdrop-art {
                opacity: 0.68;
              }

              .image-carousel .swiper-slide-active .carousel-card {
                box-shadow:
                  0 14px 30px rgba(91, 67, 48, 0.11),
                  0 0 0 1px rgba(255, 255, 255, 0.08);
              }
            }

            @media (min-width: 1024px) {
              .image-carousel {
                --carousel-slide-width: clamp(220px, 30vw, 320px);
                --carousel-panel-padding-y: 80px;
                --carousel-stage-padding-x: 16px;
                --carousel-card-radius: 20px;
                --backdrop-logo-opacity: 0.36;
                --backdrop-logo-blur: 0.9px;
                --inactive-scale: 0.78;
                --inactive-blur: 1.8px;
                --inactive-opacity: 0.38;
                --prev-scale: 0.84;
                --next-scale: 0.84;
                --near-blur: 1.43px;
                --near-opacity: 0.65;
                --active-scale: 1.08;
              }

              .image-carousel .carousel-backdrop-art {
                opacity: 0.64;
              }

              .image-carousel .carousel-backdrop-art-image {
                width: min(160%, 2200px);
                height: min(118%, 920px);
              }

              .image-carousel .carousel-backdrop-art-image::after {
                opacity: 0.28;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .image-carousel .carousel-backdrop-art-image img,
              .image-carousel .swiper-slide .carousel-card {
                animation: none !important;
                transition-duration: 0.01ms;
              }
              .image-carousel .carousel-slide {
                opacity: 1 !important;
                transform: none !important;
              }
            }

            /* === Card entrance animations === */
            @keyframes cardFromLeft {
              from {
                opacity: 0;
                transform: translate3d(-80px, 30px, 0) scale(0.3) rotate(-3deg);
              }
              to {
                opacity: 1;
                transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
              }
            }

            @keyframes cardFromRight {
              from {
                opacity: 0;
                transform: translate3d(80px, 30px, 0) scale(0.3) rotate(3deg);
              }
              to {
                opacity: 1;
                transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
              }
            }

            @keyframes cardFromTop {
              from {
                opacity: 0;
                transform: translate3d(0, -70px, 0) scale(0.3);
              }
              to {
                opacity: 1;
                transform: translate3d(0, 0, 0) scale(1);
              }
            }

            @keyframes cardFromBottom {
              from {
                opacity: 0;
                transform: translate3d(0, 70px, 0) scale(0.3);
              }
              to {
                opacity: 1;
                transform: translate3d(0, 0, 0) scale(1);
              }
            }

            .image-carousel .carousel-slide {
              opacity: 0;
            }

            .image-carousel.cards-revealed .carousel-slide {
              animation-duration: 1.8s;
              animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
              animation-fill-mode: forwards;
            }

            /* Fan pattern: outer cards from sides, inner from top/bottom */
            .image-carousel.cards-revealed .carousel-slide:nth-child(1) {
              animation-name: cardFromLeft;
              animation-delay: 0ms;
            }
            .image-carousel.cards-revealed .carousel-slide:nth-child(2) {
              animation-name: cardFromBottom;
              animation-delay: 180ms;
            }
            .image-carousel.cards-revealed .carousel-slide:nth-child(3) {
              animation-name: cardFromTop;
              animation-delay: 360ms;
            }
            .image-carousel.cards-revealed .carousel-slide:nth-child(4) {
              animation-name: cardFromRight;
              animation-delay: 540ms;
            }
            .image-carousel.cards-revealed .carousel-slide:nth-child(5) {
              animation-name: cardFromBottom;
              animation-delay: 720ms;
            }
            .image-carousel.cards-revealed .carousel-slide:nth-child(6) {
              animation-name: cardFromLeft;
              animation-delay: 900ms;
            }
            .image-carousel.cards-revealed .carousel-slide:nth-child(7) {
              animation-name: cardFromTop;
              animation-delay: 1080ms;
            }
            .image-carousel.cards-revealed .carousel-slide:nth-child(8) {
              animation-name: cardFromRight;
              animation-delay: 1260ms;
            }

          `,
        }}
      />

      <div
        className="carousel-panel w-full"
        style={{
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(70% 62% at 50% 50%, rgba(252, 244, 232, 0.85) 0%, rgba(250, 240, 224, 0.55) 22%, rgba(245, 232, 214, 0.28) 42%, rgba(245, 240, 235, 0.08) 62%, rgba(245, 240, 235, 0) 82%), radial-gradient(58% 46% at 50% 50%, rgba(255, 248, 236, 0.55) 0%, rgba(250, 240, 222, 0.22) 38%, rgba(250, 240, 222, 0) 72%), radial-gradient(120% 80% at 50% 50%, rgba(232, 219, 201, 0.18) 0%, rgba(232, 219, 201, 0.08) 38%, rgba(232, 219, 201, 0) 66%), #F5F0EB",
        }}
      >
          <div className="carousel-ambient" />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(245, 240, 235, 1) 0%, rgba(245, 240, 235, 0.7) 6%, rgba(245, 240, 235, 0.25) 14%, rgba(245, 240, 235, 0) 26%, rgba(245, 240, 235, 0) 74%, rgba(245, 240, 235, 0.25) 86%, rgba(245, 240, 235, 0.7) 94%, rgba(245, 240, 235, 1) 100%)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              pointerEvents: "none",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.12'/%3E%3C/svg%3E\")",
              backgroundSize: "150px 150px",
              opacity: 0.4,
            }}
          />

          <div className="carousel-backdrop-art">
            <div className="carousel-backdrop-art-image">
              <Image
                src="/yeniklasor/yeniherologo.png"
                alt="6 yıl arka plan görseli"
                fill
                sizes="(max-width: 1023px) 86vw, 1040px"
                decoding="async"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          <div className="carousel-edge-fade" />

          <div className="relative z-[2] w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="carousel-stage"
              style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
              }}
            >
              <Swiper
              modules={[EffectCoverflow]}
              effect="coverflow"
              onSwiper={(swiper) => {
                refreshPresentationMetrics();
                scheduleSlidePresentationSync(swiper);
              }}
              onProgress={(swiper) => {
                scheduleSlidePresentationSync(swiper);
              }}
              onResize={(swiper) => {
                refreshPresentationMetrics();
                scheduleSlidePresentationSync(swiper);
              }}
              onBreakpoint={(swiper) => {
                refreshPresentationMetrics();
                scheduleSlidePresentationSync(swiper);
              }}
              initialSlide={0}
              centeredSlides={true}
              slidesPerView="auto"
              watchSlidesProgress={true}
              slideToClickedSlide={true}
              loop={false}
              lazyPreloadPrevNext={1}
              passiveListeners={true}
              roundLengths={true}
              maxBackfaceHiddenSlides={images.length}
              grabCursor={true}
              touchRatio={1.02}
              touchAngle={32}
              touchStartPreventDefault={false}
              resistanceRatio={0.76}
              threshold={2}
              longSwipesRatio={0.28}
              longSwipesMs={280}
              speed={620}
              spaceBetween={10}
              coverflowEffect={{
                rotate: 0,
                stretch: 6,
                depth: 78,
                scale: 0.95,
                modifier: 0.72,
                slideShadows: false,
              }}
              breakpoints={{
                640: {
                  speed: 680,
                  spaceBetween: 14,
                  coverflowEffect: {
                    rotate: 0,
                    stretch: 10,
                    depth: 96,
                    scale: 0.93,
                    modifier: 0.8,
                    slideShadows: false,
                  },
                },
                768: {
                  speed: 760,
                  spaceBetween: 18,
                  coverflowEffect: {
                    rotate: 0,
                    stretch: 14,
                    depth: 122,
                    scale: 0.94,
                    modifier: 0.88,
                    slideShadows: false,
                  },
                },
                1024: {
                  speed: 840,
                  spaceBetween: 28,
                  coverflowEffect: {
                    rotate: 0,
                    stretch: 24,
                    depth: 180,
                    scale: 0.95,
                    modifier: 1,
                    slideShadows: false,
                  },
                },
              }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={image.src} className="carousel-slide">
                  <div
                    className="carousel-card"
                    style={{
                      position: "relative",
                      aspectRatio: "9 / 16",
                      borderRadius: "var(--carousel-card-radius)",
                      overflow: "hidden",
                      background: "transparent",
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={carouselImageSizes}
                      loading={index < eagerlyLoadedSlideCount ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding="async"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
