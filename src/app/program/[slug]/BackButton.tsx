"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SCROLL_TO_PROGRAMS_STORAGE_KEY } from "@/lib/home-navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        try {
          sessionStorage.setItem(SCROLL_TO_PROGRAMS_STORAGE_KEY, "1");
        } catch {
          /* private mode */
        }
        router.push("/");
      }}
      className="group inline-flex items-center gap-2 px-8 py-4 bg-[#A7A096] text-ivory rounded-xl font-medium text-lg hover:bg-[#958d83] transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
      Tüm Programlara Dön
    </button>
  );
}
