import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Power } from "lucide-react";
import { profileData } from "../../data/profile";
import { OrbGlyph } from "./icons";

export type Phase = "post" | "starting" | "logon" | "welcome" | "desktop" | "shutting" | "off";

const postLines = [
  "MHB BIOS v7.01, Nostalgia Edition",
  "Copyright (C) 2026, Mehrab Hossain",
  "",
  "Main Processor  : Curiosity Core(TM) @ 3.51 GHz",
  "Memory Testing  : Childhood Memories ............ OK",
  "",
  "Detecting Primary Master  ... B.Sc. CSE, Comilla University",
  "Detecting Primary Slave   ... NASA Space Apps Global Finalist",
  "Detecting USB Devices     ... Camera, Keyboard, Coffee Mug",
  "",
  "Press ESC to skip, DEL to enter SETUP",
];

interface BootProps {
  phase: Phase;
  setPhase: (p: Phase) => void;
  reduced: boolean;
}

export function Boot({ phase, setPhase, reduced }: BootProps) {
  // Any key or click hurries the boot along, like mashing keys on an old PC
  useEffect(() => {
    if (phase !== "post" && phase !== "starting") return;
    const skip = () => setPhase("logon");
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [phase, setPhase]);

  useEffect(() => {
    const next: Partial<Record<Phase, [Phase, number]>> = {
      post: ["starting", reduced ? 300 : 1900],
      starting: ["logon", reduced ? 300 : 2600],
      welcome: ["desktop", reduced ? 400 : 1500],
      shutting: ["off", 1800],
    };
    const n = next[phase];
    if (!n) return;
    const t = setTimeout(() => setPhase(n[0]), n[1]);
    return () => clearTimeout(t);
  }, [phase, setPhase, reduced]);

  return (
    <AnimatePresence>
      {phase === "post" && (
        <Screen key="post" className="bg-black">
          <Post />
        </Screen>
      )}
      {phase === "starting" && (
        <Screen key="starting" className="grid place-items-center bg-black">
          <Starting />
        </Screen>
      )}
      {(phase === "logon" || phase === "welcome" || phase === "shutting") && (
        <Screen key="logon" className="w7-logon">
          <Logon phase={phase} onLogon={() => setPhase("welcome")} onShutdown={() => setPhase("shutting")} />
        </Screen>
      )}
      {phase === "off" && (
        <Screen key="off" className="grid place-items-center bg-black">
          <button
            onClick={() => setPhase("post")}
            className="flex flex-col items-center gap-3 text-[#8a8a8a] transition hover:text-white"
            autoFocus
          >
            <span className="grid h-16 w-16 place-items-center rounded-full border border-current">
              <Power size={28} />
            </span>
            <span className="text-[13px]">It's now safe to turn off your computer. Or press to power on.</span>
          </button>
        </Screen>
      )}
    </AnimatePresence>
  );
}

function Screen({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <motion.div
      className={`fixed inset-0 z-[5000] ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}

function Post() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((v) => Math.min(v + 1, postLines.length)), 150);
    return () => clearInterval(t);
  }, []);
  return (
    <pre className="m-0 p-6 font-[Consolas,'Lucida_Console',monospace] text-[15px] leading-[1.45] whitespace-pre-wrap text-[#bdbdbd]">
      {postLines.slice(0, n).join("\n")}
      <span className="animate-pulse">_</span>
    </pre>
  );
}

function Starting() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative grid h-36 w-36 place-items-center">
        {/* Light gathers into the orb, then breathes */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.span
            key={i}
            className="absolute h-3 w-3 rounded-full"
            style={{ background: "radial-gradient(circle, #e8fbff, #6fd3ff 45%, transparent 70%)", filter: "blur(.5px)" }}
            initial={{ x: Math.cos((i / 6) * Math.PI * 2) * 90, y: Math.sin((i / 6) * Math.PI * 2) * 90, opacity: 0, scale: 0.6 }}
            animate={{ x: 0, y: 0, opacity: [0, 1, 0], scale: [0.6, 1.4, 0.4] }}
            transition={{ duration: 1.3, delay: i * 0.07, ease: "easeIn" }}
          />
        ))}
        <motion.span
          className="grid h-20 w-20 place-items-center rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 100%, rgba(120,230,255,.9), rgba(120,230,255,0) 55%), radial-gradient(circle at 50% 38%, #3b8ad8, #12417f 62%, #08254f)",
            boxShadow: "0 0 0 1px #08254f, inset 0 0 0 1px rgba(255,255,255,.35), 0 0 40px rgba(110,210,255,.55)",
          }}
          initial={{ opacity: 0, scale: 0.6, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          <span style={{ animation: "w7-breathe 2.4s ease-in-out infinite" }}>
            <OrbGlyph size={40} />
          </span>
        </motion.span>
      </div>
      <motion.p
        className="mt-6 text-[19px] tracking-wide text-[#d0d0d0]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        Starting Mehrab 7
      </motion.p>
      <p className="fixed bottom-8 text-[12px] text-[#6a6a6a]">© 2026 Mehrab Hossain</p>
    </div>
  );
}

function Logon({ phase, onLogon, onShutdown }: { phase: Phase; onLogon: () => void; onShutdown: () => void }) {
  const [typed, setTyped] = useState(0);
  const PASS = 8;

  // The password types itself in, then logs on, unless the visitor gets there first
  useEffect(() => {
    if (phase !== "logon") return;
    const t = setInterval(() => setTyped((v) => v + 1), 140);
    return () => clearInterval(t);
  }, [phase]);
  useEffect(() => {
    if (phase === "logon" && typed === PASS + 6) onLogon();
  }, [typed, phase, onLogon]);

  const label = phase === "welcome" ? "Welcome" : phase === "shutting" ? "Shutting down..." : null;

  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
      {label ? (
        <div className="flex items-center gap-4">
          <span className="w7-spinner" style={{ width: 28, height: 28 }} />
          <span className="text-[30px] font-light" style={{ textShadow: "0 2px 6px rgba(0,0,0,.5)" }}>
            {label}
          </span>
        </div>
      ) : (
        <>
          <button onClick={onLogon} aria-label={`Log on as ${profileData.name}`}>
            <div className="w7-usertile">
              <img src={profileData.avatarUrl} alt="" />
            </div>
          </button>
          <p className="mt-4 text-[24px] font-light" style={{ textShadow: "0 2px 6px rgba(0,0,0,.5)" }}>
            {profileData.name}
          </p>
          <form
            className="mt-3 flex items-center gap-1.5"
            onSubmit={(e) => {
              e.preventDefault();
              onLogon();
            }}
          >
            <input
              readOnly
              aria-label="Password"
              value={"•".repeat(Math.min(typed, PASS))}
              placeholder="Password"
              className="h-[26px] w-[190px] rounded-[2px] border border-[#3c6aa0] bg-white px-2 text-[13px] text-black shadow-[inset_0_1px_2px_rgba(0,0,0,.25)] outline-0"
            />
            <button
              type="submit"
              aria-label="Log on"
              autoFocus
              className="w7-orbbtn !h-[26px] !w-[26px]"
            >
              <ArrowRight size={15} strokeWidth={3} color="#fff" />
            </button>
          </form>
          <p className="mt-3 text-[12px] text-white/70">Click the picture or press Enter to log on</p>
        </>
      )}

      <div className="absolute bottom-6 flex items-center gap-2 text-white/80">
        <OrbGlyph size={18} />
        <span className="text-[17px] font-light tracking-wide">
          Mehrab <span className="font-normal">7</span> <span className="text-[13px] text-white/60">Ultimate</span>
        </span>
      </div>
      {phase === "logon" && (
        <button
          onClick={onShutdown}
          aria-label="Shut down"
          className="absolute right-6 bottom-6 grid h-8 w-8 place-items-center rounded-[4px] border border-black/50 text-white"
          style={{ background: "linear-gradient(#f4b8a6, #e0603f 50%, #c4310f 51%, #e98b50)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.4)" }}
        >
          <Power size={16} />
        </button>
      )}
    </div>
  );
}
