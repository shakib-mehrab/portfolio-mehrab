import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { profileData } from "../../data/profile";
import { educationData } from "../../data/education";
import { experienceData } from "../../data/experience";
import { experienceIndex } from "../../data/experienceIndex";
import { useOS, type AppProps } from "../os/context";
import { Explorer } from "./Explorer";
import { OrbGlyph } from "../os/icons";

export function SystemInfo({ setTitle }: AppProps) {
  const { openApp } = useOS();
  const [page, setPage] = useState<"system" | "index">("system");
  const go = (p: "system" | "index") => {
    setPage(p);
    setTitle(p === "system" ? "System" : "Performance Information and Tools");
  };
  const base = Math.min(...experienceIndex.map((r) => r.score));
  const uni = educationData[0];
  const job = experienceData[0];

  return (
    <Explorer
      current="about"
      navPane={false}
      crumbs={page === "system" ? ["Control Panel", "System and Security", "System"] : ["Control Panel", "System and Security", "Performance Information and Tools"]}
      onCrumb={(i) => i === 2 || go("system")}
      back={page === "index" ? () => go("system") : undefined}
    >
      <div className="flex h-full">
        <aside className="w7-taskpane">
          <button className={page === "system" ? "is-current" : ""} onClick={() => go("system")}>Control Panel Home</button>
          <button onClick={() => openApp("skills")}>Device Manager</button>
          <button onClick={() => openApp("contact")}>Remote settings</button>
          <button onClick={() => openApp("cmd")}>Advanced system settings</button>
          <div className="w7-seealso">See also</div>
          <button onClick={() => openApp("experience")}>Mehrab Update</button>
          <button className={page === "index" ? "is-current" : ""} onClick={() => go("index")}>Performance Information and Tools</button>
        </aside>

        <div className="min-w-0 flex-1 overflow-auto px-6 py-5 text-[12px]">
          {page === "system" ? (
            <>
              <h1 className="w7-cp-heading">View basic information about Mehrab</h1>

              <div className="w7-section-head">Mehrab edition</div>
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-1 pl-4">
                  <p>Mehrab Hossain 7 Ultimate</p>
                  <p>Copyright © 2026 Mehrab Hossain. All rights reserved.</p>
                  <p>Service Pack: {uni.degree}, {uni.institution}</p>
                </div>
                <div className="hidden shrink-0 items-center gap-3 sm:flex">
                  <span className="grid h-12 w-12 place-items-center rounded-full" style={{ background: "radial-gradient(circle at 50% 38%, #3b8ad8, #12417f 62%, #08254f)", boxShadow: "0 0 0 1px #08254f, inset 0 0 0 1px rgba(255,255,255,.35)" }}>
                    <OrbGlyph size={26} />
                  </span>
                  <span className="text-[26px] font-light leading-none text-[#4b5a70]">
                    Mehrab<span className="text-[#2a7fd4]">7</span>
                  </span>
                </div>
              </div>

              <div className="w7-section-head">System</div>
              <div className="grid grid-cols-[150px_1fr] gap-y-1.5 pl-4">
                <span className="text-[#5a6779]">Rating:</span>
                <button className="flex items-center gap-2 text-left" onClick={() => go("index")}>
                  <ScoreBadge value={base} small />
                  <span className="w7-link">Mehrab Experience Index</span>
                </button>
                <span className="text-[#5a6779]">Processor:</span>
                <span>{job.role} @ {job.company}</span>
                <span className="text-[#5a6779]">Installed memory (RAM):</span>
                <span>CGPA {uni.cgpa} / 4.00</span>
                <span className="text-[#5a6779]">System type:</span>
                <span>{profileData.roles.slice(0, 2).join(", ")}</span>
                <span className="text-[#5a6779]">Pen and Touch:</span>
                <span>Photography and video editing available</span>
              </div>

              <div className="w7-section-head">Computer name, domain, and workgroup settings</div>
              <div className="grid grid-cols-[150px_1fr] gap-y-1.5 pl-4">
                <span className="text-[#5a6779]">Computer name:</span>
                <span>MEHRAB-PC</span>
                <span className="text-[#5a6779]">Full computer name:</span>
                <span>{profileData.name}</span>
                <span className="text-[#5a6779]">Computer description:</span>
                <span>{profileData.tagline}</span>
                <span className="text-[#5a6779]">Location:</span>
                <span>{profileData.contact.location}</span>
                <span className="text-[#5a6779]">Languages:</span>
                <span>{profileData.languagesSpoken.map((l) => `${l.language} (${l.proficiency.toLowerCase()})`).join(", ")}</span>
              </div>

              <div className="w7-section-head">About this computer</div>
              <div className="flex flex-col gap-4 pl-4 sm:flex-row">
                <img
                  src={profileData.avatarUrl}
                  alt={profileData.name}
                  className="h-32 w-32 shrink-0 bg-white object-cover p-1"
                  style={{ boxShadow: "0 0 0 1px #c9c9c9, 1px 2px 4px rgba(0,0,0,.25)" }}
                />
                <div className="max-w-[62ch] space-y-2 text-[13px] leading-relaxed text-[#222]">
                  {profileData.bioParagraphs.map((p) => (
                    <p key={p.slice(0, 20)}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="w7-section-head">Mehrab activation</div>
              <div className="flex flex-wrap items-center justify-between gap-3 pl-4">
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#2b9a2b]" />
                  Mehrab is activated and open to new opportunities.
                </p>
                <button className="w7-button is-default" onClick={() => openApp("contact")}>
                  Get in touch
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="w7-cp-heading">Rate and improve this developer's performance</h1>
              <p className="mb-4 text-[#333]">
                The Mehrab Experience Index assesses key areas of the stack. Scores are self-assessed, on the Windows 7 scale of 1.0 to 7.9.
              </p>
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <table className="w-full max-w-[560px] border-collapse text-left">
                  <thead>
                    <tr className="text-[#4c607a]">
                      <th className="border-b border-[#cfd8e3] py-1 font-normal">Component</th>
                      <th className="border-b border-[#cfd8e3] py-1 font-normal">What is rated</th>
                      <th className="border-b border-[#cfd8e3] py-1 text-right font-normal">Subscore</th>
                    </tr>
                  </thead>
                  <tbody>
                    {experienceIndex.map((r) => (
                      <tr key={r.component} className="border-b border-[#eef1f5]">
                        <td className="py-1.5 pr-3">{r.component}</td>
                        <td className="py-1.5 pr-3 text-[#5a6779]">{r.rated}</td>
                        <td className="py-1.5 text-right">
                          <span className="inline-block min-w-[2.2em] rounded-[2px] border border-[#b6c9e2] bg-gradient-to-b from-white to-[#e4eef8] px-1 text-center">
                            {r.score.toFixed(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex flex-col items-center gap-1">
                  <ScoreBadge value={base} />
                  <span className="text-[11px] text-[#5a6779]">Determined by</span>
                  <span className="text-[11px] text-[#5a6779]">lowest subscore</span>
                </div>
              </div>
              <p className="mt-4 text-[#5a6779]">Tip: the lowest subscore is the one currently getting the most practice.</p>
            </>
          )}
        </div>
      </div>
    </Explorer>
  );
}

function ScoreBadge({ value, small }: { value: number; small?: boolean }) {
  const s = small ? 26 : 64;
  return (
    <span
      className="grid place-items-center rounded-[4px] font-semibold text-white"
      style={{
        width: s,
        height: s,
        fontSize: small ? 12 : 26,
        background: "linear-gradient(to bottom, #7fc4f5, #2b86d6 48%, #1662b4 52%, #2d8ad9)",
        boxShadow: "0 0 0 1px #0f4f99, inset 0 0 0 1px rgba(255,255,255,.45)",
        textShadow: "0 1px 2px rgba(0,0,0,.5)",
      }}
    >
      {value.toFixed(1)}
    </span>
  );
}
