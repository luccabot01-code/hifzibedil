"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";

const menuItems = [
  { label: "Anasayfa", href: "/" },
  { label: "Hıfz-ı Bedîl Hakkında", href: "/nedir" },
  { label: "Dr. Fatma Yasemin Mısırlı Kimdir?", href: "/dr-fatma-yasemin-misirli-kimdir" },
  { label: "Hıfz-ı Bedîl Kiti", href: "/kit" },
  { label: "SSS", href: "/sss" },
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
  const pathname = usePathname();
  const isOpen = openPathname === pathname;
  const isFullscreen =
    fullscreenMenuRoutes.includes(pathname) || pathname.startsWith("/program/");

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
          className={`w-full max-w-5xl transition-all duration-500 rounded-2xl border ${
            scrolled
              ? "bg-white/20 backdrop-blur-lg sm:backdrop-blur-2xl shadow-lg shadow-dark/5 border-white/15"
              : "bg-white/15 backdrop-blur-md sm:backdrop-blur-xl border-white/10"
          }`}
        >
          <div className="px-5 sm:px-6">
            <div className="flex items-center justify-between h-14">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/site-icon/icon.png"
                  alt="Hıfz-ı Bedîl"
                  width={36}
                  height={36}
                  sizes="36px"
                  loading="eager"
                  style={{ height: "auto" }}
                  className="rounded-lg"
                />
                <span className="font-serif text-lg font-semibold text-dark hidden sm:block">
                  Hıfz-ı Bedîl
                </span>
              </Link>

              {/* Hamburger Button */}
              <button
                type="button"
                onClick={toggleMenu}
                className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/40 transition-colors"
                aria-label="Menü"
                aria-expanded={isOpen}
                aria-controls="site-navigation-drawer"
              >
                <div className="w-5 h-4 relative flex flex-col justify-between">
                  <span
                    className={`block h-0.5 bg-dark rounded-full transition-all duration-300 origin-center ${
                      isOpen ? "rotate-45 translate-y-[7px]" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-dark rounded-full transition-all duration-300 ${
                      isOpen ? "opacity-0 scale-x-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-dark rounded-full transition-all duration-300 origin-center ${
                      isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-dark/20 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        {/* Menu Panel */}
        <div
          id="site-navigation-drawer"
          className={`absolute top-0 right-0 h-full bg-ivory/95 backdrop-blur-xl shadow-2xl transition-all duration-500 ease-out ${
            isFullscreen ? "w-full sm:w-[26rem]" : "w-1/2 sm:w-[26rem]"
          } ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="pt-24 px-6 sm:px-8 h-full flex flex-col">
            <nav className="flex flex-col gap-3 sm:gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={true}
                  onClick={(event) => handleMenuItemClick(event, item.href)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#A7A096]/30 text-dark bg-[#A7A096]/26 hover:bg-[#A7A096]/40 active:bg-[#A7A096]/52 active:scale-[0.98] transition-all duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A7A096] scale-125 shrink-0 transition-all" />
                  <span className="min-w-0 flex-1">
                    <span className="block whitespace-nowrap text-[13px] leading-[1.2] tracking-[-0.01em] font-medium sm:text-[14px]">
                      {item.label}
                    </span>
                  </span>
                </Link>
              ))}
            </nav>

            {/* Social Buttons */}
            <div className="mt-auto pb-8 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 border-t border-sand flex items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/hifzibedil"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-earth/10 text-earth hover:bg-earth hover:text-ivory transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href="mailto:info@hifzibedil.com"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-earth/10 text-earth hover:bg-earth hover:text-ivory transition-colors"
                aria-label="E-posta"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
              <a
                href="https://wa.me/905300202483"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-earth/10 text-earth hover:bg-earth hover:text-ivory transition-colors"
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
