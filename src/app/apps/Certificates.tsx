import { useState } from "react";
import { certificatesData } from "../../data/certificates";
import { useOS, type AppProps } from "../os/context";
import { Explorer, Thumb, Tile } from "./Explorer";

export function Certificates(_: AppProps) {
  const { openApp } = useOS();
  const [sel, setSel] = useState(certificatesData[0].id);
  const c = certificatesData.find((x) => x.id === sel)!;
  const withImages = certificatesData.filter((x) => x.image);

  const preview = (id: string) =>
    openApp("photoviewer", {
      images: withImages.map((x) => ({ src: x.image!, title: `${x.title} — ${x.issuer}` })),
      index: withImages.findIndex((x) => x.id === id),
    });

  return (
    <Explorer
      current="certificates"
      crumbs={["Libraries", "Documents", "Certificates"]}
      commands={
        <>
          <button className="w7-cmd" onClick={() => preview(c.id)}>Preview</button>
          <button className="w7-cmd" onClick={() => preview(withImages[0].id)}>Slide show</button>
        </>
      }
      details={
        <>
          <Thumb src={c.image} alt="" w={88} h={62} />
          <div>
            <div className="text-[14px] text-black">{c.title}</div>
            <div className="text-[#5a6779]">Certificate</div>
            <dl className="mt-1 grid gap-x-6 sm:grid-cols-2">
              <div className="w7-prop"><dt>Issued by:</dt><dd>{c.issuer}</dd></div>
              <div className="w7-prop"><dt>Date:</dt><dd>{c.date}</dd></div>
              {c.category && <div className="w7-prop"><dt>Category:</dt><dd>{c.category}</dd></div>}
              <div className="w7-prop"><dt>Tags:</dt><dd>{c.skills.join("; ")}</dd></div>
            </dl>
          </div>
        </>
      }
      status={<>{certificatesData.length} items</>}
    >
      <div className="flex flex-wrap gap-1 p-3">
        {certificatesData.map((x) => (
          <Tile
            key={x.id}
            width={164}
            selected={sel === x.id}
            onSelect={() => setSel(x.id)}
            onOpen={() => preview(x.id)}
            thumb={<Thumb src={x.image} alt="" w={146} h={104} />}
            label={x.title}
            sub={x.issuer}
          />
        ))}
      </div>
    </Explorer>
  );
}
