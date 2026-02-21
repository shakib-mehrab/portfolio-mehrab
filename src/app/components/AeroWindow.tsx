import { X, Minus, Square, GripVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

interface AeroWindowProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  onClose?: () => void;
  onMinimize?: () => void;
  isActive?: boolean;
  onFocus?: () => void;
  zIndex?: number;
  isMaximized?: boolean;
  onMaximize?: () => void;
}

export function AeroWindow({
  title,
  icon,
  children,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 700, height: 500 },
  onClose,
  onMinimize,
  isActive = true,
  onFocus,
  zIndex = 10,
  isMaximized = false,
  onMaximize,
}: AeroWindowProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || window.innerWidth < 768) return; // Disable dragging on mobile
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    onFocus?.();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragStartPos.current.x,
          y: Math.max(0, e.clientY - dragStartPos.current.y),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isMaximized]);

  const windowStyle = isMaximized
    ? {
        left: 0,
        top: 0,
        width: "100%",
        height: "calc(100% - 48px)",
      }
    : {
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      };

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`absolute rounded-lg overflow-hidden shadow-2xl md:max-w-none max-w-full md:inset-auto inset-x-2 inset-y-2 md:h-auto md:w-auto w-[calc(100%-1rem)] h-[calc(100%-3.5rem)] ${
        isActive ? "shadow-blue-500/30" : "shadow-black/50"
      }`}
      style={{
        ...(window.innerWidth >= 768 ? windowStyle : {}),
        zIndex,
        border: isActive ? "1px solid rgba(99, 179, 237, 0.4)" : "1px solid rgba(0, 0, 0, 0.3)",
      }}
      onClick={onFocus}
    >
      {/* Aero Glass Title Bar */}
      <div
        className={`relative h-10 md:h-8 flex items-center justify-between px-2 md:px-3 cursor-move select-none ${
          isActive
            ? "bg-gradient-to-b from-[rgba(169,207,241,0.9)] via-[rgba(138,186,230,0.9)] to-[rgba(99,157,213,0.9)]"
            : "bg-gradient-to-b from-[rgba(191,205,219,0.9)] via-[rgba(178,195,209,0.9)] to-[rgba(165,185,199,0.9)]"
        } backdrop-blur-md border-b border-white/30`}
        onMouseDown={handleMouseDown}
      >
        {/* Glass shine effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent h-1/2 pointer-events-none" />

        <div className="flex items-center gap-1.5 md:gap-2 z-10 min-w-0 flex-1">
          {icon && <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">{icon}</div>}
          <span className="text-xs md:text-sm font-normal text-white drop-shadow-sm truncate">{title}</span>
        </div>

        <div className="flex items-center gap-0.5 md:gap-1 z-10 flex-shrink-0">
          {/* Minimize Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize?.();
            }}
            aria-label="Minimize window"
            className="w-6 h-5 md:w-7 md:h-6 flex items-center justify-center rounded hover:bg-white/20 transition-colors group"
          >
            <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center bg-gradient-to-b from-white/90 to-white/70 rounded shadow-sm group-hover:from-white group-hover:to-white/80">
              <Minus className="w-2.5 h-2.5 md:w-3 md:h-3 text-gray-700" />
            </div>
          </button>

          {/* Maximize Button - hidden on mobile */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize?.();
            }}
            aria-label="Maximize window"
            className="hidden md:flex w-7 h-6 items-center justify-center rounded hover:bg-white/20 transition-colors group"
          >
            <div className="w-5 h-5 flex items-center justify-center bg-gradient-to-b from-white/90 to-white/70 rounded shadow-sm group-hover:from-white group-hover:to-white/80">
              <Square className="w-2.5 h-2.5 text-gray-700" />
            </div>
          </button>

          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
            aria-label="Close window"
            className="w-6 h-5 md:w-7 md:h-6 flex items-center justify-center rounded hover:bg-red-500/80 transition-colors group"
          >
            <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center bg-gradient-to-b from-red-400 to-red-500 rounded shadow-sm group-hover:from-red-500 group-hover:to-red-600">
              <X className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
            </div>
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-2.5rem)] md:h-[calc(100%-2rem)] overflow-auto backdrop-blur-2xl bg-black/[0.70] border-t border-white/10 scrollbar-thin">
        {children}
      </div>
    </motion.div>
  );
}