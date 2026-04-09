import Image from "next/image";
import Navbar from "./Navbar";
import AnimatedWatermarkLogo from "./AnimatedWatermarkLogo";

export default function PageLayout({
  children,
  backgroundLogoSrc = "/yeniklasor/sagaltlogo.png",
  backgroundLogoVariant = "default",
  backgroundLogoOpacity,
  backgroundLogoBlurPx,
}: {
  children: React.ReactNode;
  backgroundLogoSrc?: string;
  backgroundLogoVariant?: "default" | "program";
  backgroundLogoOpacity?: number;
  backgroundLogoBlurPx?: number;
}) {
  const isProgramLogo = backgroundLogoVariant === "program";

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-20 overflow-x-hidden">
        {/* Background image */}
        <div
          className={`absolute inset-0 pointer-events-none z-0 ${
            isProgramLogo ? "overflow-hidden" : "overflow-x-hidden"
          }`}
        >
          <div
            className={`absolute ${
              isProgramLogo
                ? "bottom-0 right-0 translate-x-[35%] translate-y-[35%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[760px] md:h-[760px]"
                : "bottom-0 right-0 w-[130px] h-[130px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px]"
            }`}
          >
            {isProgramLogo ? (
              <AnimatedWatermarkLogo
                src={backgroundLogoSrc}
                alt=""
                sizes="(max-width: 640px) 300px, (max-width: 768px) 500px, 760px"
                className="h-full w-full"
                enableScrollRotate={false}
                watermarkOpacity={backgroundLogoOpacity}
                watermarkBlurPx={backgroundLogoBlurPx}
              />
            ) : (
              <Image
                src={backgroundLogoSrc}
                alt=""
                fill
                sizes="(max-width: 640px) 130px, (max-width: 768px) 200px, 300px"
                className="object-contain object-right-bottom opacity-50"
              />
            )}
          </div>
        </div>
        <div className="relative z-10 w-full">{children}</div>
      </main>
    </>
  );
}
