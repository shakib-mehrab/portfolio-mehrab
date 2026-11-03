import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, ChevronLeft, Search } from "lucide-react";
import { profileData } from "../../data/profile";
import { projectsData } from "../../data/projects";
import { Icon, type IconName } from "./icons";
import { apps } from "./registry";

interface StartMenuProps {
  onOpen: (appId: string, props?: Record<string, unknown>) => void;
  onClose: () => void;
  onPower: (mode: "shutdown" | "restart" | "logoff") => void;
}

const frequent = ["welcome", "about", "projects", "experience", "skills", "achievements", "contact", "cmd", "personalize"];
const right: { app: string; label: string; icon: IconName }[] = [
  { app: "about", label: "Mehrab", icon: "user" },
  { app: "resume", label: "Documents", icon: "pdf" },
  { app: "pictures", label: "Pictures", icon: "pictures" },
  { app: "projects", label: "Projects", icon: "projects" },
  { app: "skills", label: "Computer", icon: "chip" },
  { app: "personalize", label: "Control Panel", icon: "personalize" },
  { app: "contact", label: "Contact", icon: "mail" },
  { app: "welcome", label: "Help and Support", icon: "info" },
];

export function StartMenu({ onOpen, onClose, onPower }: StartMenuProps) {
  const [query, setQuery] = useState("");
  const [all, setAll] = useState(false);
  const [pic, setPic] = useState<IconName | null>(null);
  const [powerMenu, setPowerMenu] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return {
      programs: Object.values(apps).filter((a) => a.id !== "photoviewer" && `${a.label} ${a.title}`.toLowerCase().includes(q)),
      projects: projectsData.filter((p) => `${p.title} ${p.techStack.join(" ")}`.toLowerCase().includes(q)).slice(0, 6),
    };
  }, [query]);

  const go = (id: string, props?: Record<string, unknown>) => {
    onOpen(id, props);
    onClose();
  };

  const first = results ? (results.programs[0] ? () => go(results.programs[0].id) : results.projects[0] ? () => go("projects", { project: results.projects[0].id }) : null) : null;

  return (
    <>
      <div className="fixed inset-0 z-[1000]" onPointerDown={onClose} />
      <motion.div
        className="w7-start w7-glass"
        role="menu"
        aria-label="Start menu"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8, transition: { duration: 0.1 } }}
        transition={{ duration: 0.16 }}
      >
        <div className="w7-start-left">
          <div className="min-h-0 flex-1 overflow-y-auto py-1.5">
            {results ? (
              <>
                <Header>Programs ({results.programs.length})</Header>
                {results.programs.map((a) => (
                  <Item key={a.id} icon={a.icon} label={a.label} onClick={() => go(a.id)} small />
                ))}
                <Header>Projects ({results.projects.length})</Header>
                {results.projects.map((p) => (
                  <Item key={p.id} icon="projects" label={p.title.split(" - ")[0]} onClick={() => go("projects", { project: p.id })} small />
                ))}
                {!results.programs.length && !results.projects.length && <p className="px-4 py-2 text-[#6d6d6d]">No items match your search.</p>}
              </>
            ) : all ? (
              Object.values(apps)
                .filter((a) => a.id !== "photoviewer")
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((a) => <Item key={a.id} icon={a.icon} label={a.label} onClick={() => go(a.id)} small />)
            ) : (
              frequent.map((id) => <Item key={id} icon={apps[id].icon} label={apps[id].label} sub={apps[id].title !== apps[id].label ? apps[id].title : undefined} onClick={() => go(id)} />)
            )}
          </div>
          {!results && (
            <>
              <div className="mx-2 h-px bg-[#d6dfe9]" />
              <button className="w7-start-item my-1" onClick={() => setAll((v) => !v)}>
                {all ? <ChevronLeft size={14} className="text-[#1e395b]" /> : null}
                <span className="flex-1">{all ? "Back" : "All Programs"}</span>
                {!all && <ChevronRight size={14} className="text-[#1e395b]" />}
              </button>
            </>
          )}
        </div>

        <div className="w7-start-right">
          <div className="w7-userframe">{pic ? <Icon name={pic} size={48} /> : <img src={profileData.avatarUrl} alt="" />}</div>
          {right.map((r, i) => (
            <div key={r.label}>
              {(i === 4 || i === 7) && <div className="w7-start-sep" />}
              <button className="w7-start-link" onMouseEnter={() => setPic(r.icon)} onMouseLeave={() => setPic(null)} onClick={() => go(r.app)}>
                {r.label}
              </button>
            </div>
          ))}
        </div>

        <label className="w7-search mt-[7px] !w-auto">
          <input
            ref={input}
            value={query}
            placeholder="Search programs and files"
            aria-label="Search programs and files"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && first?.()}
          />
          <Search size={13} color="#555" />
        </label>

        <div className="relative mt-[7px] flex">
          <div className="w7-shutdown !m-0">
            <button onClick={() => onPower("shutdown")}>Shut down</button>
            <button aria-label="Shut down options" aria-expanded={powerMenu} onClick={() => setPowerMenu((v) => !v)}>
              <ChevronRight size={12} />
            </button>
          </div>
          {powerMenu && (
            <div className="w7-menu !absolute bottom-0 left-full ml-1 !min-w-[140px]">
              <button onClick={() => onPower("logoff")}><span />Log off</button>
              <button onClick={() => onPower("restart")}><span />Restart</button>
              <hr />
              <button onClick={() => onPower("shutdown")}><span />Shut down</button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return <div className="px-3 pt-1.5 pb-0.5 text-[12px] text-[#1e3287]">{children}</div>;
}

function Item({ icon, label, sub, onClick, small }: { icon: IconName; label: string; sub?: string; onClick: () => void; small?: boolean }) {
  return (
    <button className="w7-start-item" role="menuitem" onClick={onClick}>
      <Icon name={icon} size={small ? 20 : 32} />
      <span className="min-w-0">
        <span className="block truncate">{label}</span>
        {sub && <small className="truncate">{sub}</small>}
      </span>
    </button>
  );
}
