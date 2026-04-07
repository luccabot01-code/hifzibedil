import Image from "next/image";

export default function Footer() {
  return (
    <footer id="contact">
      <div className="h-10 bg-gradient-to-b from-transparent to-stone/40" />
      <div className="bg-stone/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-5 md:py-4">
          <div className="grid grid-cols-2 gap-6 items-start">
            {/* Left - Logo & Branding */}
            <div className="flex items-start gap-2 md:gap-4">
              <Image
                src="/images/site-icon/icon.png"
                alt="Hıfz-ı Bedîl"
                width={56}
                height={56}
                sizes="56px"
                style={{ height: "auto" }}
                className="rounded-xl opacity-80 ml-1 md:ml-0 md:-mt-5"
              />
              <div className="space-y-1 -ml-1 md:ml-0">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-dark">
                  Hıfz-ı Bedîl
                </h3>
                <p className="font-serif text-xs sm:text-sm italic text-earth/70">
                  Ezberde Temekkün, Tekrarda Sebat
                </p>
              </div>
            </div>

            {/* Right - Contact Info */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-earth/50 uppercase tracking-wider">
                İletişim
              </h4>
              <div className="space-y-3">
                <a
                  href="https://wa.me/905300202483"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-earth hover:text-dark transition-colors"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  0 (530) 020 24 83
                </a>
                <a
                  href="mailto:info@hifzibedil.com"
                  className="flex items-center gap-3 text-sm text-earth hover:text-dark transition-colors"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  info@hifzibedil.com
                </a>
                <a
                  href="https://www.instagram.com/hifzibedil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-earth hover:text-dark transition-colors"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  @hifzibedil
                </a>
                <address className="flex items-start gap-3 text-sm text-earth not-italic">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
                  İskenderpaşa, Sofular Cd. No:33, 34080 Fatih/İstanbul
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-earth/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
            <p className="text-center text-xs text-earth/40">
              &copy; {new Date().getFullYear()} Hıfz-ı Bedîl. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
