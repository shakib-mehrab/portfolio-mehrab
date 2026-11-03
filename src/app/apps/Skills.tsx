import { useState } from "react";
import {
  AudioLines, Binary, Camera, ChevronDown, ChevronRight, Cpu, Database, Fingerprint, Keyboard,
  Monitor, MonitorSmartphone, Network, Radar, Smartphone, Video,
} from "lucide-react";
import { skillCategoriesData } from "../../data/skills";
import { additionalSkillsData } from "../../data/additionalSkills";
import type { AppProps } from "../os/context";
import { Icon } from "../os/icons";

// Each skill category is filed under the Device Manager class it most resembles
const deviceClass: Record<string, { cls: string; Glyph: typeof Cpu; color: string }> = {
  "Programming Languages": { cls: "Processors", Glyph: Cpu, color: "#3a6ea5" },
  "Competitive Programming": { cls: "System devices", Glyph: Binary, color: "#4b5a70" },
  "Frontend Development": { cls: "Display adapters", Glyph: Monitor, color: "#2a7fd4" },
  "Backend Development": { cls: "Network adapters", Glyph: Network, color: "#2e8b57" },
  "Database & Tools": { cls: "Disk drives", Glyph: Database, color: "#6b6b6b" },
  "Blockchain & Web3": { cls: "Security devices", Glyph: Fingerprint, color: "#b8860b" },
  "Mobile Development": { cls: "Portable Devices", Glyph: Smartphone, color: "#4b5a70" },
  "Machine Learning & AI": { cls: "Sensors", Glyph: Radar, color: "#7a4fb5" },
  "Other Skills": { cls: "Human Interface Devices", Glyph: Keyboard, color: "#4b5a70" },
  "Video Editing": { cls: "Sound, video and game controllers", Glyph: Video, color: "#c0392b" },
  Photography: { cls: "Imaging devices", Glyph: Camera, color: "#333" },
  "Creative Design": { cls: "Monitors", Glyph: MonitorSmartphone, color: "#2a7fd4" },
  "Public Speaking": { cls: "Audio inputs and outputs", Glyph: AudioLines, color: "#2e8b57" },
};

const tree = [
  ...skillCategoriesData.map((c) => ({ name: c.category, items: c.skills.map((s) => s.name), note: undefined as string | undefined })),
  ...additionalSkillsData.map((g) => ({ name: g.title, items: g.items, note: g.description })),
].sort((a, b) => deviceClass[a.name].cls.localeCompare(deviceClass[b.name].cls));

export function Skills(_: AppProps) {
  const [open, setOpen] = useState<Set<string>>(() => new Set(["Frontend Development", "Programming Languages"]));
  const [sel, setSel] = useState<{ cat: string; item?: string }>({ cat: "Frontend Development" });

  const toggle = (name: string) =>
    setOpen((s) => {
      const n = new Set(s);
      n.has(name) ? n.delete(name) : n.add(name);
      return n;
    });

  const selCat = tree.find((t) => t.name === sel.cat)!;
  const dc = deviceClass[sel.cat];

  return (
    <div className="w7-body">
      <div className="w7-menubar" aria-hidden="true">
        <span>File</span>
        <span>Action</span>
        <span>View</span>
        <span>Help</span>
      </div>
      <div className="min-h-0 flex-1 overflow-auto bg-white py-1 text-[12px]" role="tree" aria-label="Skills">
        <div className="flex items-center gap-1.5 px-2 py-0.5">
          <ChevronDown size={12} className="text-[#555]" />
          <Icon name="chip" size={16} />
          MEHRAB-PC
        </div>
        {tree.map((c) => {
          const d = deviceClass[c.name];
          const isOpen = open.has(c.name);
          return (
            <div key={c.name} role="treeitem" aria-expanded={isOpen}>
              <button
                className={`w7-hover ml-5 flex w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-[2px] border border-transparent px-1 py-[1px] text-left ${sel.cat === c.name && !sel.item ? "w7-selected" : ""}`}
                onClick={() => {
                  setSel({ cat: c.name });
                  toggle(c.name);
                }}
              >
                {isOpen ? <ChevronDown size={12} className="text-[#555]" /> : <ChevronRight size={12} className="text-[#555]" />}
                <d.Glyph size={15} color={d.color} />
                <span>{d.cls}</span>
                <span className="truncate text-[#7a8696]">— {c.name}</span>
              </button>
              {isOpen && (
                <div role="group">
                  {c.items.map((it) => (
                    <button
                      key={it}
                      className={`w7-hover ml-12 flex w-[calc(100%-3.5rem)] items-center gap-1.5 rounded-[2px] border border-transparent px-1 py-[1px] text-left ${sel.cat === c.name && sel.item === it ? "w7-selected" : ""}`}
                      onClick={() => setSel({ cat: c.name, item: it })}
                    >
                      <d.Glyph size={14} color={d.color} />
                      {it}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="w7-detailspane">
        <dc.Glyph size={32} color={dc.color} className="shrink-0" />
        <div className="min-w-0">
          <div className="text-[13px] text-black">{sel.item ?? `${dc.cls} (${selCat.name})`}</div>
          <div className="text-[#5a6779]">Device status: This device is working properly.</div>
          <div className="mt-1 text-[#333]">
            {selCat.note ?? `${selCat.items.length} drivers installed: ${selCat.items.join(", ")}.`}
          </div>
        </div>
      </div>
    </div>
  );
}
