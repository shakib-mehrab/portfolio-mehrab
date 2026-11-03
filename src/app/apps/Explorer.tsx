import { ChevronRight, Search, ArrowLeft, ArrowRight } from "lucide-react";
import { useOS } from "../os/context";
import { Icon, type IconName } from "../os/icons";

interface ExplorerProps {
  crumbs: string[];
  onCrumb?: (index: number) => void;
  back?: () => void;
  forward?: () => void;
  search?: { value: string; onChange: (v: string) => void; placeholder: string };
  commands?: React.ReactNode;
  current?: string; // app id highlighted in the navigation pane
  navPane?: boolean; // Control Panel pages have their own task pane instead
  details?: React.ReactNode;
  status?: React.ReactNode;
  children: React.ReactNode;
}

const navGroups: { head: { label: string; icon: IconName }; items: { app: string; label: string; icon: IconName }[] }[] = [
  {
    head: { label: "Favorites", icon: "info" },
    items: [
      { app: "welcome", label: "Getting Started", icon: "info" },
      { app: "contact", label: "Contact", icon: "mail" },
      { app: "resume", label: "Résumé", icon: "pdf" },
    ],
  },
  {
    head: { label: "Libraries", icon: "folder" },
    items: [
      { app: "projects", label: "Projects", icon: "projects" },
      { app: "achievements", label: "Achievements", icon: "trophy" },
      { app: "certificates", label: "Certificates", icon: "certificates" },
      { app: "communities", label: "Communities", icon: "people" },
      { app: "pictures", label: "Pictures", icon: "pictures" },
    ],
  },
  {
    head: { label: "Computer", icon: "chip" },
    items: [
      { app: "about", label: "Mehrab (C:)", icon: "user" },
      { app: "experience", label: "Experience", icon: "update" },
      { app: "skills", label: "Skills", icon: "chip" },
      { app: "bin", label: "Recycle Bin", icon: "bin" },
    ],
  },
];

export function Explorer({ crumbs, onCrumb, back, forward, search, commands, current, navPane = true, details, status, children }: ExplorerProps) {
  const { openApp } = useOS();

  return (
    <>
      <div className="w7-navrow">
        <div className="w7-navbtns">
          <button className="w7-orbbtn" aria-label="Back" disabled={!back} onClick={back}>
            <ArrowLeft size={14} strokeWidth={3} color="#fff" />
          </button>
          <button className="w7-orbbtn" aria-label="Forward" disabled={!forward} onClick={forward}>
            <ArrowRight size={14} strokeWidth={3} color="#fff" />
          </button>
        </div>
        <nav className="w7-address" aria-label="Address">
          <Icon name={navIconFor(current)} size={16} />
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center">
              <ChevronRight size={11} className="w7-crumb-sep" />
              <button className="w7-crumb" onClick={() => onCrumb?.(i)}>
                {c}
              </button>
            </span>
          ))}
        </nav>
        {search && (
          <label className="w7-search">
            <input
              value={search.value}
              placeholder={search.placeholder}
              onChange={(e) => search.onChange(e.target.value)}
              aria-label={search.placeholder}
            />
            <Search size={13} color="#555" />
          </label>
        )}
      </div>

      <div className="w7-body">
        {commands && <div className="w7-commandbar">{commands}</div>}
        <div className="w7-explorer">
          {navPane && <nav className="w7-navpane" aria-label="Navigation pane">
            {navGroups.map((g) => (
              <div key={g.head.label} className="w7-navgroup">
                <div className="w7-navitem is-head" style={{ ["--indent" as string]: "6px" }}>
                  <Icon name={g.head.icon} size={16} />
                  {g.head.label}
                </div>
                {g.items.map((it) => (
                  <button
                    key={it.app}
                    className={`w7-navitem ${current === it.app ? "is-active" : ""}`}
                    style={{ ["--indent" as string]: "24px" }}
                    onClick={() => openApp(it.app)}
                  >
                    <Icon name={it.icon} size={16} />
                    {it.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>}
          <div className="w7-content">{children}</div>
        </div>
        {details && <div className="w7-detailspane">{details}</div>}
        {status && <div className="w7-statusbar">{status}</div>}
      </div>
    </>
  );
}

function navIconFor(app?: string): IconName {
  for (const g of navGroups) for (const it of g.items) if (it.app === app) return it.icon;
  return "folder";
}

/* A large-icon tile used by every folder view */
export function Tile({
  selected,
  onSelect,
  onOpen,
  thumb,
  label,
  sub,
  width = 132,
}: {
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
  thumb: React.ReactNode;
  label: string;
  sub?: string;
  width?: number;
}) {
  return (
    <button
      className={`w7-hover flex flex-col items-center gap-1.5 rounded-[3px] border border-transparent p-2 text-center ${selected ? "w7-selected" : ""}`}
      style={{ width }}
      onClick={onSelect}
      onDoubleClick={onOpen}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
    >
      {thumb}
      <span className="line-clamp-2 text-[12px] leading-tight text-black">{label}</span>
      {sub && <span className="text-[11px] leading-tight text-[#6d6d6d]">{sub}</span>}
    </button>
  );
}

/* Photos in Windows 7 folders sat in a white mount with a soft shadow */
export function Thumb({ src, alt, w = 112, h = 80 }: { src?: string; alt: string; w?: number; h?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden bg-white p-[3px]"
      style={{ width: w, height: h, boxShadow: "0 0 0 1px #c9c9c9, 1px 2px 3px rgba(0,0,0,.25)" }}
    >
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="block h-full min-h-0 w-full min-w-0 object-cover" />
      ) : (
        <Icon name="folder" size={Math.min(w, h) - 16} />
      )}
    </span>
  );
}
