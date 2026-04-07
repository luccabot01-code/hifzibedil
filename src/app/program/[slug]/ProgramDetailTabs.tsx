"use client";

import { useState } from "react";
import ImageLightbox from "@/components/ImageLightbox";

interface Tab {
  id: string;
  title: string;
  image: string;
}

interface ProgramDetailTabsProps {
  tabs: Tab[];
  hex: string;
  label: string;
}

export default function ProgramDetailTabs({
  tabs,
  hex,
  label,
}: ProgramDetailTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab];

  return (
    <div className="w-full">
      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(i)}
            className="px-6 py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-200 border"
            style={{
              backgroundColor: activeTab === i ? hex : "transparent",
              borderColor: hex,
              color: activeTab === i ? "#2C2C2C" : "#6B5E4F",
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        className="rounded-2xl border p-5 sm:p-8 transition-all duration-300"
        style={{ borderColor: `${hex}60`, backgroundColor: `${hex}10` }}
      >
        {/* Title removed */}
        <div className="flex justify-center">
          <ImageLightbox
            src={current.image}
            alt={`${label} ${current.title}`}
            width={1000}
            height={1200}
            className="rounded-xl w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
