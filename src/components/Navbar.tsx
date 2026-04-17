"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpenText,
  CircleHelp,
  House,
  Package,
  UserRound,
} from "lucide-react";
import type { CSSProperties, MouseEvent } from "react";
import type { LucideIcon } from "lucide-react";

const menuItems: Array<{ label: string; href: string; icon: LucideIcon }> = [
  { label: "Anasayfa", href: "/", icon: House },
  {
    label: "Hıfz-ı Bedîl Hakkında",
    href: "/nedir",
    icon: BookOpenText,
  },
  {
    label: "Dr. Fatma Yasemin Mısırlı Kimdir?",
    href: "/dr-fatma-yasemin-misirli-kimdir",
    icon: UserRound,
  },
  { label: "Hıfz-ı Bedîl Kiti", href: "/kit", icon: Package },
  { label: "SSS", href: "/sss", icon: CircleHelp },
];

const fullscreenMenuRoutes = [
  "/",
  "/dr-fatma-yasemin-misirli-kimdir",
  "/nedir",
  "/sistemin-ayirt-edici-yonleri",
  "/nerelerde-uygulanabilir",
  "/kit",
  "/takvim-ajanda",
  "/sss",
  "/program-bul",
];

export default function Navbar() {
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [burgerHover, setBurgerHover] = useState(false);
  const pathname = usePathname();
  const isOpen = openPathname === pathname;
  const isFullscreen =
    fullscreenMenuRoutes.includes(pathname) || pathname.startsWith("/program/");
  const navSurfaceClass = scrolled
    ? "bg-white/[0.16]"
    : "bg-white/[0.11]";
  const navBackdropClass = scrolled
    ? "backdrop-blur-[34px] saturate-[1.85]"
    : "backdrop-blur-[28px] saturate-[1.7]";
  const navGlassStyle = {
    backgroundImage:
      "linear-gradient(180deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.16) 26%, rgba(244,237,229,0.12) 58%, rgba(255,255,255,0.22) 100%), linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.22) 18%, rgba(255,255,255,0.04) 42%, rgba(255,255,255,0.18) 70%, rgba(255,255,255,0.08) 100%)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.56), inset 0 -1px 0 rgba(255,255,255,0.18)",
  } satisfies CSSProperties;
  const iconButtonGlassStyle = {
    backgroundImage:
      "linear-gradient(180deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.14) 100%), radial-gradient(circle at 30% 24%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.18) 34%, rgba(255,255,255,0) 70%)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.62), inset 0 -1px 0 rgba(255,255,255,0.12), 0 4px 10px rgba(58,44,30,0.08)",
  } satisfies CSSProperties;
  const panelGlassStyle = {
    backgroundImage:
      "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 28%, rgba(255,255,255,0.03) 68%, rgba(255,255,255,0.09) 100%), linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 24%, rgba(255,255,255,0.02) 52%, rgba(255,255,255,0.07) 76%, rgba(255,255,255,0.03) 100%)",
    boxShadow:
      "inset 1px 0 0 rgba(255,255,255,0.22), inset 0 1px 0 rgba(255,255,255,0.2)",
  } satisfies CSSProperties;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setOpenPathname(null);
  const toggleMenu = () =>
    setOpenPathname((current) => (current === pathname ? null : pathname));
  const handleMenuItemClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href === "/" && pathname === "/") {
      event.preventDefault();
      closeMenu();
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      return;
    }

    closeMenu();
    // Force scroll to top on navigation
    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-3">
        <nav
          className={`relative isolate w-full max-w-5xl overflow-hidden rounded-[1.7rem] transition-all duration-500 ${navSurfaceClass} ${navBackdropClass}`}
          style={navGlassStyle}
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute -left-6 top-[-2.7rem] h-24 w-40 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.26) 42%, rgba(255,255,255,0) 72%)",
                animation: "navbar-liquid-drift 12s ease-in-out infinite",
              }}
            />
            <div
              className="absolute bottom-[-4.4rem] right-[10%] h-24 w-44 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(214,199,183,0.34) 0%, rgba(214,199,183,0.12) 44%, rgba(214,199,183,0) 74%)",
                animation: "navbar-liquid-drift 15s ease-in-out infinite reverse",
              }}
            />
            <div
              className="absolute inset-y-[-70%] left-[-18%] w-[38%] blur-2xl"
              style={{
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 48%, rgba(255,255,255,0) 100%)",
                animation: "navbar-liquid-sheen 10s linear infinite",
              }}
            />
            <div
              className="absolute inset-x-[18%] top-[55%] h-8 rounded-full blur-2xl"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 22%, rgba(255,255,255,0.08) 55%, rgba(255,255,255,0) 100%)",
              }}
            />
          </div>
          <div className="px-5 sm:px-6">
            <div className="relative flex h-14 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="relative z-10 flex items-center gap-3">
                <Image
                  src="/images/site-icon/icon.png"
                  alt="Hıfz-ı Bedîl"
                  width={36}
                  height={36}
                  sizes="36px"
                  loading="eager"
                  style={{ width: "auto", height: "auto" }}
                  className="rounded-none shadow-none"
                />
                <span className="hidden font-serif text-lg font-semibold tracking-[0.01em] text-dark sm:block">
                  Hıfz-ı Bedîl
                </span>
              </Link>

              {/* Hamburger Button */}
              <button
                type="button"
                onClick={toggleMenu}
                onMouseEnter={() => {
                  if (window.matchMedia("(hover: hover)").matches) setBurgerHover(true);
                }}
                onMouseLeave={() => setBurgerHover(false)}
                className="relative z-10 flex h-10 w-10 touch-manipulation items-center justify-center overflow-hidden rounded-2xl bg-white/[0.09] transition-[box-shadow,transform] duration-300 ease-out hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.72),inset_0_-1px_0_rgba(255,255,255,0.16),0_4px_14px_rgba(58,44,30,0.13)] active:scale-[0.94] active:brightness-[0.97] active:shadow-[inset_0_2px_8px_rgba(58,44,30,0.12)] active:duration-150"
                style={iconButtonGlassStyle}
                aria-label="Menü"
                aria-expanded={isOpen}
                aria-controls="site-navigation-drawer"
              >
                <span
                  className="pointer-events-none absolute inset-x-1 top-0 h-1/2 rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 100%)",
                  }}
                />
                <div className="relative h-4 w-5">
                  <span
                    className="absolute left-0 right-0 mx-auto h-0.5 rounded-full bg-dark transition-all duration-300 ease-[cubic-bezier(0.77,0,0.18,1)]"
                    style={{
                      width: isOpen ? 18 : burgerHover ? 14 : 20,
                      top: isOpen ? 7 : 0,
                      transform: isOpen
                        ? `rotate(45deg)${burgerHover ? " scale(1.1)" : ""}`
                        : "none",
                    }}
                  />
                  <span
                    className="absolute left-0 right-0 mx-auto h-0.5 rounded-full bg-dark transition-all duration-300 ease-[cubic-bezier(0.77,0,0.18,1)]"
                    style={{
                      width: 20,
                      top: 7,
                      opacity: isOpen ? 0 : burgerHover ? 0.55 : 1,
                      transform: isOpen ? "scaleX(0)" : "none",
                    }}
                  />
                  <span
                    className="absolute left-0 right-0 mx-auto h-0.5 rounded-full bg-dark transition-all duration-300 ease-[cubic-bezier(0.77,0,0.18,1)]"
                    style={{
                      width: isOpen ? 18 : burgerHover ? 11 : 20,
                      top: isOpen ? 7 : 14,
                      transform: isOpen
                        ? `rotate(-45deg)${burgerHover ? " scale(1.1)" : ""}`
                        : "none",
                    }}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[rgba(37,30,24,0.22)] backdrop-blur-md transition-opacity duration-500 will-change-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        {/* Menu Panel */}
        <div
          id="site-navigation-drawer"
          className={`absolute top-0 right-0 h-full overflow-hidden bg-white/[0.045] backdrop-blur-[16px] saturate-[1.18] transform-gpu transition-transform duration-500 ease-out will-change-transform sm:top-4 sm:bottom-4 sm:h-auto sm:rounded-l-[2rem] sm:rounded-r-none ${
            isFullscreen ? "w-full sm:w-[26rem]" : "w-1/2 sm:w-[26rem]"
          } ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          style={panelGlassStyle}
          aria-hidden={!isOpen}
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-[-18%] top-[-6%] h-40 w-40 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.1) 48%, rgba(255,255,255,0) 72%)",
              }}
            />
            <div
              className="absolute bottom-[-10%] right-[-12%] h-56 w-56 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(216,200,183,0.18) 0%, rgba(216,200,183,0.06) 50%, rgba(216,200,183,0) 74%)",
              }}
            />
            <div
              className="absolute inset-x-[16%] top-[14%] h-8 rounded-full blur-2xl"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.14) 26%, rgba(255,255,255,0.04) 62%, rgba(255,255,255,0) 100%)",
              }}
            />
          </div>
          <div className="pt-24 px-6 sm:px-8 h-full flex flex-col">
            <nav className="relative z-10 flex flex-col gap-3 sm:gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={true}
                  onClick={(event) => handleMenuItemClick(event, item.href)}
                  className="group flex items-center gap-3 rounded-2xl bg-white/[0.05] px-4 py-3 text-dark backdrop-blur-[12px] transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.08] active:scale-[0.97]"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.03)",
                  }}
                >
                  <item.icon
                    className="h-[15px] w-[15px] shrink-0 text-[#9a8874] transition-all duration-300 group-hover:scale-110 group-hover:text-[#7f6c58]"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block whitespace-nowrap text-[13px] leading-[1.2] tracking-[-0.01em] font-medium sm:text-[14px]">
                      {item.label}
                    </span>
                  </span>
                </Link>
              ))}
            </nav>

            {/* Social Buttons */}
            <div className="relative z-10 mt-auto flex items-center justify-center gap-4 pb-8 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8">
              <a
                href="https://www.instagram.com/hifzibedil"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.05] text-earth backdrop-blur-[12px] transition-all duration-300 hover:scale-[1.08] hover:bg-white/[0.1]"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.03)",
                }}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href="mailto:info@hifzibedil.com"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.05] text-earth backdrop-blur-[12px] transition-all duration-300 hover:scale-[1.08] hover:bg-white/[0.1]"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.03)",
                }}
                aria-label="E-posta"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
              <a
                href="https://wa.me/905300202483"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.05] text-earth backdrop-blur-[12px] transition-all duration-300 hover:scale-[1.08] hover:bg-white/[0.1]"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.03)",
                }}
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
