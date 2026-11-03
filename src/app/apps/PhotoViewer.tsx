import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, RotateCw, ZoomIn } from "lucide-react";
import type { AppProps } from "../os/context";

interface Img {
  src: string;
  title: string;
}

export function PhotoViewer({ props, setTitle }: AppProps) {
  const images = (props?.images as Img[]) ?? [];
  const [i, setI] = useState((props?.index as number) ?? 0);
  const [playing, setPlaying] = useState(false);
  const [rot, setRot] = useState(0);
  const [zoom, setZoom] = useState(false);

  // A new set of images (opened from another folder) restarts the viewer
  useEffect(() => {
    setI((props?.index as number) ?? 0);
    setRot(0);
  }, [props]);

  const img = images[i];
  useEffect(() => {
    if (img) setTitle(`${img.title} - Photo Viewer`);
  }, [img, setTitle]);

  useEffect(() => {
    if (!playing || images.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % images.length), 3200);
    return () => clearInterval(t);
  }, [playing, images.length]);

  const step = (d: number) => {
    setRot(0);
    setI((n) => (n + d + images.length) % images.length);
  };

  return (
    <div className="w7-body" onKeyDown={(e) => (e.key === "ArrowRight" ? step(1) : e.key === "ArrowLeft" ? step(-1) : null)} tabIndex={-1}>
      <div className="w7-commandbar">
        <span className="w7-cmd">File</span>
        <span className="w7-cmd">Print</span>
        <span className="w7-cmd">E-mail</span>
        <span className="w7-cmd">Open</span>
        <span className="flex-1" />
        <span className="pr-2 text-[#5a6779]">{images.length ? `${i + 1} of ${images.length}` : ""}</span>
      </div>
      <div
        className="grid min-h-0 flex-1 place-items-center overflow-auto p-4"
        style={{ background: "linear-gradient(#f4f8fc, #dde8f4)" }}
        onDoubleClick={() => setZoom((z) => !z)}
      >
        {img ? (
          <img
            src={img.src}
            alt={img.title}
            className="transition-transform duration-300"
            style={{
              transform: `rotate(${rot}deg)`,
              maxWidth: zoom ? "none" : "100%",
              maxHeight: zoom ? "none" : "100%",
              boxShadow: "0 2px 10px rgba(0,0,0,.3)",
            }}
          />
        ) : (
          <p className="text-[#6d6d6d]">No pictures to show.</p>
        )}
      </div>

      {/* The glossy control strip along the bottom of Photo Viewer */}
      <div
        className="flex h-[52px] shrink-0 items-center justify-center gap-2 border-t border-[#9fb1c6]"
        style={{ background: "linear-gradient(#e8f0f8, #c9d8ea 50%, #b9cbe0 51%, #d3e0ee)" }}
      >
        <ViewerBtn label="Zoom" onClick={() => setZoom((z) => !z)}><ZoomIn size={16} /></ViewerBtn>
        <span className="mx-1 h-6 w-px bg-[#9fb1c6]" />
        <ViewerBtn label="Previous" onClick={() => step(-1)}><ChevronLeft size={18} /></ViewerBtn>
        <button
          aria-label={playing ? "Stop slide show" : "Play slide show"}
          onClick={() => setPlaying((p) => !p)}
          className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:brightness-110"
          style={{
            background: "radial-gradient(circle at 50% 110%, #8ef0ff, rgba(142,240,255,0) 55%), linear-gradient(#8cc2ee, #3f8fd8 48%, #1360b8 52%, #2a83d4)",
            boxShadow: "0 0 0 1px #1b4e8c, inset 0 1px 0 rgba(255,255,255,.7)",
          }}
        >
          {playing ? <Pause size={16} fill="#fff" /> : <Play size={16} fill="#fff" className="ml-0.5" />}
        </button>
        <ViewerBtn label="Next" onClick={() => step(1)}><ChevronRight size={18} /></ViewerBtn>
        <span className="mx-1 h-6 w-px bg-[#9fb1c6]" />
        <ViewerBtn label="Rotate counterclockwise" onClick={() => setRot((r) => r - 90)}><RotateCcw size={15} /></ViewerBtn>
        <ViewerBtn label="Rotate clockwise" onClick={() => setRot((r) => r + 90)}><RotateCw size={15} /></ViewerBtn>
      </div>
    </div>
  );
}

function ViewerBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button aria-label={label} onClick={onClick} className="w7-cmd grid h-8 w-8 place-items-center !px-0 text-[#1e395b]">
      {children}
    </button>
  );
}
