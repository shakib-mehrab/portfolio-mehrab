import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { AppProps } from "./context";
import type { IconName } from "./icons";

export interface AppDef {
  id: string;
  title: string; // window title, in the voice of the Windows 7 program it imitates
  label: string; // plain label for the desktop and Start menu
  icon: IconName;
  accent: string; // taskbar hot-track colour, "r g b"
  w: number;
  h: number;
  resizable?: boolean;
  component: LazyExoticComponent<ComponentType<AppProps>>;
}

const load = <K extends string>(factory: () => Promise<Record<K, ComponentType<AppProps>>>, name: K) =>
  lazy(() => factory().then((m) => ({ default: m[name] })));

export const apps: Record<string, AppDef> = {
  welcome: { id: "welcome", title: "Getting Started", label: "Getting Started", icon: "info", accent: "70 160 255", w: 780, h: 520, component: load(() => import("../apps/GettingStarted"), "GettingStarted") },
  about: { id: "about", title: "System", label: "About Me", icon: "user", accent: "90 160 235", w: 900, h: 620, component: load(() => import("../apps/SystemInfo"), "SystemInfo") },
  projects: { id: "projects", title: "Projects", label: "Projects", icon: "projects", accent: "245 196 70", w: 1000, h: 650, component: load(() => import("../apps/Projects"), "Projects") },
  experience: { id: "experience", title: "Mehrab Update", label: "Experience", icon: "update", accent: "80 200 80", w: 860, h: 580, component: load(() => import("../apps/Experience"), "Experience") },
  education: { id: "education", title: "Education Properties", label: "Education", icon: "graduation", accent: "150 150 170", w: 470, h: 590, resizable: false, component: load(() => import("../apps/Education"), "Education") },
  skills: { id: "skills", title: "Device Manager", label: "Skills", icon: "chip", accent: "60 180 100", w: 680, h: 580, component: load(() => import("../apps/Skills"), "Skills") },
  achievements: { id: "achievements", title: "Achievements", label: "Achievements", icon: "trophy", accent: "250 200 60", w: 920, h: 600, component: load(() => import("../apps/Achievements"), "Achievements") },
  certificates: { id: "certificates", title: "Certificates", label: "Certificates", icon: "certificates", accent: "230 90 70", w: 900, h: 600, component: load(() => import("../apps/Certificates"), "Certificates") },
  communities: { id: "communities", title: "Communities", label: "Communities", icon: "people", accent: "90 150 230", w: 900, h: 600, component: load(() => import("../apps/Communities"), "Communities") },
  pictures: { id: "pictures", title: "Pictures", label: "Photography", icon: "pictures", accent: "90 180 90", w: 900, h: 600, component: load(() => import("../apps/Pictures"), "Pictures") },
  photoviewer: { id: "photoviewer", title: "Photo Viewer", label: "Photo Viewer", icon: "pictures", accent: "90 160 230", w: 880, h: 640, component: load(() => import("../apps/PhotoViewer"), "PhotoViewer") },
  resume: { id: "resume", title: "Resume.pdf", label: "Résumé.pdf", icon: "pdf", accent: "225 60 50", w: 820, h: 700, component: load(() => import("../apps/Resume"), "Resume") },
  contact: { id: "contact", title: "New Message", label: "Contact Me", icon: "mail", accent: "90 150 235", w: 800, h: 580, component: load(() => import("../apps/Contact"), "Contact") },
  cmd: { id: "cmd", title: "Command Prompt", label: "Command Prompt", icon: "cmd", accent: "190 190 190", w: 700, h: 430, component: load(() => import("../apps/Cmd"), "Cmd") },
  bin: { id: "bin", title: "Recycle Bin", label: "Recycle Bin", icon: "binFull", accent: "150 180 210", w: 760, h: 480, component: load(() => import("../apps/RecycleBin"), "RecycleBin") },
  personalize: { id: "personalize", title: "Personalization", label: "Personalize", icon: "personalize", accent: "90 170 240", w: 840, h: 600, component: load(() => import("../apps/Personalize"), "Personalize") },
};

export const desktopOrder = [
  "about", "projects", "experience", "education", "skills", "achievements",
  "certificates", "communities", "pictures", "resume", "contact", "cmd", "bin",
];
