interface OrnamentProps {
  className?: string;
}

export function Bismillah({ className = "" }: OrnamentProps) {
  return (
    <svg viewBox="0 0 200 40" className={className} fill="currentColor">
      <text x="100" y="30" textAnchor="middle" fontFamily="serif" fontSize="24" fontStyle="italic" opacity="0.3">
        ﷽
      </text>
    </svg>
  );
}

export function StarOrnament({ className = "" }: OrnamentProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.9L16.18 20 12 16.27 7.82 20l1.09-6.83L3.82 9.27l6.09-1.01L12 2z" />
      <circle cx="12" cy="12" r="3" strokeWidth="0.5" />
    </svg>
  );
}

export function CrescentStar({ className = "" }: OrnamentProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="currentColor" opacity="0.15">
      <path d="M20 4C11.16 4 4 11.16 4 20s7.16 16 16 16c2.64 0 5.12-.64 7.32-1.76C23.08 32.08 20 27.44 20 22c0-5.44 3.08-10.08 7.32-12.24C25.12 4.64 22.64 4 20 4z" />
      <polygon points="32,10 33.5,14 37.5,14 34.5,16.5 35.5,20.5 32,18 28.5,20.5 29.5,16.5 26.5,14 30.5,14" />
    </svg>
  );
}

export function SectionOrnament({ className = "" }: OrnamentProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="w-8 h-px bg-earth/20" />
      <svg viewBox="0 0 20 20" className="w-4 h-4 text-earth/25" fill="currentColor">
        <path d="M10 0l2.5 7.5H20l-6 4.5 2.3 7.5L10 15l-6.3 4.5 2.3-7.5-6-4.5h7.5z" />
      </svg>
      <div className="w-8 h-px bg-earth/20" />
    </div>
  );
}
