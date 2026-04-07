"use client";

import Image from "next/image";

export default function FooterHatYazisi() {
  return (
    <div
      className="flex justify-center pb-6 sm:pb-8 select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Image
        src="/yeniklasor/footerustu.png"
        alt="الله ولي التوفيق"
        width={2045}
        height={1152}
        sizes="(max-width: 640px) 200px, 300px"
        draggable={false}
        className="h-20 sm:h-28 w-auto object-contain pointer-events-none opacity-70"
      />
    </div>
  );
}
