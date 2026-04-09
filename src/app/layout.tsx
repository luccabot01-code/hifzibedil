import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";
import ClientBoot from "@/components/ClientBoot";

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
    icon: "/site-icon/site-icon.png",
    apple: "/site-icon/site-icon.png",
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/site-icon/site-icon.png",
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
    images: ["/site-icon/site-icon.png"],
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
      <body className="min-h-full flex flex-col">
        <ClientBoot />
        {children}
      </body>
    </html>
  );
}
