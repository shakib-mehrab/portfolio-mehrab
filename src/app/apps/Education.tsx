import { useState } from "react";
import { educationData } from "../../data/education";
import type { AppProps } from "../os/context";
import { Icon } from "../os/icons";

const tabName = (inst: string) => inst.replace("Govt. ", "").replace(" Jamea Islamia High School", "");

export function Education({ close }: AppProps) {
  const [tab, setTab] = useState(0);
  const e = educationData[tab];

  return (
    <div className="w7-body w7-dialog-face p-2.5">
      <div className="w7-tabs" role="tablist">
        {educationData.map((ed, i) => (
          <button key={ed.id} role="tab" aria-selected={tab === i} className="w7-tab" onClick={() => setTab(i)}>
            {tabName(ed.institution)}
          </button>
        ))}
      </div>
      <div className="w7-tabpanel min-h-0 flex-1 overflow-auto" role="tabpanel">
        <div className="flex items-center gap-4">
          <Icon name="graduation" size={40} />
          <input className="w7-input" readOnly value={e.degree} aria-label="Degree" />
        </div>
        <hr className="my-3 border-[#d5dfe5]" />
        <dl className="grid grid-cols-[100px_1fr] gap-y-2">
          <dt className="text-[#333]">Institution:</dt>
          <dd>{e.institution}</dd>
          <dt className="text-[#333]">Location:</dt>
          <dd>{e.location}</dd>
        </dl>
        <hr className="my-3 border-[#d5dfe5]" />
        <dl className="grid grid-cols-[100px_1fr] gap-y-2">
          <dt className="text-[#333]">Period:</dt>
          <dd>{e.period}</dd>
          <dt className="text-[#333]">Status:</dt>
          <dd>{e.status}</dd>
          <dt className="text-[#333]">{tab === 0 ? "CGPA:" : "GPA:"}</dt>
          <dd>
            {e.cgpa} <span className="text-[#6d6d6d]">/ {tab === 0 ? "4.00" : "5.00"}</span>
          </dd>
        </dl>
        <hr className="my-3 border-[#d5dfe5]" />
        <fieldset className="rounded-[3px] border border-[#d5dfe5] px-3 pt-1 pb-3">
          <legend className="px-1 text-[#1e3287]">Highlights</legend>
          <ul className="space-y-2">
            {e.highlights.map((h) => (
              <li key={h} className="flex gap-2 leading-relaxed">
                <input type="checkbox" checked readOnly className="mt-[3px] accent-[#2a7fd4]" aria-hidden="true" tabIndex={-1} />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </fieldset>
      </div>
      <div className="flex justify-end gap-2 pt-2.5">
        <button className="w7-button is-default" onClick={close}>OK</button>
        <button className="w7-button" onClick={close}>Cancel</button>
        <button className="w7-button" disabled>Apply</button>
      </div>
    </div>
  );
}
