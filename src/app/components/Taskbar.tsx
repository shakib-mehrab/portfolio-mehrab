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

      <div className="fixed bottom-0 left-0 right-0 h-12 flex items-center px-1 md:px-2 z-40 bg-taskbar">
        {/* Start Button */}
        <button
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          className={`h-8 md:h-9 px-2 md:px-4 mr-1 md:mr-2 rounded flex items-center gap-1 md:gap-2 font-semibold text-xs md:text-sm transition-all ${
            isStartMenuOpen
              ? "bg-[rgba(20,50,76,0.9)] shadow-inner border-start-btn-active"
              : "bg-gradient-to-b from-[rgba(69,156,215,0.9)] to-[rgba(41,127,184,0.9)] hover:from-[rgba(89,176,235,0.9)] hover:to-[rgba(61,147,204,0.9)] shadow-lg border-start-btn"
          }`}
        >
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-white/90 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full" />
            </div>
          </div>
          <span className="hidden sm:inline text-white drop-shadow-md">Start</span>
        </button>

        {/* Window Buttons */}
        <div className="flex-1 flex items-center gap-0.5 md:gap-1 overflow-x-auto scrollbar-none">
          {openWindows.map((window) => (
            <button
              key={window.id}
              onClick={() => onWindowClick(window.id)}
              className={`h-8 md:h-9 min-w-[60px] md:min-w-[160px] max-w-[80px] md:max-w-[200px] px-1.5 md:px-3 flex items-center gap-1 md:gap-2 rounded transition-all ${
                activeWindow === window.id
                  ? "bg-[rgba(20,50,76,0.9)] shadow-inner border border-black/30"
                  : "bg-gradient-to-b from-[rgba(69,156,215,0.7)] to-[rgba(41,127,184,0.7)] hover:from-[rgba(89,176,235,0.8)] hover:to-[rgba(61,147,204,0.8)] shadow-md border border-white/20"
              }`}
            >
              <div className="flex-shrink-0 w-3 h-3 md:w-4 md:h-4">{window.icon}</div>
              <span className="text-[10px] md:text-sm text-white truncate drop-shadow-sm">
                {window.title}
              </span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="hidden sm:flex items-center gap-1 md:gap-2 ml-1 md:ml-2 px-2 md:px-3 h-8 md:h-9 bg-[rgba(20,50,76,0.6)] rounded border border-white/10">
          <button aria-label="Volume control" className="p-1 hover:bg-white/10 rounded transition-colors">
            <Volume2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
          </button>
          <button aria-label="Network status" className="p-1 hover:bg-white/10 rounded transition-colors">
            <Wifi className="w-3 h-3 md:w-4 md:h-4 text-white" />
          </button>

          {/* Clock */}
          <div className="ml-1 md:ml-2 pl-1 md:pl-2 border-l border-white/20 flex flex-col items-end">
            <span className="text-[10px] md:text-xs text-white font-medium leading-tight">
              {formatTime(currentTime)}
            </span>
            <span className="hidden md:block text-[10px] text-white/80 leading-tight">
              {formatDate(currentTime)}
            </span>
          </div>
        </div>

        {/* Show Desktop Button */}
        <div className="hidden md:block w-3 h-9 ml-1 bg-[rgba(20,50,76,0.6)] rounded border-l border-white/20 hover:bg-white/10 cursor-pointer transition-colors" />
      </div>
    </>
  );
}
