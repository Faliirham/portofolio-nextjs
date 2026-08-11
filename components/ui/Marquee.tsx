interface MarqueeProps {
  items: string[];
  variant?: "dark" | "red";
}

export default function Marquee({ items, variant = "dark" }: MarqueeProps) {
  return (
    <div className={`marquee${variant === "red" ? " marquee-red" : ""}`} aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((g) => (
          <div key={g} className="marquee-group">
            {items.map((item, i) => (
              <span key={`${g}-${i}`} className="marquee-item">
                <span className="marquee-dot">◆</span>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}