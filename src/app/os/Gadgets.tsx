import { useEffect, useState } from "react";

/* Desktop gadgets: Microsoft retired them, which is exactly why they belong here */
export function Gadgets() {
  return (
    <div className="w7-gadgets" aria-label="Desktop gadgets">
      <ClockGadget />
      <CalendarGadget />
      <MeterGadget />
    </div>
  );
}

function useNow(ms: number) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
}

function ClockGadget() {
  const now = useNow(1000);
  const s = now.getSeconds();
  const m = now.getMinutes() + s / 60;
  const h = (now.getHours() % 12) + m / 60;

  return (
    <svg width="132" height="132" viewBox="0 0 132 132" role="img" aria-label={`Clock: ${now.toLocaleTimeString()}`} style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,.45))" }}>
      <defs>
        <radialGradient id="g-face" cx="0.5" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.75" stopColor="#e9eef3" />
          <stop offset="1" stopColor="#c3ccd6" />
        </radialGradient>
        <linearGradient id="g-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f8fa" />
          <stop offset="0.5" stopColor="#8a96a3" />
          <stop offset="1" stopColor="#3d4651" />
        </linearGradient>
      </defs>
      <circle cx="66" cy="66" r="62" fill="url(#g-rim)" />
      <circle cx="66" cy="66" r="55" fill="url(#g-face)" stroke="#6c7783" strokeWidth="0.8" />
      {Array.from({ length: 60 }, (_, i) => {
        const big = i % 5 === 0;
        const a = (i / 60) * Math.PI * 2;
        const r1 = big ? 44 : 48;
        return (
          <line
            key={i}
            x1={66 + Math.sin(a) * r1}
            y1={66 - Math.cos(a) * r1}
            x2={66 + Math.sin(a) * 52}
            y2={66 - Math.cos(a) * 52}
            stroke={big ? "#2b3440" : "#9aa4af"}
            strokeWidth={big ? 2.2 : 0.8}
          />
        );
      })}
      <text x="66" y="92" textAnchor="middle" fontSize="8" fill="#7d8792" fontFamily="Segoe UI, sans-serif" letterSpacing="1">
        CUMILLA
      </text>
      <line x1="66" y1="66" x2={66 + Math.sin((h / 12) * Math.PI * 2) * 28} y2={66 - Math.cos((h / 12) * Math.PI * 2) * 28} stroke="#1f2730" strokeWidth="4" strokeLinecap="round" />
      <line x1="66" y1="66" x2={66 + Math.sin((m / 60) * Math.PI * 2) * 40} y2={66 - Math.cos((m / 60) * Math.PI * 2) * 40} stroke="#1f2730" strokeWidth="2.6" strokeLinecap="round" />
      <line x1={66 - Math.sin((s / 60) * Math.PI * 2) * 9} y1={66 + Math.cos((s / 60) * Math.PI * 2) * 9} x2={66 + Math.sin((s / 60) * Math.PI * 2) * 46} y2={66 - Math.cos((s / 60) * Math.PI * 2) * 46} stroke="#d0342c" strokeWidth="1.2" />
      <circle cx="66" cy="66" r="3.2" fill="#d0342c" stroke="#1f2730" />
      <ellipse cx="66" cy="38" rx="42" ry="22" fill="#fff" opacity="0.35" />
    </svg>
  );
}

function CalendarGadget() {
  const now = useNow(60_000);
  return (
    <div
      className="w-[132px] overflow-hidden rounded-[6px] text-center"
      style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.45), 0 3px 8px rgba(0,0,0,.4)", background: "linear-gradient(#fff, #e9edf2)" }}
      aria-label={now.toDateString()}
    >
      <div className="py-1 text-[12px] text-white" style={{ background: "linear-gradient(#d8584a, #b2271b)", textShadow: "0 1px 1px rgba(0,0,0,.4)" }}>
        {now.toLocaleDateString("en-US", { weekday: "long" })}
      </div>
      <div className="text-[46px] leading-[1.15] font-light text-[#2b3440]">{now.getDate()}</div>
      <div className="pb-2 text-[12px] text-[#5a6779]">{now.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</div>
    </div>
  );
}

function MeterGadget() {
  // A CPU-meter parody: two gauges that idle around their values
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 1600);
    return () => clearInterval(id);
  }, []);
  const curiosity = 92 + Math.round(Math.sin(t * 1.3) * 6);
  const caffeine = 58 + Math.round(Math.cos(t * 0.9) * 14);

  return (
    <div
      className="flex w-[150px] items-end justify-between rounded-[10px] px-2 pt-2 pb-1"
      style={{ background: "radial-gradient(circle at 50% 0%, #3d4a5a, #11161d 75%)", boxShadow: "0 0 0 1px #000, inset 0 0 0 1px rgba(255,255,255,.2), 0 3px 8px rgba(0,0,0,.45)" }}
    >
      <Dial value={curiosity} label="Curiosity" size={74} />
      <Dial value={caffeine} label="Caffeine" size={56} />
    </div>
  );
}

function Dial({ value, label, size }: { value: number; label: string; size: number }) {
  const a = -120 + (value / 100) * 240;
  const r = size / 2;
  return (
    <div className="flex flex-col items-center" aria-label={`${label} ${value}%`}>
      <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="47" fill="#0b0f14" stroke="#7c8896" strokeWidth="2" />
        {Array.from({ length: 11 }, (_, i) => {
          const ang = ((-120 + i * 24) * Math.PI) / 180;
          return <line key={i} x1={50 + Math.sin(ang) * 34} y1={50 - Math.cos(ang) * 34} x2={50 + Math.sin(ang) * 42} y2={50 - Math.cos(ang) * 42} stroke={i > 8 ? "#e5533d" : "#cfd6de"} strokeWidth="2" />;
        })}
        <text x="50" y="75" textAnchor="middle" fontSize="15" fill="#9fe36a" fontFamily="Segoe UI, sans-serif">
          {value}%
        </text>
        <line x1="50" y1="50" x2={50 + Math.sin((a * Math.PI) / 180) * 36} y2={50 - Math.cos((a * Math.PI) / 180) * 36} stroke="#e5533d" strokeWidth="3" strokeLinecap="round" style={{ transition: "all 1.2s cubic-bezier(.3,1.4,.5,1)" }} />
        <circle cx="50" cy="50" r="6" fill="#59636f" stroke="#cfd6de" />
        <ellipse cx="50" cy="28" rx="34" ry="18" fill="#fff" opacity="0.12" />
      </svg>
      <span className="text-[10px] text-[#cfd6de]" style={{ marginTop: -r * 0.05 }}>
        {label}
      </span>
    </div>
  );
}
