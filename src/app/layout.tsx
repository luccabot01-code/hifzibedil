import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#FAF9F6",
};

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  icons: {
    icon: "/images/site-icon/icon.png",
    apple: "/images/site-icon/icon.png",
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/images/site-icon/icon.png",
        width: 818,
        height: 1022,
        alt: siteName,
      },
    ],
    type: "website",
    locale: "tr_TR",
    siteName,
  },
  twitter: {
    card: "summary",
    title: siteName,
    description: siteDescription,
    images: ["/images/site-icon/icon.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteName,
  },
  formatDetection: {
    telephone: false,
  },
};

const homeScrollResetScript = `
(() => {
  if (window.location.pathname !== "/") {
    return;
  }

  const getNavigationType = () => {
    const navigationEntry = window.performance
      ?.getEntriesByType?.("navigation")?.[0];

    if (navigationEntry && "type" in navigationEntry) {
      return navigationEntry.type;
    }

    const legacyNavigation = window.performance?.navigation;

    if (!legacyNavigation) {
      return "navigate";
    }

    if (legacyNavigation.type === 1) {
      return "reload";
    }

    if (legacyNavigation.type === 2) {
      return "back_forward";
    }

    return "navigate";
  };

  if (getNavigationType() !== "reload") {
    return;
  }

  const previousScrollRestoration = window.history.scrollRestoration;
  const clearHash = () => {
    if (!window.location.hash) {
      return;
    }

    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname + window.location.search
    );
  };

  const resetScroll = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const restoreScrollBehavior = () => {
    window.history.scrollRestoration = previousScrollRestoration || "auto";
  };

  window.history.scrollRestoration = "manual";
  clearHash();
  resetScroll();

  window.requestAnimationFrame(() => {
    resetScroll();
    window.setTimeout(resetScroll, 0);
    window.setTimeout(resetScroll, 150);
  });

  window.addEventListener(
    "pageshow",
    () => {
      resetScroll();
      window.setTimeout(() => {
        resetScroll();
        restoreScrollBehavior();
      }, 150);
    },
    { once: true }
  );

  window.addEventListener(
    "load",
    () => {
      resetScroll();
      window.setTimeout(() => {
        resetScroll();
        restoreScrollBehavior();
      }, 150);
    },
    { once: true }
  );
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: homeScrollResetScript }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
