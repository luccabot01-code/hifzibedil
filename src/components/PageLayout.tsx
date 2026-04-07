import Image from "next/image";
import Navbar from "./Navbar";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-20 overflow-x-hidden">
        {/* Background image - bottom right */}
        <div className="absolute bottom-0 right-0 w-[130px] h-[130px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] pointer-events-none z-0">
          <Image
            src="/yeniklasor/sagaltlogo.png"
            alt=""
            fill
            sizes="(max-width: 640px) 130px, (max-width: 768px) 200px, 300px"
            className="object-contain object-right-bottom opacity-50"
          />
        </div>
        <div className="relative z-10 w-full">{children}</div>
      </main>
    </>
  );
}
