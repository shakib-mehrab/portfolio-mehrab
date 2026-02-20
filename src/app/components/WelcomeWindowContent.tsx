import { useState, useEffect } from "react";
import { FolderOpen, Award, Code } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";
import { profile } from "../../data/profile";

const LINES: { text: string; gradient?: boolean; className: string }[] = [
  { text: "Hi There! 👋", className: "text-2xl text-white/75 font-light" },
  {
    text: `I am ${profile.name}`,
    gradient: true,
    className: "text-4xl font-bold leading-tight",
  },
  { text: "A Passionate Developer", className: "text-xl text-blue-200/85" },
  {
    text: "A Blockchain Enthusiast and Learner",
    className: "text-xl text-purple-200/85",
  },
  {
    text: "Welcome To My Portfolio ✨",
    className: "text-2xl font-semibold text-cyan-200/85",
  },
];

const TYPING_SPEED = 42; // ms per character
const PAUSE_BETWEEN = 380; // ms pause after each line finishes

const STATS = [
  {
    icon: <FolderOpen className="w-4 h-4 text-blue-300" />,
    label: "6 Projects",
    delay: "0s",
  },
  {
    icon: <Award className="w-4 h-4 text-cyan-300" />,
    label: "8 Certifications",
    delay: "0.2s",
  },
  {
    icon: <Code className="w-4 h-4 text-purple-300" />,
    label: "30+ Skills",
    delay: "0.4s",
  },
];

export function WelcomeWindowContent() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [showStats, setShowStats] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);

  const allDone = lineIndex >= LINES.length;

  // Blinking cursor
  useEffect(() => {
    const t = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  // Typewriter engine
  useEffect(() => {
    if (allDone) {
      const t1 = setTimeout(() => setShowStats(true), 250);
      const t2 = setTimeout(() => setShowHint(true), 600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
    const full = LINES[lineIndex].text;
    if (charIndex < full.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), TYPING_SPEED);
      return () => clearTimeout(t);
    } else {
      // Finished a line — pause then advance
      const t = setTimeout(() => {
        setCompletedLines((prev) => [...prev, full]);
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, PAUSE_BETWEEN);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex, allDone]);

  const renderText = (
    text: string,
    line: (typeof LINES)[0],
    showCursor: boolean,
    key: number
  ) => (
    <p key={key} className={`leading-snug ${line.className}`}>
      {line.gradient ? (
        <span className="inline-block bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 bg-clip-text text-transparent">
          {text}
        </span>
      ) : (
        text
      )}
      {showCursor && (
        <span
          className={`inline-block w-0.5 h-[0.9em] bg-current ml-0.5 align-middle cursor-blink ${cursorOn ? "cursor-visible" : "cursor-hidden"}`}
        />
      )}
    </p>
  );

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 gap-7 overflow-auto">
      {/* Typewriter text block */}
      <div className="text-center space-y-2.5">
        {/* Completed lines */}
        {completedLines.map((text, i) => renderText(text, LINES[i], false, i))}

        {/* Currently typing line */}
        {!allDone &&
          renderText(
            LINES[lineIndex].text.slice(0, charIndex),
            LINES[lineIndex],
            true,
            lineIndex
          )}
      </div>

      {/* Stats — appear after all lines done */}
      {showStats && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: i * 0.12 }}
            >
              <GlassCard
                padding="sm"
                hover
                className="!rounded-2xl"
                sweepDelay={stat.delay}
              >
                <div className="flex items-center gap-2">
                  {stat.icon}
                  <span className="text-white/85 text-sm font-medium">
                    {stat.label}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Explore hint — appears last */}
      {showHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full"
        >
          <GlassCard padding="sm" className="!rounded-2xl" sweepDelay="1.5s">
            <p className="text-white/45 text-sm text-center">
              Double-click any desktop icon or use the Start menu to explore my
              portfolio sections.
            </p>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
