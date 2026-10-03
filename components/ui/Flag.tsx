// 14-point federal star of the Malaysian flag
const malaysiaStar = Array.from({ length: 28 }, (_, i) => {
  const r = i % 2 ? 0.85 : 2;
  const a = (Math.PI * i) / 14 - Math.PI / 2;
  return `${(10 + r * Math.cos(a)).toFixed(2)},${(4 + r * Math.sin(a)).toFixed(2)}`;
}).join(" ");

export const Flag = ({ country, className = "w-7 h-[14px]" }: { country: string; className?: string }) =>
  country === "Malaysia" ? (
    <svg viewBox="0 0 28 14" className={`${className} rounded-[2px] shadow-sm`} aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={i} y={i} width="28" height="1" fill={i % 2 ? "#fff" : "#CC0001"} />
      ))}
      <rect width="14" height="8" fill="#010066" />
      <circle cx="5.6" cy="4" r="3" fill="#FFCC00" />
      <circle cx="6.5" cy="4" r="2.5" fill="#010066" />
      <polygon points={malaysiaStar} fill="#FFCC00" />
    </svg>
  ) : country === "Egypt" ? (
    <svg viewBox="0 0 21 14" className={`${className} rounded-[2px] shadow-sm`} aria-hidden="true">
      <rect width="21" height="14" fill="#fff" />
      <rect width="21" height="4.67" fill="#CE1126" />
      <rect y="9.33" width="21" height="4.67" fill="#000" />
      <circle cx="10.5" cy="7" r="1.4" fill="#C09300" />
    </svg>
  ) : null;
