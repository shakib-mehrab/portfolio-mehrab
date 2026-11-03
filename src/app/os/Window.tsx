import { Component, Suspense, useRef, useState } from "react";
import { motion } from "motion/react";
import { CapGlyph, Icon, type IconName } from "./icons";

export interface WinState {
  id: string;
  appId: string;
  title: string;
  icon: IconName;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  maximized: boolean;
  minimized: boolean;
  snap: "left" | "right" | null;
  props?: Record<string, unknown>;
}

type Zone = "max" | "left" | "right" | null;

interface WindowProps {
  win: WinState;
  active: boolean;
  mobile: boolean;
  resizable?: boolean;
  onFocus: () => void;
  onChange: (patch: Partial<WinState>) => void;
  onClose: () => void;
  onMinimize: () => void;
  children: React.ReactNode;
}

const TASKBAR = 40;
const MIN_W = 340;
const MIN_H = 240;

export function Window({ win, active, mobile, resizable = true, onFocus, onChange, onClose, onMinimize, children }: WindowProps) {
  const [zone, setZone] = useState<Zone>(null);
  const drag = useRef<{ px: number; py: number; x: number; y: number; w: number; h: number; mode: string } | null>(null);

  const filled = win.maximized || mobile;
  const toggleMax = () => onChange({ maximized: !win.maximized, snap: null });

  const startDrag = (e: React.PointerEvent, mode: string) => {
    if (e.button !== 0 || mobile) return;
    if ((e.target as HTMLElement).closest("button") && mode === "move") return;
    onFocus();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { px: e.clientX, py: e.clientY, x: win.x, y: win.y, w: win.w, h: win.h, mode };
  };

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.px;
    const dy = e.clientY - d.py;

    if (d.mode === "move") {
      if (Math.abs(dx) + Math.abs(dy) < 3 && !win.maximized && !win.snap) return;
      // Dragging a maximized or snapped window restores it under the pointer
      if (win.maximized || win.snap) {
        const ratio = (d.px - (win.snap === "right" ? window.innerWidth / 2 : 0)) / (win.maximized ? window.innerWidth : window.innerWidth / 2);
        const nx = Math.round(e.clientX - win.w * Math.min(Math.max(ratio, 0.1), 0.9));
        d.x = nx;
        d.y = 0;
        d.px = e.clientX;
        d.py = e.clientY;
        onChange({ maximized: false, snap: null, x: nx, y: 0 });
        return;
      }
      const x = d.x + dx;
      const y = Math.min(Math.max(0, d.y + dy), window.innerHeight - TASKBAR - 30);
      onChange({ x, y });
      const z: Zone = e.clientY <= 2 ? "max" : e.clientX <= 2 ? "left" : e.clientX >= window.innerWidth - 3 ? "right" : null;
      if (z !== zone) setZone(z);
      return;
    }

    const patch: Partial<WinState> = {};
    if (d.mode.includes("e")) patch.w = Math.max(MIN_W, d.w + dx);
    if (d.mode.includes("s")) patch.h = Math.max(MIN_H, d.h + dy);
    onChange(patch);
  };

  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    if (zone === "max") onChange({ maximized: true, snap: null });
    else if (zone) onChange({ snap: zone });
    setZone(null);
  };

  const rect: React.CSSProperties = mobile
    ? { left: 0, top: 0, right: 0, bottom: TASKBAR }
    : win.maximized
      ? { left: 0, top: 0, right: 0, bottom: TASKBAR }
      : win.snap
        ? { top: 0, bottom: TASKBAR, width: "50%", left: win.snap === "left" ? 0 : "50%" }
        : { left: win.x, top: win.y, width: win.w, height: win.h };

  return (
    <>
      <motion.div
        role="dialog"
        aria-label={win.title}
        className={`w7-window w7-glass ${active ? "" : "is-inactive"} ${filled ? "is-maximized" : ""}`}
        style={{ ...rect, zIndex: win.z }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          win.minimized
            ? { opacity: 0, scale: 0.5, y: 260, transitionEnd: { visibility: "hidden" } }
            : { opacity: 1, scale: 1, y: 0, visibility: "visible" }
        }
        exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.14 } }}
        transition={{ duration: 0.2, ease: [0.2, 0.8, 0.3, 1] }}
        onPointerDownCapture={onFocus}
      >
        <div
          className="w7-titlebar"
          onPointerDown={(e) => startDrag(e, "move")}
          onPointerMove={onMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onDoubleClick={(e) => {
            if (!mobile && resizable && !(e.target as HTMLElement).closest("button")) toggleMax();
          }}
        >
          <Icon name={win.icon} size={16} />
          <span className="w7-title">{win.title}</span>
          <div className="w7-caps">
            <button className="w7-cap" aria-label="Minimize" onClick={onMinimize}>
              <CapGlyph kind="min" />
            </button>
            {!mobile && (
              <button className="w7-cap" aria-label={win.maximized ? "Restore Down" : "Maximize"} onClick={toggleMax} disabled={!resizable}>
                <CapGlyph kind={win.maximized ? "restore" : "max"} />
              </button>
            )}
            <button className="w7-cap is-close" aria-label="Close" onClick={onClose}>
              <CapGlyph kind="close" />
            </button>
          </div>
        </div>

        <div className="w7-client">
          <Crashable name={win.title} onClose={onClose}>
            <Suspense fallback={<Busy />}>{children}</Suspense>
          </Crashable>
        </div>

        {!filled && !win.snap && resizable &&
          (["e", "s", "se"] as const).map((m) => (
            <div
              key={m}
              className={`w7-resize ${m}`}
              onPointerDown={(e) => startDrag(e, m)}
              onPointerMove={onMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            />
          ))}
      </motion.div>

      {zone && (
        <motion.div
          className="w7-snap-preview w7-glass"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
          style={{
            top: 4,
            bottom: TASKBAR + 4,
            left: zone === "right" ? "calc(50% + 2px)" : 4,
            right: zone === "left" ? "calc(50% + 2px)" : 4,
          }}
        />
      )}
    </>
  );
}

/* One misbehaving program shouldn't take the desktop down with it */
class Crashable extends Component<{ name: string; onClose: () => void; children: React.ReactNode }, { crashed: boolean }> {
  state = { crashed: false };
  static getDerivedStateFromError() {
    return { crashed: true };
  }
  render() {
    if (!this.state.crashed) return this.props.children;
    return (
      <div className="w7-body w7-dialog-face justify-center p-6">
        <div className="flex gap-3">
          <Icon name="info" size={32} />
          <div>
            <p className="text-[14px] text-[#1e3287]">{this.props.name} has stopped working</p>
            <p className="mt-1 text-[#333]">A problem caused the program to stop working correctly. Close it and open it again.</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="w7-button is-default" onClick={this.props.onClose}>Close program</button>
        </div>
      </div>
    );
  }
}

export function Busy({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="w7-body items-center justify-center">
      <div className="flex items-center gap-2 text-[#333]">
        <span className="w7-spinner is-dark" />
        {label}
      </div>
    </div>
  );
}
