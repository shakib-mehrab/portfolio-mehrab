import { useState } from "react";
import { profileData } from "../../data/profile";
import { useOS, type AppProps } from "../os/context";
import { Icon, type IconName } from "../os/icons";

// Hovering an item previews it in the top panel, the way Getting Started did
const tasks: { app: string; icon: IconName; title: string; text: string }[] = [
  { app: "about", icon: "user", title: "Get to know Mehrab", text: "A CSE graduate from Comilla University who builds full-stack, AI and Web3 products, runs tech communities, and takes photographs." },
  { app: "projects", icon: "projects", title: "Browse projects", text: "Stellar Tales (NASA Space Apps global finalist), Momentum (SOLVIO top 10), RS Foundation, Ad-Deen and more, with screenshots and notes." },
  { app: "experience", icon: "update", title: "See what's installing", text: "Currently installing: Software Engineering Intern at Brainify Technologies. Past updates include the CSEFEST website." },
  { app: "achievements", icon: "trophy", title: "View achievements", text: "Hackathons and competitions: NASA Space Apps, SOLVIO AI, Bangladesh Blockchain Olympiad, Hult Prize." },
  { app: "skills", icon: "chip", title: "Check installed skills", text: "Every skill, filed in Device Manager under the hardware it most resembles." },
  { app: "resume", icon: "pdf", title: "Transfer the résumé", text: "Open or save a one-page PDF résumé." },
  { app: "personalize", icon: "personalize", title: "Personalize Mehrab 7", text: "Change the desktop background and the colour of the glass." },
  { app: "contact", icon: "mail", title: "Send a message", text: "Write to Mehrab directly from here, or find LinkedIn, GitHub and the rest." },
  { app: "cmd", icon: "cmd", title: "Open Command Prompt", text: "For the developers. Type help, neofetch, or start projects." },
];

export function GettingStarted(_: AppProps) {
  const { openApp } = useOS();
  const [hover, setHover] = useState(0);
  const t = tasks[hover];

  return (
    <div className="w7-body">
      {/* Top panel: a soft blue banner that previews the hovered task */}
      <div
        className="flex shrink-0 items-start gap-4 px-6 py-5"
        style={{ background: "linear-gradient(#fdfeff, #e3effb)", borderBottom: "1px solid #c5d5ec" }}
      >
        <img
          src={profileData.avatarUrl}
          alt=""
          className="hidden h-[72px] w-[72px] shrink-0 bg-white object-cover p-1 sm:block"
          style={{ boxShadow: "0 0 0 1px #b6c9e2, 1px 2px 4px rgba(0,0,0,.2)" }}
        />
        <div className="min-w-0">
          <h1 className="text-[19px] leading-snug font-normal text-[#1e3287]">
            Hi, I'm {profileData.name.split(" ")[0]}. Windows 7 was the first OS I ever used.
          </h1>
          <p className="mt-1 max-w-[62ch] text-[13px] leading-relaxed text-[#333]">
            Today I'm a software engineer, and this desktop is me rebuilding it from memory. Everything here opens like it did in 2009: double-click an icon, or pick something below.
          </p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <div className="min-h-0 flex-1 overflow-auto p-3">
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {tasks.map((task, i) => (
              <button
                key={task.app}
                className={`w7-hover flex flex-col items-center gap-1.5 rounded-[3px] border border-transparent p-3 text-center ${hover === i ? "w7-selected" : ""}`}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onClick={() => openApp(task.app)}
              >
                <Icon name={task.icon} size={40} />
                <span className="text-[12px] leading-tight text-black">{task.title}</span>
              </button>
            ))}
          </div>
        </div>
        <aside className="hidden w-[230px] shrink-0 flex-col border-l border-[#d6e1ee] bg-gradient-to-b from-[#f7fafd] to-[#e8f0f8] p-4 md:flex">
          <Icon name={t.icon} size={48} />
          <h2 className="mt-2 text-[15px] text-[#1e3287]">{t.title}</h2>
          <p className="mt-1 text-[12.5px] leading-relaxed text-[#333]">{t.text}</p>
          <button className="w7-button is-default mt-4 self-start" onClick={() => openApp(t.app)}>
            Open
          </button>
        </aside>
      </div>
    </div>
  );
}
