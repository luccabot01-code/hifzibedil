"use client";

import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/#programs"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 text-ivory shadow-md hover:shadow-lg"
      style={{ backgroundColor: "#A7A096" }}
    >
      &larr; Tüm Programlara Dön
    </Link>
  );
}
