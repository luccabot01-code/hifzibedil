import type { Metadata } from "next";
import ProgramQuiz from "./ProgramQuiz";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "Programımı Bul",
  description:
    "Size en uygun Hıfz-ı Bedîl programını belirlemek için kısa değerlendirme anketimizi doldurun.",
};

export default function ProgramBulPage() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <ProgramQuiz />
    </>
  );
}
