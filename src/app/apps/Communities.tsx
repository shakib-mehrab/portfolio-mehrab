import { useState } from "react";
import { cocurricularData } from "../../data/cocurricular";
import type { AppProps } from "../os/context";
import { Explorer, Thumb } from "./Explorer";

export function Communities(_: AppProps) {
  const [sel, setSel] = useState(cocurricularData[0].id);
  const c = cocurricularData.find((x) => x.id === sel)!;

  return (
    <Explorer
      current="communities"
      crumbs={["Libraries", "Communities"]}
      details={
        <>
          <Thumb src={c.image} alt="" w={72} h={72} />
          <div className="min-w-0">
            <div className="text-[14px] text-black">{c.organization}</div>
            <div className="text-[#5a6779]">
              {c.role} · {c.period}
            </div>
            <p className="mt-1 max-w-[80ch] leading-relaxed text-[#222]">{c.description}</p>
          </div>
        </>
      }
      status={<>{cocurricularData.length} items</>}
    >
      <h3 className="w7-group-head">Leadership ({cocurricularData.length})</h3>
      {/* Windows 7 "Tiles" view: medium icon on the left, three lines of text */}
      <div className="grid gap-1 px-3 pb-4 sm:grid-cols-2 xl:grid-cols-3">
        {cocurricularData.map((x) => (
          <button
            key={x.id}
            className={`w7-hover flex items-center gap-3 rounded-[3px] border border-transparent p-2 text-left ${sel === x.id ? "w7-selected" : ""}`}
            onClick={() => setSel(x.id)}
          >
            <Thumb src={x.image} alt="" w={56} h={56} />
            <span className="min-w-0">
              <span className="block truncate text-black">{x.organization}</span>
              <span className="block truncate text-[#6d6d6d]">{x.role}</span>
              <span className="block truncate text-[#6d6d6d]">{x.period}</span>
            </span>
          </button>
        ))}
      </div>
    </Explorer>
  );
}
