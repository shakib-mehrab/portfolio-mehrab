import { Download, ExternalLink, Printer } from "lucide-react";
import { useOS, type AppProps } from "../os/context";
import { Icon } from "../os/icons";

const PDF = "/resume.pdf";

export function Resume(_: AppProps) {
  // Phones rarely render PDFs inside frames, so offer the file instead
  const embedded = !useOS().isMobile;

  return (
    <div className="w7-body">
      <div className="w7-commandbar">
        <a className="w7-cmd" href={PDF} download="Mehrab_Hossain_Resume.pdf">
          <Download size={14} /> Save a copy
        </a>
        <a className="w7-cmd" href={PDF} target="_blank" rel="noreferrer">
          <ExternalLink size={14} /> Open in new tab
        </a>
        <button className="w7-cmd" onClick={() => window.open(PDF, "_blank")?.print?.()}>
          <Printer size={14} /> Print
        </button>
      </div>
      {embedded ? (
        <iframe title="Résumé" src={`${PDF}#view=FitH`} className="min-h-0 w-full flex-1 border-0 bg-[#525659]" />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          <Icon name="pdf" size={64} />
          <p className="text-[14px] text-[#1e3287]">Resume.pdf</p>
          <p className="text-[#5a6779]">PDF Document · 100 KB</p>
          <div className="flex gap-2">
            <a className="w7-button is-default" href={PDF} target="_blank" rel="noreferrer">Open</a>
            <a className="w7-button" href={PDF} download="Mehrab_Hossain_Resume.pdf">Save</a>
          </div>
        </div>
      )}
    </div>
  );
}
