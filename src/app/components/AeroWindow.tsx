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
    if (isMaximized) return;
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
      className={`absolute rounded-lg overflow-hidden shadow-2xl ${
        isActive ? "shadow-blue-500/30" : "shadow-black/50"
      }`}
      style={{
        ...windowStyle,
        zIndex,
        border: isActive ? "1px solid rgba(99, 179, 237, 0.4)" : "1px solid rgba(0, 0, 0, 0.3)",
      }}
      onClick={onFocus}
    >
      {/* Aero Glass Title Bar */}
      <div
        className={`relative h-8 flex items-center justify-between px-3 cursor-move select-none ${
          isActive
            ? "bg-gradient-to-b from-[rgba(169,207,241,0.9)] via-[rgba(138,186,230,0.9)] to-[rgba(99,157,213,0.9)]"
            : "bg-gradient-to-b from-[rgba(191,205,219,0.9)] via-[rgba(178,195,209,0.9)] to-[rgba(165,185,199,0.9)]"
        } backdrop-blur-md border-b border-white/30`}
        onMouseDown={handleMouseDown}
      >
        {/* Glass shine effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent h-1/2 pointer-events-none" />

        <div className="flex items-center gap-2 z-10">
          {icon && <div className="w-4 h-4 flex items-center justify-center">{icon}</div>}
          <span className="text-sm font-normal text-white drop-shadow-sm">{title}</span>
        </div>

        <div className="flex items-center gap-1 z-10">
          {/* Minimize Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize?.();
            }}
            className="w-7 h-6 flex items-center justify-center rounded hover:bg-white/20 transition-colors group"
          >
            <div className="w-5 h-5 flex items-center justify-center bg-gradient-to-b from-white/90 to-white/70 rounded shadow-sm group-hover:from-white group-hover:to-white/80">
              <Minus className="w-3 h-3 text-gray-700" />
            </div>
          </button>

          {/* Maximize Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize?.();
            }}
            className="w-7 h-6 flex items-center justify-center rounded hover:bg-white/20 transition-colors group"
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
            className="w-7 h-6 flex items-center justify-center rounded hover:bg-red-500/80 transition-colors group"
          >
            <div className="w-5 h-5 flex items-center justify-center bg-gradient-to-b from-red-400 to-red-500 rounded shadow-sm group-hover:from-red-500 group-hover:to-red-600">
              <X className="w-3 h-3 text-white" />
            </div>
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-2rem)] overflow-auto backdrop-blur-2xl bg-black/[0.70] border-t border-white/10" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(59,130,246,0.25) transparent" }}>
        {children}
      </div>
    </motion.div>
  );
}