import { useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { experienceData } from "../../data/experience";
import { achievementsData } from "../../data/achievements";
import { useOS, type AppProps } from "../os/context";
import { Icon } from "../os/icons";
import { Explorer } from "./Explorer";

export function Experience(_: AppProps) {
  const { openApp } = useOS();
  const [current, ...past] = experienceData;
  const [open, setOpen] = useState<string | null>(past[0]?.id ?? null);

  return (
    <Explorer current="experience" navPane={false} crumbs={["Control Panel", "System and Security", "Mehrab Update"]}>
      <div className="flex h-full">
        <aside className="w7-taskpane">
          <button className="is-current">Control Panel Home</button>
          <button onClick={() => openApp("projects")}>Check for updates</button>
          <button onClick={() => openApp("skills")}>Change settings</button>
          <button className="is-current">View update history</button>
          <button onClick={() => openApp("bin")}>Restore hidden updates</button>
          <div className="w7-seealso">See also</div>
          <button onClick={() => openApp("achievements")}>Installed achievements</button>
          <button onClick={() => openApp("education")}>Education Properties</button>
        </aside>

        <div className="min-w-0 flex-1 overflow-auto px-6 py-5 text-[12px]">
          <h1 className="w7-cp-heading">Mehrab Update</h1>

          {/* Status panel with the coloured strip, as Windows Update drew it */}
          <div className="flex overflow-hidden rounded-[3px] border border-[#b5c4d6]">
            <div className="w-2 shrink-0 bg-gradient-to-b from-[#6fd65f] to-[#2f9e25]" />
            <div className="flex flex-1 flex-col gap-3 bg-gradient-to-b from-white to-[#eef4fa] p-4 sm:flex-row">
              <Icon name="update" size={48} />
              <div className="min-w-0 flex-1">
                <p className="text-[15px] text-[#1e3287]">Installing update 1 of 1...</p>
                <p className="mt-1 text-[13px] text-black">
                  {current.role} — {current.company}
                </p>
                <p className="text-[#5a6779]">
                  {current.period} · {current.location}
                </p>
                <div className="w7-progress mt-3 max-w-[420px]" role="progressbar" aria-label="Internship in progress" aria-valuetext="In progress">
                  <i style={{ width: "38%" }} />
                </div>
                <ul className="mt-3 list-disc space-y-1 pl-4 text-[12.5px] leading-relaxed text-[#222]">
                  {current.description.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <p className="mt-2 text-[#5a6779]">Includes: {current.technologies.join(", ")}</p>
              </div>
            </div>
          </div>

          <div className="w7-section-head">Review your update history</div>
          <p className="mb-2 text-[#5a6779]">Click an update to see its details.</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead>
                <tr className="text-[#4c607a]">
                  {["Name", "Status", "Importance", "Date installed"].map((h) => (
                    <th key={h} className="border-r border-b border-[#e1e6ee] px-2 py-1 font-normal whitespace-nowrap last:border-r-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="text-[#222]">
                  <td className="px-2 py-1.5">{current.role} ({current.company})</td>
                  <td className="px-2 py-1.5 text-[#c27a00]">In progress</td>
                  <td className="px-2 py-1.5">Important</td>
                  <td className="px-2 py-1.5">{current.period.split(" – ")[0]}</td>
                </tr>
                {past.map((e) => (
                  <ExpRow key={e.id} e={e} open={open === e.id} toggle={() => setOpen(open === e.id ? null : e.id)} />
                ))}
                {achievementsData.slice(0, 3).map((a) => (
                  <tr key={a.id} className="text-[#222]">
                    <td className="px-2 py-1.5">Hackathon pack: {a.title}</td>
                    <td className="px-2 py-1.5 text-[#2b9a2b]">Successful</td>
                    <td className="px-2 py-1.5">Optional</td>
                    <td className="px-2 py-1.5">{a.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Explorer>
  );
}

function ExpRow({ e, open, toggle }: { e: (typeof experienceData)[number]; open: boolean; toggle: () => void }) {
  return (
    <>
      <tr className={`w7-hover cursor-default border border-transparent text-[#222] ${open ? "w7-selected" : ""}`} onClick={toggle}>
        <td className="px-2 py-1.5">
          <span className="inline-flex items-center gap-1">
            {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            {e.role} ({e.company})
          </span>
        </td>
        <td className="px-2 py-1.5 text-[#2b9a2b]">Successful</td>
        <td className="px-2 py-1.5">Recommended</td>
        <td className="px-2 py-1.5">{e.period}</td>
      </tr>
      {open && (
        <tr>
          <td colSpan={4} className="px-7 pt-1 pb-3">
            <p className="text-[#5a6779]">{e.location}</p>
            <ul className="mt-1 list-disc space-y-1 pl-4 text-[12.5px] leading-relaxed">
              {e.description.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="mt-1.5 text-[#5a6779]">Includes: {e.technologies.join(", ")}</p>
            {e.link && (
              <a className="w7-link mt-1.5 inline-flex items-center gap-1" href={e.link} target="_blank" rel="noreferrer">
                More information <ExternalLink size={11} />
              </a>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
