"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface ImageLightboxProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
}

export default function ImageLightbox({
  src,
  alt,
  width = 400,
  height = 500,
  className = "",
  sizes,
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const canPortal = typeof document !== "undefined";

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, close]);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        quality={90}
        className={`cursor-pointer ${className}`}
        onClick={() => setOpen(true)}
      />

      {open &&
        canPortal &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm"
            onClick={close}
          >
            <button
              onClick={close}
              className="fixed top-4 right-4 z-[10000] w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors text-xl"
              aria-label="Kapat"
            >
              ✕
            </button>
            {/* Desktop: centered, Mobile: scrollable & pinch-zoomable */}
            <div
              className="h-full w-full overflow-auto overscroll-contain flex items-center justify-center md:p-4"
              style={{ WebkitOverflowScrolling: "touch", touchAction: "manipulation" }}
              onClick={close}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="md:max-w-full md:max-h-full md:object-contain w-full h-auto md:w-auto"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
