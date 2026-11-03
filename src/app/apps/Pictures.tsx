import { useState } from "react";
import { photos } from "../../data/photos";
import { profileData } from "../../data/profile";
import { useOS, type AppProps } from "../os/context";
import { Explorer, Thumb, Tile } from "./Explorer";

export function Pictures(_: AppProps) {
  const { openApp } = useOS();
  const [sel, setSel] = useState(0);
  const show = (index: number) => openApp("photoviewer", { images: photos.map((p) => ({ src: p.src, title: p.title })), index });
  const p = photos[sel];

  return (
    <Explorer
      current="pictures"
      crumbs={["Libraries", "Pictures", "Photography"]}
      commands={
        <>
          <button className="w7-cmd" disabled={!photos.length} onClick={() => show(0)}>Slide show</button>
          <a className="w7-cmd" href={profileData.contact.instagram} target="_blank" rel="noreferrer">Open Instagram</a>
          <a className="w7-cmd" href={profileData.contact.behance} target="_blank" rel="noreferrer">Open Behance</a>
        </>
      }
      details={
        p && (
          <>
            <Thumb src={p.src} alt="" w={88} h={62} />
            <dl>
              <div className="text-[14px] text-black">{p.title}</div>
              {p.taken && <div className="w7-prop"><dt>Date taken:</dt><dd>{p.taken}</dd></div>}
              {p.place && <div className="w7-prop"><dt>Location:</dt><dd>{p.place}</dd></div>}
              {p.camera && <div className="w7-prop"><dt>Camera:</dt><dd>{p.camera}</dd></div>}
            </dl>
          </>
        )
      }
      status={<>{photos.length} items</>}
    >
      {photos.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <p className="text-[#6d6d6d]">This folder is empty.</p>
          <p className="mx-auto mt-3 max-w-[46ch] text-[12px] leading-relaxed text-[#8a8a8a]">
            Event, portrait, product and landscape shots are being picked for this library. Until then, they live on Instagram and Behance.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-1 p-3">
          {photos.map((ph, i) => (
            <Tile key={ph.src} width={170} selected={sel === i} onSelect={() => setSel(i)} onOpen={() => show(i)} thumb={<Thumb src={ph.src} alt="" w={152} h={108} />} label={ph.title} />
          ))}
        </div>
      )}
    </Explorer>
  );
}
