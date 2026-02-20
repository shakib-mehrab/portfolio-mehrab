import { useState } from "react";
import { motion } from "motion/react";

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isOpen?: boolean;
}

export function DesktopIcon({ icon, label, onClick, isOpen = false }: DesktopIconProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 300);
    onClick?.();
  };

  const isActive = isOpen || isPressed;

  return (
    <motion.button
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className={`w-20 h-24 flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl cursor-pointer group transition-colors duration-200 ${
        isActive
          ? "backdrop-blur-xl bg-white/25 border-2 border-white/50 shadow-[0_0_16px_rgba(59,130,246,0.4)]"
          : "border-2 border-transparent hover:bg-white/15 hover:border-white/30 hover:backdrop-blur-lg"
      }`}
      onClick={handleClick}
    >
      {/* Icon container */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Glass backing */}
        <div
          className={`absolute inset-0 rounded-xl transition-all duration-200 ${
            isActive
              ? "backdrop-blur-md bg-white/30 shadow-lg border border-white/50"
              : "backdrop-blur-md bg-gradient-to-br from-white/30 to-white/10 shadow-xl border border-white/40 group-hover:from-white/40 group-hover:to-white/20"
          }`}
        />
        {/* Glossy shine */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/50 via-white/10 to-transparent opacity-60 pointer-events-none" />
        {/* Light sweep on hover */}
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700" />
        </div>
        <div className="relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
          {icon}
        </div>
      </div>

      <span
        className="text-[11px] text-white text-center leading-tight font-medium break-words max-w-full px-0.5"
        style={{
          textShadow: "0 1px 4px rgba(0,0,0,1), 0 0 12px rgba(0,0,0,0.8)",
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}
