'use client';

import { useEffect, useRef, useState } from "react";
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
  const [isNearViewport, setIsNearViewport] = useState(true);

  const mix = (from: number, to: number, progress: number) =>
    from + (to - from) * progress;

  const getCssNumber = (styles: CSSStyleDeclaration, propertyName: string) => {
    const value = Number.parseFloat(styles.getPropertyValue(propertyName));
    return Number.isFinite(value) ? value : 0;
  };

  const syncSlidePresentation = (swiper: SwiperType) => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const styles = window.getComputedStyle(sectionElement);
    const inactiveBlur = getCssNumber(styles, "--inactive-blur");
    const nearBlur = getCssNumber(styles, "--near-blur");
    const inactiveScale = getCssNumber(styles, "--inactive-scale");
    const prevScale = getCssNumber(styles, "--prev-scale");
    const nextScale = getCssNumber(styles, "--next-scale");
    const activeScale = getCssNumber(styles, "--active-scale");
    const inactiveOpacity = getCssNumber(styles, "--inactive-opacity");
    const nearOpacity = getCssNumber(styles, "--near-opacity");

    Array.from(swiper.slides).forEach((slideNode) => {
      const slideElement = slideNode as HTMLElement & { progress?: number };
      const slideProgress = slideElement.progress ?? 0;
      const absoluteProgress = Math.min(Math.abs(slideProgress), 2);
      const isNextSlide = slideProgress > 0;
      const nearScale = isNextSlide ? nextScale : prevScale;

      let blur = inactiveBlur;
      let scale = inactiveScale;
      let opacity = inactiveOpacity;

      if (absoluteProgress <= 1) {
        blur = mix(0, nearBlur, absoluteProgress);
        scale = mix(activeScale, nearScale, absoluteProgress);
        opacity = mix(1, nearOpacity, absoluteProgress);
      } else {
        const outerProgress = absoluteProgress - 1;
        blur = mix(nearBlur, inactiveBlur, outerProgress);
        scale = mix(nearScale, inactiveScale, outerProgress);
        opacity = mix(nearOpacity, inactiveOpacity, outerProgress);
      }

      slideElement.style.setProperty("--card-blur-live", `${blur.toFixed(3)}px`);
      slideElement.style.setProperty("--card-scale-live", scale.toFixed(4));
      slideElement.style.setProperty("--card-opacity-live", opacity.toFixed(4));
    });
  };

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

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`image-carousel py-10 sm:py-12${isNearViewport ? " is-near-viewport" : ""}`}
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
              --carousel-panel-radius: 20px;
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
                radial-gradient(42% 40% at 16% 34%, rgba(249, 238, 223, 0.28) 0%, rgba(249, 238, 223, 0.16) 22%, rgba(249, 238, 223, 0.04) 42%, rgba(249, 238, 223, 0) 68%),
                radial-gradient(34% 34% at 82% 44%, rgba(225, 191, 159, 0.18) 0%, rgba(225, 191, 159, 0.08) 24%, rgba(225, 191, 159, 0.02) 44%, rgba(225, 191, 159, 0) 66%),
                radial-gradient(46% 42% at 30% 82%, rgba(214, 171, 137, 0.14) 0%, rgba(214, 171, 137, 0.06) 26%, rgba(214, 171, 137, 0.02) 42%, rgba(214, 171, 137, 0) 66%);
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

            .image-carousel .carousel-edge-fade {
              position: absolute;
              inset: 0;
              z-index: 3;
              pointer-events: none;
              background: linear-gradient(
                180deg,
                rgba(246, 240, 233, 0.98) 0%,
                rgba(246, 240, 233, 0.84) 8%,
                rgba(246, 240, 233, 0.2) 16%,
                rgba(246, 240, 233, 0) 24%,
                rgba(246, 240, 233, 0) 76%,
                rgba(226, 208, 191, 0.18) 84%,
                rgba(226, 208, 191, 0.74) 92%,
                rgba(226, 208, 191, 0.96) 100%
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
              transition: transform 0.42s cubic-bezier(0.22, 1, 0.36, 1),
                          filter 0.42s cubic-bezier(0.22, 1, 0.36, 1),
                          opacity 0.42s cubic-bezier(0.22, 1, 0.36, 1),
                          box-shadow 0.42s cubic-bezier(0.22, 1, 0.36, 1);
              filter: blur(var(--card-blur-live));
              opacity: var(--card-opacity-live);
              transform: translateZ(0) scale(var(--card-scale-live));
              transform-origin: center center;
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
              isolation: isolate;
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
                  transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                  opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                  filter 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                  box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1);
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
                --carousel-panel-radius: 24px;
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
                transition: transform 0.48s cubic-bezier(0.22, 1, 0.36, 1),
                            filter 0.48s cubic-bezier(0.22, 1, 0.36, 1),
                            opacity 0.48s cubic-bezier(0.22, 1, 0.36, 1),
                            box-shadow 0.48s cubic-bezier(0.22, 1, 0.36, 1);
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
                width: min(122%, 1480px);
                height: min(112%, 840px);
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
            }
          `,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="carousel-panel"
          style={{
            position: "relative",
            overflow: "hidden",
            background:
              "radial-gradient(58% 72% at 14% 24%, rgba(252, 243, 231, 0.82) 0%, rgba(252, 243, 231, 0.34) 22%, rgba(252, 243, 231, 0.08) 38%, rgba(252, 243, 231, 0) 58%), radial-gradient(46% 58% at 86% 30%, rgba(229, 197, 167, 0.7) 0%, rgba(229, 197, 167, 0.26) 22%, rgba(229, 197, 167, 0.08) 38%, rgba(229, 197, 167, 0) 60%), radial-gradient(52% 62% at 36% 86%, rgba(213, 171, 137, 0.44) 0%, rgba(213, 171, 137, 0.18) 24%, rgba(213, 171, 137, 0.04) 40%, rgba(213, 171, 137, 0) 62%), linear-gradient(138deg, #f6f0e9 0%, #ecd8c4 22%, #dec0a9 54%, #c99578 100%)",
          }}
        >
          <div className="carousel-ambient" />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(250, 249, 246, 0.84) 0%, rgba(250, 249, 246, 0) 16%, rgba(245, 240, 235, 0.02) 78%, rgba(232, 223, 213, 0.08) 92%, rgba(232, 223, 213, 0.16) 100%)",
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

          <div className="carousel-edge-fade" />

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
                requestAnimationFrame(() => {
                  syncSlidePresentation(swiper);
                });
              }}
              onProgress={(swiper) => {
                syncSlidePresentation(swiper);
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
              longSwipesMs={220}
              speed={440}
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
                  speed: 500,
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
                  speed: 560,
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
                  speed: 650,
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
