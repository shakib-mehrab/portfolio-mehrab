import { useState } from "react";
import { Volume2, Wifi, Clock } from "lucide-react";
import { StartMenu } from "./StartMenu";

interface TaskbarProps {
  openWindows: Array<{ id: string; title: string; icon: React.ReactNode }>;
  activeWindow: string | null;
  onWindowClick: (id: string) => void;
  onStartMenuItemClick: (item: string) => void;
}

export function Taskbar({
  openWindows,
  activeWindow,
  onWindowClick,
  onStartMenuItemClick,
}: TaskbarProps) {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useState(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onMenuItemClick={onStartMenuItemClick}
      />

      <div
        className="fixed bottom-0 left-0 right-0 h-12 flex items-center px-2 z-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(35, 82, 124, 0.95), rgba(20, 50, 76, 0.95))",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Start Button */}
        <button
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          className={`h-9 px-4 mr-2 rounded flex items-center gap-2 font-semibold text-sm transition-all ${
            isStartMenuOpen
              ? "bg-[rgba(20,50,76,0.9)] shadow-inner"
              : "bg-gradient-to-b from-[rgba(69,156,215,0.9)] to-[rgba(41,127,184,0.9)] hover:from-[rgba(89,176,235,0.9)] hover:to-[rgba(61,147,204,0.9)] shadow-lg"
          }`}
          style={{
            border: isStartMenuOpen
              ? "1px solid rgba(0,0,0,0.3)"
              : "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 bg-white/90 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full" />
            </div>
          </div>
          <span className="text-white drop-shadow-md">Start</span>
        </button>

        {/* Window Buttons */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          {openWindows.map((window) => (
            <button
              key={window.id}
              onClick={() => onWindowClick(window.id)}
              className={`h-9 min-w-[160px] max-w-[200px] px-3 flex items-center gap-2 rounded transition-all ${
                activeWindow === window.id
                  ? "bg-[rgba(20,50,76,0.9)] shadow-inner border border-black/30"
                  : "bg-gradient-to-b from-[rgba(69,156,215,0.7)] to-[rgba(41,127,184,0.7)] hover:from-[rgba(89,176,235,0.8)] hover:to-[rgba(61,147,204,0.8)] shadow-md border border-white/20"
              }`}
            >
              <div className="flex-shrink-0 w-4 h-4">{window.icon}</div>
              <span className="text-sm text-white truncate drop-shadow-sm">
                {window.title}
              </span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-2 ml-2 px-3 h-9 bg-[rgba(20,50,76,0.6)] rounded border border-white/10">
          <button className="p-1 hover:bg-white/10 rounded transition-colors">
            <Volume2 className="w-4 h-4 text-white" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded transition-colors">
            <Wifi className="w-4 h-4 text-white" />
          </button>

          {/* Clock */}
          <div className="ml-2 pl-2 border-l border-white/20 flex flex-col items-end">
            <span className="text-xs text-white font-medium leading-tight">
              {formatTime(currentTime)}
            </span>
            <span className="text-[10px] text-white/80 leading-tight">
              {formatDate(currentTime)}
            </span>
          </div>
        </div>

        {/* Show Desktop Button */}
        <div className="w-3 h-9 ml-1 bg-[rgba(20,50,76,0.6)] rounded border-l border-white/20 hover:bg-white/10 cursor-pointer transition-colors" />
      </div>
    </>
  );
}
