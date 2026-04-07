import type { Metadata } from "next";
import Image from "next/image";
import FooterHatYazisi from "@/components/FooterHatYazisi";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DedicationSection from "@/components/DedicationSection";
import ProgramFinderSection from "@/components/ProgramFinderSection";
import ProgramTurleriSection from "@/components/ProgramTurleriSection";
import Footer from "@/components/Footer";
import ContributorsMarquee from "@/components/ContributorsMarquee";
import { siteDescription } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Hıfz-ı Bedîl",
  },
  description: siteDescription,
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        {/* Background logo - bottom right */}
        <div className="absolute bottom-0 right-0 w-[130px] h-[130px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] pointer-events-none z-0">
          <Image
            src="/yeniklasor/sagaltlogo.png"
            alt=""
            fill
            sizes="(max-width: 640px) 130px, (max-width: 768px) 200px, 300px"
            className="object-contain object-right-bottom opacity-50"
          />
        </div>
        <HeroSection />
        <div className="bg-gradient-to-b from-ivory via-beige/30 to-beige/50">
          <ProgramTurleriSection showSubtitle={false} />
        </div>

        <div className="bg-gradient-to-b from-beige/50 via-beige/60 to-beige">
          <ProgramFinderSection />
        </div>
        <div className="relative overflow-hidden bg-gradient-to-b from-beige via-beige/30 to-stone/40">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-beige/75 via-beige/20 to-transparent" />
          <DedicationSection />
          <FooterHatYazisi />
        </div>
      </main>
      <ContributorsMarquee />
      <Footer />
    </>
  );
}
