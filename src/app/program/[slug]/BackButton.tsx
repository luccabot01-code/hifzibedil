"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link
      href="/#programs"
      className="group inline-flex items-center gap-2 px-8 py-4 bg-[#A7A096] text-ivory rounded-xl font-medium text-lg hover:bg-[#958d83] transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
      Tüm Programlara Dön
    </Link>
  );
}
