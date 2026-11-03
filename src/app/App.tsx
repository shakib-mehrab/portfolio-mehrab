import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { Check, Github, MonitorCog, RefreshCw, TerminalSquare, X } from "lucide-react";
import { OSContext, useOS, type OSApi } from "./os/context";
import { apps, desktopOrder } from "./os/registry";
import { Window, type WinState } from "./os/Window";
import { Taskbar } from "./os/Taskbar";
import { StartMenu } from "./os/StartMenu";
import { Gadgets } from "./os/Gadgets";
import { Boot, type Phase } from "./os/Boot";
import { Icon } from "./os/icons";
import { glassRgb, loadTheme, saveTheme, wallpapers, type ThemeState } from "./os/theme";
import { photos } from "../data/photos";

const TASKBAR = 40;
const BOOTED = "mehrab7.booted";

function firstPhase(reduced: boolean): Phase {
  if (new URLSearchParams(location.search).get("boot") === "0") return "desktop";
  try {
    if (sessionStorage.getItem(BOOTED)) return "welcome";
  } catch {
    // ignore
  }
  return reduced ? "logon" : "post";
}

function useIsMobile() {
  const [m, setM] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setM(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

export default function App() {
  const reduced = !!useReducedMotion();
  const isMobile = useIsMobile();
  const [phase, setPhaseRaw] = useState<Phase>(() => firstPhase(reduced));
  const restarting = useRef(false);
  const [windows, setWindows] = useState<WinState[]>([]);
  const topZ = useRef(10);
  const [startOpen, setStartOpen] = useState(false);
  const [peek, setPeek] = useState(false);
  const hiddenByShowDesktop = useRef<string[]>([]);
  const [theme, setThemeState] = useState<ThemeState>(loadTheme);
  const [binEmpty, setBinEmpty] = useState(false);
  const [showGadgets, setShowGadgets] = useState(true);
  const [balloon, setBalloon] = useState(false);

  const setPhase = useCallback((p: Phase) => {
    if (p === "off" && restarting.current) {
      restarting.current = false;
      p = "post";
    }
    setPhaseRaw(p);
  }, []);

  // ---- theme ----
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--glass-rgb", glassRgb(theme.glass));
    root.style.setProperty("--glass-alpha", String(theme.transparency ? theme.intensity : 0.92));
    root.classList.toggle("no-transparency", !theme.transparency);
    saveTheme(theme);
  }, [theme]);
  const setTheme = useCallback((patch: Partial<ThemeState>) => setThemeState((t) => ({ ...t, ...patch })), []);
  const wallpaper = useMemo(
    () => wallpapers.find((w) => w.id === theme.wallpaper)?.src ?? photos.find((p) => p.src === theme.wallpaper)?.src ?? wallpapers[0].src,
    [theme.wallpaper],
  );

  // ---- window manager ----
  const activeId = useMemo(() => {
    const visible = windows.filter((w) => !w.minimized);
    return visible.length ? visible.reduce((a, b) => (a.z > b.z ? a : b)).id : null;
  }, [windows]);

  const focus = useCallback((id: string) => {
    setWindows((ws) => {
      const w = ws.find((x) => x.id === id);
      if (!w || (w.z === topZ.current && !w.minimized)) return ws;
      const z = ++topZ.current;
      return ws.map((x) => (x.id === id ? { ...x, z, minimized: false } : x));
    });
  }, []);

  const openApp = useCallback((appId: string, props?: Record<string, unknown>) => {
    const app = apps[appId];
    if (!app) return;
    setStartOpen(false);
    setWindows((ws) => {
      const z = ++topZ.current;
      const existing = ws.find((w) => w.appId === appId);
      if (existing) return ws.map((w) => (w.id === appId ? { ...w, z, minimized: false, props: props ?? w.props } : w));
      const vw = window.innerWidth;
      const vh = window.innerHeight - TASKBAR;
      const w = Math.min(app.w, vw - 40);
      const h = Math.min(app.h, vh - 30);
      const offset = (ws.length % 6) * 26;
      return [
        ...ws,
        {
          id: appId,
          appId,
          title: app.title,
          icon: app.icon,
          w,
          h,
          x: Math.max(8, Math.round((vw - w) / 2) - 60 + offset),
          y: Math.max(6, Math.round((vh - h) / 2) - 30 + offset),
          z,
          maximized: false,
          minimized: false,
          snap: null,
          props,
        },
      ];
    });
  }, []);

  const closeApp = useCallback((id: string) => setWindows((ws) => ws.filter((w) => w.id !== id)), []);
  const patchWin = useCallback((id: string, patch: Partial<WinState>) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, ...patch } : w))), []);
  // Returning the same array when nothing changed lets apps call this from effects safely
  const setTitle = useCallback(
    (id: string, title: string) => setWindows((ws) => (ws.find((w) => w.id === id)?.title === title ? ws : ws.map((w) => (w.id === id ? { ...w, title } : w)))),
    [],
  );

  const onTask = (appId: string) => {
    const w = windows.find((x) => x.appId === appId);
    if (!w) openApp(appId);
    else if (w.minimized) focus(w.id);
    else if (w.id === activeId) patchWin(w.id, { minimized: true });
    else focus(w.id);
  };

  const showDesktop = () => {
    const visible = windows.filter((w) => !w.minimized).map((w) => w.id);
    if (visible.length) {
      hiddenByShowDesktop.current = visible;
      setWindows((ws) => ws.map((w) => ({ ...w, minimized: true })));
    } else {
      const back = hiddenByShowDesktop.current;
      setWindows((ws) => ws.map((w) => (back.includes(w.id) ? { ...w, minimized: false } : w)));
    }
  };

  const shutdown = useCallback(
    (mode: "shutdown" | "restart" | "logoff") => {
      setStartOpen(false);
      setWindows([]);
      setBalloon(false);
      restarting.current = mode === "restart";
      setPhase(mode === "logoff" ? "logon" : "shutting");
    },
    [setPhase],
  );

  // ---- boot → desktop ----
  useEffect(() => {
    if (phase !== "desktop") return;
    try {
      sessionStorage.setItem(BOOTED, "1");
    } catch {
      // ignore
    }
    // ?open=projects deep-links straight into a program, e.g. from a LinkedIn post
    const deep = new URLSearchParams(location.search).get("open");
    if (deep && apps[deep]) openApp(deep);
    else if (!isMobile) openApp("welcome");
    // On phones the sticky note already says this, and the balloon would cover it
    const a = setTimeout(() => setBalloon(!isMobile), 1400);
    const b = setTimeout(() => setBalloon(false), 12000);
    return () => (clearTimeout(a), clearTimeout(b));
    // isMobile is read once on arrival; resizing later shouldn't reopen windows
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, openApp]);

  // Ctrl+Esc opened the Start menu on real Windows too
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Escape") setStartOpen((v) => !v);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  const os: OSApi = {
    openApp,
    closeApp,
    theme,
    setTheme,
    binEmpty,
    emptyBin: () => setBinEmpty(true),
    shutdown,
    isMobile,
  };

  const onDesktop = phase === "desktop" || phase === "welcome";

  return (
    <MotionConfig reducedMotion="user">
      <OSContext.Provider value={os}>
        <div className={`w7 ${peek ? "is-peeking" : ""}`}>
          {onDesktop && (
            <div className="w7-desktop" style={{ backgroundImage: `url("${wallpaper}")` }}>
              <Desktop
                binEmpty={binEmpty}
                showGadgets={showGadgets && !isMobile}
                onToggleGadgets={() => setShowGadgets((v) => !v)}
                isMobile={isMobile}
              />

              <AnimatePresence>
                {windows.map((w) => {
                  const app = apps[w.appId];
                  const App = app.component;
                  return (
                    <Window
                      key={w.id}
                      win={w}
                      active={w.id === activeId}
                      mobile={isMobile}
                      resizable={app.resizable !== false}
                      onFocus={() => focus(w.id)}
                      onChange={(p) => patchWin(w.id, p)}
                      onClose={() => closeApp(w.id)}
                      onMinimize={() => patchWin(w.id, { minimized: true })}
                    >
                      <App windowId={w.id} props={w.props} close={() => closeApp(w.id)} setTitle={(t) => setTitle(w.id, t)} />
                    </Window>
                  );
                })}
              </AnimatePresence>

              <AnimatePresence>
                {startOpen && <StartMenu onOpen={openApp} onClose={() => setStartOpen(false)} onPower={shutdown} />}
              </AnimatePresence>

              <Taskbar
                windows={windows}
                activeId={activeId}
                startOpen={startOpen}
                onStart={() => setStartOpen((v) => !v)}
                onTask={onTask}
                onShowDesktop={showDesktop}
                onPeek={setPeek}
              />

              <AnimatePresence>
                {balloon && (
                  <motion.div
                    className="w7-balloon"
                    role="status"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <button className="absolute top-1.5 right-1.5 rounded-[2px] p-0.5 text-[#555] hover:bg-[#e8e8e8]" aria-label="Close" onClick={() => setBalloon(false)}>
                      <X size={12} />
                    </button>
                    <div className="flex items-center gap-2 font-semibold">
                      <Icon name="info" size={18} />
                      Nostalgia drivers installed
                    </div>
                    <p className="mt-1.5 pr-3 leading-relaxed text-[#333]">
                      Mehrab 7 finished setting up this desktop. {isMobile ? "Tap" : "Double-click"} an icon to open it, or press the orb to look around.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <Boot phase={phase} setPhase={setPhase} reduced={reduced} />
        </div>
      </OSContext.Provider>
    </MotionConfig>
  );
}

/* ---------------- Desktop surface: icons, marquee, context menu, notes ---------------- */

function Desktop({ binEmpty, showGadgets, onToggleGadgets, isMobile }: { binEmpty: boolean; showGadgets: boolean; onToggleGadgets: () => void; isMobile: boolean }) {
  const { openApp } = useOS();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [marquee, setMarquee] = useState<{ x0: number; y0: number; x1: number; y1: number } | null>(null);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const surface = useRef<HTMLDivElement>(null);
  const coarse = useMemo(() => window.matchMedia("(pointer: coarse)").matches, []);

  useEffect(() => {
    if (!menu) return;
    const close = () => setMenu(null);
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", close);
    };
  }, [menu]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.target !== surface.current || e.button !== 0) return;
    setSelected(new Set());
    if (coarse) return;
    surface.current.setPointerCapture(e.pointerId);
    setMarquee({ x0: e.clientX, y0: e.clientY, x1: e.clientX, y1: e.clientY });
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!marquee) return;
    const m = { ...marquee, x1: e.clientX, y1: e.clientY };
    setMarquee(m);
    const [l, r] = [Math.min(m.x0, m.x1), Math.max(m.x0, m.x1)];
    const [t, b] = [Math.min(m.y0, m.y1), Math.max(m.y0, m.y1)];
    const hit = new Set<string>();
    surface.current?.querySelectorAll<HTMLElement>("[data-icon]").forEach((el) => {
      const rc = el.getBoundingClientRect();
      if (rc.right > l && rc.left < r && rc.bottom > t && rc.top < b) hit.add(el.dataset.icon!);
    });
    setSelected(hit);
  };

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 140);
  };

  return (
    <div
      ref={surface}
      className="absolute inset-0"
      style={{ bottom: TASKBAR }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={() => setMarquee(null)}
      onContextMenu={(e) => {
        if (e.target !== surface.current) return;
        e.preventDefault();
        setMenu({ x: Math.min(e.clientX, window.innerWidth - 210), y: Math.min(e.clientY, window.innerHeight - 200) });
      }}
    >
      <div className="w7-icons" style={{ visibility: refreshing ? "hidden" : "visible" }}>
        {desktopOrder.map((id) => {
          const app = apps[id];
          const icon = id === "bin" ? (binEmpty ? "bin" : "binFull") : app.icon;
          return (
            <button
              key={id}
              data-icon={id}
              className={`w7-deskicon ${selected.has(id) ? "is-selected" : ""}`}
              onClick={(e) => {
                if (coarse) return openApp(id);
                setSelected(e.ctrlKey ? new Set([...selected, id]) : new Set([id]));
              }}
              onDoubleClick={() => openApp(id)}
              onKeyDown={(e) => e.key === "Enter" && openApp(id)}
            >
              <Icon name={icon} size={48} />
              <span>{app.label}</span>
            </button>
          );
        })}
      </div>

      {showGadgets && <Gadgets />}

      <StickyNote mobile={isMobile} />

      {marquee && (
        <div
          className="pointer-events-none fixed z-[5] border border-[#3399ff] bg-[rgba(51,153,255,.22)]"
          style={{
            left: Math.min(marquee.x0, marquee.x1),
            top: Math.min(marquee.y0, marquee.y1),
            width: Math.abs(marquee.x1 - marquee.x0),
            height: Math.abs(marquee.y1 - marquee.y0),
          }}
        />
      )}

      {menu && (
        <div className="w7-menu" style={{ left: menu.x, top: menu.y }} role="menu" onPointerDown={(e) => e.stopPropagation()}>
          <button onClick={() => (refresh(), setMenu(null))}>
            <span><RefreshCw size={13} /></span>Refresh
          </button>
          <hr />
          <button onClick={() => (openApp("cmd"), setMenu(null))}>
            <span><TerminalSquare size={13} /></span>Open Command Prompt here
          </button>
          <button onClick={() => (onToggleGadgets(), setMenu(null))} disabled={isMobile}>
            <span>{showGadgets && <Check size={13} />}</span>Show desktop gadgets
          </button>
          <hr />
          <button onClick={() => (window.open("https://github.com/shakib-mehrab/portfolio-mehrab", "_blank"), setMenu(null))}>
            <span><Github size={13} /></span>View source on GitHub
          </button>
          <button onClick={() => (openApp("personalize"), setMenu(null))}>
            <span><MonitorCog size={13} /></span>Personalize
          </button>
        </div>
      )}
    </div>
  );
}

function StickyNote({ mobile }: { mobile: boolean }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div
      className="w7-sticky"
      style={mobile ? { left: 12, right: 12, bottom: 12, width: "auto" } : { right: 184, top: 22 }}
      role="note"
    >
      <button aria-label="Close note" className="absolute top-0 right-1 font-[Segoe_UI,sans-serif] text-[12px] text-[#7a6f2a] hover:text-black" onClick={() => setHidden(true)}>
        ×
      </button>
      Windows 7 was my first OS. Now I write software for a living, so I rebuilt it from memory.
      <br />
      <br />→ {mobile ? "Tap" : "Double-click"} any icon
      <br />→ or press the orb, bottom left
      <div className="mt-2 text-right">— Mehrab</div>
    </div>
  );
}
