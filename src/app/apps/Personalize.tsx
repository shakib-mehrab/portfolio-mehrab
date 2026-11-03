import { useState } from "react";
import { photos } from "../../data/photos";
import { useOS, type AppProps } from "../os/context";
import { glassColors, wallpapers } from "../os/theme";
import { Explorer } from "./Explorer";

export function Personalize(_: AppProps) {
  const { theme, setTheme, openApp } = useOS();
  const [page, setPage] = useState<"themes" | "color">("themes");
  const allWalls = [...wallpapers, ...photos.map((p) => ({ id: p.src, name: p.title, src: p.src, glass: "Slate" as const }))];

  return (
    <Explorer
      current="personalize"
      navPane={false}
      crumbs={page === "themes" ? ["Control Panel", "Appearance and Personalization", "Personalization"] : ["Control Panel", "Appearance and Personalization", "Personalization", "Window Color and Appearance"]}
      onCrumb={(i) => i === 2 && setPage("themes")}
      back={page === "color" ? () => setPage("themes") : undefined}
    >
      <div className="flex h-full">
        <aside className="w7-taskpane">
          <button className={page === "themes" ? "is-current" : ""} onClick={() => setPage("themes")}>Control Panel Home</button>
          <button onClick={() => setPage("color")}>Change window colors</button>
          <button onClick={() => openApp("skills")}>Change desktop icons</button>
          <div className="w7-seealso">See also</div>
          <button onClick={() => openApp("about")}>System</button>
          <button onClick={() => openApp("pictures")}>Pictures library</button>
        </aside>

        <div className="min-w-0 flex-1 overflow-auto px-6 py-5 text-[12px]">
          {page === "themes" ? (
            <>
              <h1 className="w7-cp-heading">Change the visuals on your computer</h1>
              <p className="mb-3 text-[#333]">Click a theme to change the desktop background and window color at once.</p>
              <div className="rounded-[3px] border border-[#cfd8e3] bg-white p-3">
                <div className="mb-2 text-[#1e3287]">Aero Themes ({allWalls.length})</div>
                <div className="flex flex-wrap gap-2">
                  {allWalls.map((w) => (
                    <button
                      key={w.id}
                      className={`w7-hover flex flex-col items-center gap-1 rounded-[3px] border border-transparent p-2 ${theme.wallpaper === w.id ? "w7-selected" : ""}`}
                      onClick={() => setTheme({ wallpaper: w.id, glass: w.glass })}
                    >
                      <span className="relative block h-[72px] w-[116px] overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url("${w.src}")`, boxShadow: "0 0 0 1px #9a9a9a, 1px 2px 3px rgba(0,0,0,.3)" }}>
                        <span className="absolute right-1 bottom-1 h-3 w-5 rounded-[2px]" style={{ background: `rgb(${glassColors.find((c) => c.name === w.glass)?.rgb} / .8)`, boxShadow: "0 0 0 1px rgba(0,0,0,.5)" }} />
                      </span>
                      <span className="text-black">{w.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-8">
                <button className="flex items-center gap-3 text-left" onClick={() => setPage("color")}>
                  <span className="h-10 w-14 rounded-[3px]" style={{ background: `rgb(${glassColors.find((c) => c.name === theme.glass)?.rgb} / .85)`, boxShadow: "0 0 0 1px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.5)" }} />
                  <span>
                    <span className="w7-link block">Window Color</span>
                    <span className="text-[#5a6779]">{theme.glass}</span>
                  </span>
                </button>
                <div className="flex items-center gap-3">
                  <span className="h-10 w-14 bg-cover bg-center" style={{ backgroundImage: `url("${allWalls.find((w) => w.id === theme.wallpaper)?.src}")`, boxShadow: "0 0 0 1px #9a9a9a" }} />
                  <span>
                    <span className="block text-black">Desktop Background</span>
                    <span className="text-[#5a6779]">{allWalls.find((w) => w.id === theme.wallpaper)?.name}</span>
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="w7-cp-heading">Change the color of your window borders, Start menu, and taskbar</h1>
              <div className="flex max-w-[540px] flex-wrap gap-2">
                {glassColors.map((c) => (
                  <button
                    key={c.name}
                    title={c.name}
                    aria-label={c.name}
                    aria-pressed={theme.glass === c.name}
                    onClick={() => setTheme({ glass: c.name })}
                    className={`rounded-[4px] border p-[3px] ${theme.glass === c.name ? "border-[#3399ff] bg-[#e5f1fc]" : "border-transparent hover:border-[#b8d6fb]"}`}
                  >
                    <span className="block h-[46px] w-[52px] rounded-[3px]" style={{ background: `linear-gradient(115deg, rgba(255,255,255,.35), rgba(255,255,255,0) 50%), rgb(${c.rgb})`, boxShadow: "0 0 0 1px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.5)" }} />
                  </button>
                ))}
              </div>
              <p className="mt-3 text-black">Current color: {theme.glass}</p>
              <label className="mt-4 flex items-center gap-2">
                <input type="checkbox" checked={theme.transparency} onChange={(e) => setTheme({ transparency: e.target.checked })} className="accent-[#2a7fd4]" />
                Enable transparency
              </label>
              <label className="mt-3 flex max-w-[420px] items-center gap-3">
                <span className="shrink-0">Color intensity:</span>
                <input
                  type="range"
                  min={0.15}
                  max={0.85}
                  step={0.05}
                  value={theme.intensity}
                  onChange={(e) => setTheme({ intensity: Number(e.target.value) })}
                  className="flex-1 accent-[#2a7fd4]"
                />
              </label>
              <div className="mt-6 flex gap-2">
                <button className="w7-button is-default" onClick={() => setPage("themes")}>Save changes</button>
                <button className="w7-button" onClick={() => setTheme({ glass: "Sky", intensity: 0.5, transparency: true })}>Reset</button>
              </div>
            </>
          )}
        </div>
      </div>
    </Explorer>
  );
}
