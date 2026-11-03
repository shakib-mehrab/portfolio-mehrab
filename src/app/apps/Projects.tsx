import { useMemo, useState } from "react";
import { ExternalLink, Github, LayoutGrid, List } from "lucide-react";
import { projectsData } from "../../data/projects";
import { hotspotsData } from "../../data/hotspots";
import type { Project } from "../../types";
import type { AppProps } from "../os/context";
import { Explorer, Thumb, Tile } from "./Explorer";

const groupOrder = ["Full Stack", "AI / Full Stack", "Mobile", "Blockchain / Full Stack", "Learning Projects"];
const hasLink = (u?: string) => !!u && u !== "#";

export function Projects({ props }: AppProps) {
  const [view, setView] = useState<"icons" | "details">("icons");
  const [selected, setSelected] = useState<string>(projectsData[0].id);
  const [openId, setOpenId] = useState<string | null>((props?.project as string) ?? null);
  const [lastOpen, setLastOpen] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projectsData;
    return projectsData.filter((p) =>
      [p.title, p.tagline, p.category, ...p.techStack].join(" ").toLowerCase().includes(q),
    );
  }, [query]);

  const groups = groupOrder
    .map((g) => ({ name: g, items: filtered.filter((p) => p.category === g) }))
    .filter((g) => g.items.length);

  const open = (id: string) => {
    setOpenId(id);
    setSelected(id);
  };
  const current = projectsData.find((p) => p.id === (openId ?? selected));
  const opened = openId ? projectsData.find((p) => p.id === openId) : null;

  return (
    <Explorer
      current="projects"
      crumbs={opened ? ["Libraries", "Projects", shortTitle(opened)] : ["Libraries", "Projects"]}
      onCrumb={(i) => i < 2 && openId && (setLastOpen(openId), setOpenId(null))}
      back={openId ? () => (setLastOpen(openId), setOpenId(null)) : undefined}
      forward={!openId && lastOpen ? () => open(lastOpen) : undefined}
      search={{ value: query, onChange: setQuery, placeholder: "Search Projects" }}
      commands={
        <>
          <button className="w7-cmd" disabled={!current || !!openId} onClick={() => current && open(current.id)}>
            Open
          </button>
          <a className="w7-cmd" aria-disabled={!hasLink(current?.liveUrl)} href={hasLink(current?.liveUrl) ? current!.liveUrl : undefined} target="_blank" rel="noreferrer">
            <ExternalLink size={14} /> {current?.liveLabel ?? "Visit live site"}
          </a>
          <a className="w7-cmd" href={current?.githubUrl} target="_blank" rel="noreferrer">
            <Github size={14} /> View source
          </a>
          <span className="flex-1" />
          {!openId && (
            <>
              <button className="w7-cmd" aria-pressed={view === "icons"} onClick={() => setView("icons")} aria-label="Large icons">
                <LayoutGrid size={14} />
              </button>
              <button className="w7-cmd" aria-pressed={view === "details"} onClick={() => setView("details")} aria-label="Details">
                <List size={14} />
              </button>
            </>
          )}
        </>
      }
      details={!opened && current ? <ProjectDetails p={current} /> : undefined}
      status={opened ? undefined : <>{filtered.length} items</>}
    >
      {opened ? (
        <ProjectPage p={opened} />
      ) : filtered.length === 0 ? (
        <p className="p-6 text-center text-[#6d6d6d]">No items match your search.</p>
      ) : view === "icons" ? (
        <div className="pb-4">
          {groups.map((g) => (
            <section key={g.name}>
              <h3 className="w7-group-head">
                {g.name} ({g.items.length})
              </h3>
              <div className="flex flex-wrap gap-1 px-3">
                {g.items.map((p) => (
                  <Tile
                    key={p.id}
                    width={150}
                    selected={selected === p.id}
                    onSelect={() => setSelected(p.id)}
                    onOpen={() => open(p.id)}
                    thumb={<Thumb src={p.imageUrl} alt="" w={128} h={84} />}
                    label={shortTitle(p)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <table className="w-full border-collapse text-left text-[12px]">
          <thead className="sticky top-0 bg-white">
            <tr className="text-[#4c607a]">
              {["Name", "Type", "Built with", "Status"].map((h) => (
                <th key={h} className="border-r border-b border-[#e1e6ee] px-2 py-1 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                className={`w7-hover cursor-default border border-transparent ${selected === p.id ? "w7-selected" : ""}`}
                onClick={() => setSelected(p.id)}
                onDoubleClick={() => open(p.id)}
              >
                <td className="px-2 py-1">{shortTitle(p)}</td>
                <td className="px-2 py-1 text-[#6d6d6d]">{p.category}</td>
                <td className="max-w-[260px] truncate px-2 py-1 text-[#6d6d6d]">{p.techStack.join(", ")}</td>
                <td className="px-2 py-1 text-[#6d6d6d]">{hasLink(p.liveUrl) ? "Live" : "Source only"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Explorer>
  );
}

function shortTitle(p: Project) {
  return p.title.split(" - ")[0];
}

function ProjectDetails({ p }: { p: Project }) {
  return (
    <>
      <Thumb src={p.imageUrl} alt="" w={96} h={64} />
      <div className="min-w-0">
        <div className="text-[14px] text-black">{shortTitle(p)}</div>
        <div className="mb-1 text-[#5a6779]">{p.tagline}</div>
        <dl className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
          <div className="w7-prop"><dt>Built with:</dt><dd className="truncate">{p.techStack.slice(0, 5).join(", ")}</dd></div>
          {p.metrics && <div className="w7-prop"><dt>Award:</dt><dd>{p.metrics}</dd></div>}
          {p.role && <div className="w7-prop"><dt>Role:</dt><dd>{p.role}</dd></div>}
          <div className="w7-prop"><dt>Type:</dt><dd>{p.category}</dd></div>
        </dl>
      </div>
    </>
  );
}

function ProjectPage({ p }: { p: Project }) {
  const spots = hotspotsData[p.id] ?? [];
  const [spot, setSpot] = useState<number | null>(spots.length ? 0 : null);

  return (
    <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      <div>
        <div className="relative bg-white p-1" style={{ boxShadow: "0 0 0 1px #c9c9c9, 2px 3px 8px rgba(0,0,0,.2)" }}>
          {p.imageUrl ? (
            <img src={p.imageUrl} alt={`${shortTitle(p)} screenshot`} className="block w-full" />
          ) : (
            <div className="grid aspect-video place-items-center bg-[#eef3f9] text-[#5a6779]">{p.imagePlaceholderText}</div>
          )}
          {spots.map((s, i) => (
            <button
              key={i}
              aria-label={s.title}
              onClick={() => setSpot(i)}
              className="absolute grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[11px] font-bold text-white"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                background: spot === i ? "radial-gradient(circle at 50% 30%, #ffe28a, #f39c12 60%, #b9650a)" : "radial-gradient(circle at 50% 30%, #9fd4ff, #2b7fd6 60%, #0d3f86)",
                boxShadow: "0 0 0 2px #fff, 0 2px 6px rgba(0,0,0,.45)",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
        {spot !== null && spots[spot] && (
          <div className="mt-3 rounded-[3px] border border-[#84acdd] bg-gradient-to-b from-[#f2f8ff] to-[#dfeefc] px-3 py-2">
            <div className="text-[13px] text-[#1e3287]">
              {spot + 1}. {spots[spot].title}
            </div>
            <p className="mt-0.5 text-[12px] leading-relaxed text-[#333]">{spots[spot].body}</p>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-[20px] font-normal leading-tight text-[#1e3287]">{shortTitle(p)}</h2>
        <p className="mt-1 text-[13px] text-[#5a6779]">{p.tagline}</p>
        {p.metrics && (
          <p className="mt-3 inline-flex items-center gap-2 rounded-[3px] border border-[#e3c35c] bg-gradient-to-b from-[#fffbe6] to-[#fdf0b8] px-2 py-1 text-[12px] text-[#5c4300]">
            ★ {p.metrics}
          </p>
        )}
        <p className="mt-3 text-[13px] leading-relaxed text-[#222]">{p.description}</p>
        {p.role && (
          <p className="mt-2 text-[12px] text-[#5a6779]">
            Role: <span className="text-black">{p.role}</span>
          </p>
        )}

        <div className="w7-section-head">Built with</div>
        <div className="flex flex-wrap gap-1.5">
          {p.techStack.map((t) => (
            <span key={t} className="rounded-[2px] border border-[#c5d5ec] bg-[#f3f8fe] px-1.5 py-0.5 text-[12px] text-[#1e395b]">
              {t}
            </span>
          ))}
        </div>

        <div className="w7-section-head">What do you want to do?</div>
        {hasLink(p.liveUrl) && (
          <a className="w7-commandlink" href={p.liveUrl} target="_blank" rel="noreferrer">
            <span className="arrow">➜</span>
            <span>
              {p.liveLabel ?? "Visit the live site"}
              <small>{p.liveUrl!.replace(/^https?:\/\//, "").replace(/\/$/, "")}</small>
            </span>
          </a>
        )}
        {p.githubUrl && (
          <a className="w7-commandlink" href={p.githubUrl} target="_blank" rel="noreferrer">
            <span className="arrow">➜</span>
            <span>
              Read the source code
              <small>{p.githubUrl.replace("https://github.com/", "github.com/")}</small>
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
