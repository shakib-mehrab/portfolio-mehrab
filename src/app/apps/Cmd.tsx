import { useEffect, useRef, useState } from "react";
import { profileData } from "../../data/profile";
import { projectsData } from "../../data/projects";
import { experienceData } from "../../data/experience";
import { educationData } from "../../data/education";
import { skillCategoriesData } from "../../data/skills";
import { useOS, type AppProps } from "../os/context";
import { apps } from "../os/registry";

const PROMPT = "C:\\Users\\Guest>";
const BANNER = `Mehrab 7 [Version 7.0.2026]
Copyright (c) 2026 Mehrab Hossain. All rights reserved.

Type "help" to see what this machine can do.
`;

const colors: Record<string, string> = {
  "0": "#000000", "1": "#000080", "2": "#008000", "3": "#008080", "4": "#800000", "5": "#800080", "6": "#808000", "7": "#c0c0c0",
  "8": "#808080", "9": "#0000ff", a: "#00ff00", b: "#00ffff", c: "#ff0000", d: "#ff00ff", e: "#ffff00", f: "#ffffff",
};

export function Cmd({ close }: AppProps) {
  const { openApp, shutdown } = useOS();
  const [lines, setLines] = useState<string[]>([BANNER]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const [fg, setFg] = useState("#c0c0c0");
  const end = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const run = (raw: string): string | null => {
    const [cmd = "", ...rest] = raw.trim().split(/\s+/);
    const arg = rest.join(" ");
    switch (cmd.toLowerCase()) {
      case "":
        return "";
      case "help":
        return [
          "ABOUT        Who is Mehrab?",
          "WHOAMI       Who are you?",
          "SKILLS       List installed skills",
          "PROJECTS     List projects (OPEN <name> to view one)",
          "EXPERIENCE   Show work history",
          "EDUCATION    Show education",
          "CONTACT      Ways to reach Mehrab",
          "START <app>  Open a program, e.g. START projects",
          "RESUME       Open the résumé",
          "NEOFETCH     System summary",
          "COLOR <xy>   Change text colour, e.g. COLOR 0a",
          "DIR, DATE, VER, ECHO, CLS, EXIT",
        ].join("\n");
      case "about":
        return profileData.bioParagraphs.join("\n\n");
      case "whoami":
        return "mehrab-pc\\guest  (a welcome visitor, probably a recruiter or a fellow nerd)";
      case "skills":
        return skillCategoriesData.map((c) => `${c.category.padEnd(26)} ${c.skills.map((s) => s.name).join(", ")}`).join("\n");
      case "projects":
      case "dir":
        if (cmd.toLowerCase() === "dir" && arg) return "File Not Found";
        return [
          " Directory of C:\\Users\\Mehrab\\Projects",
          "",
          ...projectsData.map((p) => `${(p.liveUrl && p.liveUrl !== "#" ? "<LIVE>" : "<SRC> ").padEnd(8)} ${p.id.padEnd(16)} ${p.title.split(" - ")[0]}`),
          "",
          `        ${projectsData.length} Dir(s)   ∞ ideas free`,
        ].join("\n");
      case "open": {
        const p = projectsData.find((x) => x.id === arg.toLowerCase() || x.title.toLowerCase().startsWith(arg.toLowerCase()));
        if (!arg || !p) return `The system cannot find the project "${arg}". Try PROJECTS.`;
        openApp("projects", { project: p.id });
        return `Opening ${p.title.split(" - ")[0]}...`;
      }
      case "experience":
        return experienceData.map((e) => `[${e.period}] ${e.role} — ${e.company}`).join("\n");
      case "education":
        return educationData.map((e) => `[${e.period}] ${e.degree}, ${e.institution} (${e.cgpa})`).join("\n");
      case "contact": {
        const c = profileData.contact;
        return `Email     ${c.email}\nLinkedIn  ${c.linkedin}\nGitHub    ${c.github}\nLocation  ${c.location}\n\nOr type START contact to write a message.`;
      }
      case "resume":
        openApp("resume");
        return "Opening Resume.pdf...";
      case "start": {
        const id = Object.keys(apps).find((k) => k === arg.toLowerCase() || apps[k].label.toLowerCase() === arg.toLowerCase());
        if (!id) return `Mehrab 7 cannot find '${arg}'. Available: ${Object.keys(apps).join(", ")}`;
        openApp(id);
        return "";
      }
      case "neofetch":
        return [
          "      ▄▄▄▄▄▄▄       guest@MEHRAB-PC",
          "    ▄█▀ ▀█▀ ▀█▄     ---------------",
          "   ██  ▄ █ ▄  ██    OS: Mehrab 7 Ultimate",
          "   ██  █▀█▀█  ██    Host: Comilla University, B.Sc. CSE",
          "   ██  █ ▀ █  ██    Kernel: React + Node.js + Solidity",
          "    ▀█▄▄▄▄▄▄█▀      Uptime: ever since Windows 7, my first OS",
          "      ▀▀▀▀▀▀▀       Shell: curiosity",
          `                    Job: ${experienceData[0].role} @ ${experienceData[0].company}`,
          "                    Theme: Aero (nostalgic)",
          "                    Hobbies: photography, video editing",
        ].join("\n");
      case "date":
        return `The current date is: ${new Date().toLocaleDateString("en-US", { weekday: "short", month: "2-digit", day: "2-digit", year: "numeric" })}`;
      case "ver":
        return "Mehrab 7 [Version 7.0.2026]";
      case "echo":
        return arg || "ECHO is on.";
      case "color": {
        const code = arg.toLowerCase();
        const f = code.length === 2 ? code[1] : code[0];
        if (!f || !colors[f]) return "Sets the console foreground colour. Example: COLOR 0a";
        setFg(colors[f]);
        return "";
      }
      case "sudo":
        return "This incident will be reported. (Just kidding. There is no sudo on Windows.)";
      case "shutdown":
        shutdown(arg.includes("/r") ? "restart" : "shutdown");
        return "";
      case "cls":
      case "clear":
        setLines([]);
        return null;
      case "exit":
        close();
        return null;
      default:
        return `'${cmd}' is not recognized as an internal or external command,\noperable program or batch file.`;
    }
  };

  const submit = () => {
    const cmd = input;
    setInput("");
    setHIdx(-1);
    if (cmd.trim()) setHistory((h) => [cmd, ...h].slice(0, 50));
    const out = run(cmd);
    if (out === null) return;
    setLines((l) => [...l, `${PROMPT}${cmd}`, ...(out ? [out, ""] : [""])]);
  };

  return (
    <div className="w7-body !bg-black" onClick={() => field.current?.focus()}>
      <div className="w7-console" style={{ ["--console-fg" as string]: fg }}>
        {lines.join("\n")}
        <div className="flex" ref={end}>
          <span>{PROMPT}</span>
          <input
            ref={field}
            autoFocus
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Command"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
              else if (e.key === "ArrowUp") {
                e.preventDefault();
                const n = Math.min(hIdx + 1, history.length - 1);
                if (history[n] !== undefined) (setHIdx(n), setInput(history[n]));
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const n = hIdx - 1;
                setHIdx(Math.max(n, -1));
                setInput(n >= 0 ? history[n] : "");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
