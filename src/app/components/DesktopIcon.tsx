import { useState } from "react";

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export function DesktopIcon({ icon, label, onClick }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <button
      className={`w-24 h-28 flex flex-col items-center justify-center gap-2 p-3 rounded-xl ${
        isSelected
          ? "backdrop-blur-xl bg-white/30 border-2 border-white/60 shadow-xl"
          : "hover:backdrop-blur-lg hover:bg-white/20 border-2 border-transparent hover:border-white/40"
      } transition-all cursor-pointer group`}
      onClick={() => {
        setIsSelected(!isSelected);
        onClick?.();
      }}
      onDoubleClick={onClick}
    >
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Shiny glass background */}
        <div className="absolute inset-0 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/40 to-white/10 shadow-2xl border border-white/50 group-hover:from-white/50 group-hover:to-white/20 transition-all" />
        
        {/* Glossy shine effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-50" />
        
        {/* Icon with enhanced shadow */}
        <div className="relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
          {icon}
        </div>
      </div>
      
      <span
        className="text-xs text-white text-center leading-tight font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] break-words max-w-full px-1"
        style={{
          textShadow: "1px 1px 3px rgba(0,0,0,0.9), -1px -1px 3px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.5)",
        }}
      >
        {label}
      </span>
    </button>
  );
}