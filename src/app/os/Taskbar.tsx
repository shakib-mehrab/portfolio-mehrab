import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronUp, Flag, Volume2, Wifi } from "lucide-react";
import { Icon, OrbGlyph } from "./icons";
import { apps } from "./registry";
import type { WinState } from "./Window";

interface TaskbarProps {
  windows: WinState[];
  activeId: string | null;
  startOpen: boolean;
  onStart: () => void;
  onTask: (appId: string) => void;
  onShowDesktop: () => void;
  onPeek: (on: boolean) => void;
}

const pinned = ["projects", "contact", "cmd", "resume"];

export function Taskbar({ windows, activeId, startOpen, onStart, onTask, onShowDesktop, onPeek }: TaskbarProps) {
  const order = [...pinned, ...windows.map((w) => w.appId).filter((id) => !pinned.includes(id))];
  const [hover, setHover] = useState<{ id: string; left: number } | null>(null);
  const hoverTimer = useRef<number>(undefined);
  const peekTimer = useRef<number>(undefined);

  return (
    <div className="w7-taskbar" role="toolbar" aria-label="Taskbar">
      <button className="w7-orb" aria-label="Start" aria-expanded={startOpen} onClick={onStart}>
        <span className="w7-orb-ball">
          <OrbGlyph />
        </span>
      </button>

      <div className="w7-tasks">
        {order.map((id) => {
          const app = apps[id];
          const win = windows.find((w) => w.appId === id);
          return (
            <button
              key={id}
              aria-label={app.label}
              className={`w7-taskbtn ${win ? "is-running" : ""} ${win && activeId === win.id && !win.minimized ? "is-active" : ""}`}
              style={{ ["--accent" as string]: app.accent }}
              onClick={() => onTask(id)}
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--hx", `${e.clientX - r.left}px`);
              }}
              onPointerEnter={(e) => {
                const left = e.currentTarget.getBoundingClientRect().left;
                clearTimeout(hoverTimer.current);
                hoverTimer.current = window.setTimeout(() => setHover({ id, left }), 450);
              }}
              onPointerLeave={() => {
                clearTimeout(hoverTimer.current);
                setHover(null);
              }}
            >
              <Icon name={app.icon} size={30} />
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {hover && (
          <motion.div
            key={hover.id}
            className="w7-thumb w7-glass pointer-events-none fixed z-[1002] w-[190px]"
            style={{ left: Math.max(4, Math.min(hover.left - 66, window.innerWidth - 194)), bottom: 44 }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="mb-1.5 truncate text-[12px]">{windows.find((w) => w.appId === hover.id)?.title ?? apps[hover.id].label}</div>
            <div className="grid h-[96px] place-items-center rounded-[2px] bg-white/85" style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.4)" }}>
              <Icon name={apps[hover.id].icon} size={56} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w7-tray">
        <button className="w7-trayicon hidden sm:grid" aria-label="Show hidden icons">
          <ChevronUp size={14} />
        </button>
        <button className="w7-trayicon hidden sm:grid" aria-label="Action Center: no issues">
          <Flag size={14} fill="#fff" />
        </button>
        <button className="w7-trayicon hidden sm:grid" aria-label="Network: connected">
          <Wifi size={15} />
        </button>
        <button className="w7-trayicon hidden sm:grid" aria-label="Volume">
          <Volume2 size={15} />
        </button>
        <Clock />
      </div>

      <button
        className="w7-showdesktop hidden sm:block"
        aria-label="Show desktop"
        onClick={() => {
          clearTimeout(peekTimer.current);
          onPeek(false);
          onShowDesktop();
        }}
        onPointerEnter={() => {
          peekTimer.current = window.setTimeout(() => onPeek(true), 500);
        }}
        onPointerLeave={() => {
          clearTimeout(peekTimer.current);
          onPeek(false);
        }}
      />
    </div>
  );
}

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(t);
  }, []);
  return (
    <button className="w7-clock" aria-label={now.toLocaleString()}>
      <div>{now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</div>
      <div className="hidden sm:block">{now.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })}</div>
    </button>
  );
}
