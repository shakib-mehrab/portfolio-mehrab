import { useState } from "react";
import { achievementsData } from "../../data/achievements";
import { useOS, type AppProps } from "../os/context";
import { Icon } from "../os/icons";
import { Explorer, Thumb, Tile } from "./Explorer";

export function Achievements(_: AppProps) {
  const { openApp } = useOS();
  const [sel, setSel] = useState(achievementsData[0].id);
  const a = achievementsData.find((x) => x.id === sel)!;

  const view = () => a.image && openApp("photoviewer", { images: achievementsData.filter((x) => x.image).map((x) => ({ src: x.image!, title: x.title })), index: achievementsData.filter((x) => x.image).findIndex((x) => x.id === a.id) });

  return (
    <Explorer
      current="achievements"
      crumbs={["Libraries", "Achievements"]}
      commands={
        <>
          <button className="w7-cmd" disabled={!a.image} onClick={view}>Preview</button>
          <button className="w7-cmd" onClick={() => openApp("projects")}>Related projects</button>
        </>
      }
      status={<>{achievementsData.length} items</>}
    >
      <div className="flex h-full flex-col md:flex-row">
        <div className="min-w-0 flex-1 overflow-auto">
          <h3 className="w7-group-head">Hackathons &amp; competitions ({achievementsData.length})</h3>
          <div className="flex flex-wrap gap-1 px-3 pb-4">
            {achievementsData.map((x) => (
              <Tile
                key={x.id}
                width={140}
                selected={sel === x.id}
                onSelect={() => setSel(x.id)}
                onOpen={() => (setSel(x.id), x.image && view())}
                thumb={x.image ? <Thumb src={x.image} alt="" w={118} h={80} /> : <BoxArt />}
                label={x.title}
                sub={x.award}
              />
            ))}
          </div>
        </div>

        {/* The right-hand pane of the Games folder: box art, rating, performance */}
        <aside className="w-full shrink-0 border-t border-[#d6e1ee] bg-gradient-to-b from-[#f7fafd] to-[#e8f0f8] p-4 md:w-[280px] md:border-t-0 md:border-l">
          <div className="mx-auto mb-3 w-fit">{a.image ? <Thumb src={a.image} alt={a.title} w={232} h={150} /> : <BoxArt big />}</div>
          <h2 className="text-[15px] leading-tight text-[#1e3287]">{a.title}</h2>
          <p className="mt-0.5 text-[#5a6779]">
            {a.organization} · {a.year}
          </p>
          <div className="mt-3 flex items-center gap-3 rounded-[3px] border border-[#c5d5ec] bg-white p-2">
            <span
              className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-[3px] bg-white"
              style={{ boxShadow: "0 0 0 1px #c9c9c9" }}
            >
              {a.icon ? <img src={a.icon} alt="" className="h-full w-full object-contain" /> : <Icon name="trophy" size={34} />}
            </span>
            <div>
              <div className="text-[11px] tracking-wide text-[#5a6779] uppercase">Rating</div>
              <div className="text-[14px] font-semibold text-black">{a.award}</div>
            </div>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-[#222]">{a.description}</p>
          {a.tags && (
            <p className="mt-2 text-[#5a6779]">
              Tags: <span className="text-black">{a.tags.filter((t) => t !== "Featured").join("; ")}</span>
            </p>
          )}
        </aside>
      </div>
    </Explorer>
  );
}

function BoxArt({ big }: { big?: boolean }) {
  const w = big ? 232 : 118;
  const h = big ? 150 : 80;
  return (
    <span
      className="grid place-items-center"
      style={{
        width: w,
        height: h,
        background: "radial-gradient(circle at 50% 35%, #fff7d1, #f3d36b 45%, #b37b16)",
        boxShadow: "0 0 0 1px #9a6c12, 1px 2px 3px rgba(0,0,0,.25)",
      }}
    >
      <Icon name="trophy" size={big ? 80 : 46} />
    </span>
  );
}
