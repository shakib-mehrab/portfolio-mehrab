import { useState } from "react";
import { AeroWindow } from "./components/AeroWindow";
import { DesktopIcon } from "./components/DesktopIcon";
import { Taskbar } from "./components/Taskbar";
import { WelcomeWindowContent } from "./components/WelcomeWindowContent";
import { AboutWindowContent } from "./components/AboutWindowContent";
import { EducationWindowContent } from "./components/EducationWindowContent";
import { SkillsWindowContent } from "./components/SkillsWindowContent";
import { ProjectsWindowContent } from "./components/ProjectsWindowContent";
import { AchievementsWindowContent } from "./components/AchievementsWindowContent";
import { CoCurricularsWindowContent } from "./components/CoCurricularsWindowContent";
import { ContactWindowContent } from "./components/ContactWindowContent";
import {
  User,
  GraduationCap,
  Code,
  Briefcase,
  Trophy,
  Award,
  Mail,
  FileText,
  Trash2,
} from "lucide-react";

interface OpenWindow {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
}

export default function App() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([
    {
      id: "welcome",
      title: "Welcome",
      icon: <User className="w-4 h-4" />,
      content: (
        <WelcomeWindowContent profileImage="https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzE1ODE3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080" />
      ),
      position: { x: 250, y: 100 },
      size: { width: 800, height: 500 },
      isMaximized: false,
    },
  ]);

  const [activeWindowId, setActiveWindowId] = useState<string>("welcome");

  const desktopIcons = [
    {
      id: "about",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
          <User className="w-7 h-7 text-white drop-shadow-md" />
        </div>
      ),
      label: "About Me",
    },
    {
      id: "education",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
          <GraduationCap className="w-7 h-7 text-white drop-shadow-md" />
        </div>
      ),
      label: "Education",
    },
    {
      id: "skills",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center shadow-lg">
          <Code className="w-7 h-7 text-white drop-shadow-md" />
        </div>
      ),
      label: "Skills",
    },
    {
      id: "projects",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
          <Briefcase className="w-7 h-7 text-white drop-shadow-md" />
        </div>
      ),
      label: "Projects",
    },
    {
      id: "achievements",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
          <Trophy className="w-7 h-7 text-white drop-shadow-md" />
        </div>
      ),
      label: "Achievements",
    },
    {
      id: "cocurriculars",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <Award className="w-7 h-7 text-white drop-shadow-md" />
        </div>
      ),
      label: "Co-Curriculars",
    },
    {
      id: "contact",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 via-red-500 to-red-600 flex items-center justify-center shadow-lg">
          <Mail className="w-7 h-7 text-white drop-shadow-md" />
        </div>
      ),
      label: "Contact Me",
    },
    {
      id: "resume",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg">
          <FileText className="w-7 h-7 text-white drop-shadow-md" />
        </div>
      ),
      label: "Resume",
    },
    {
      id: "recycle",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 flex items-center justify-center shadow-lg">
          <Trash2 className="w-7 h-7 text-white drop-shadow-md" />
        </div>
      ),
      label: "Recycle Bin",
    },
  ];

  const openWindow = (iconId: string) => {
    // Check if window is already open
    const existingWindow = openWindows.find((w) => w.id === iconId);
    if (existingWindow) {
      setActiveWindowId(iconId);
      return;
    }

    const windowConfigs: { [key: string]: Omit<OpenWindow, "id"> } = {
      about: {
        title: "About Me",
        icon: <User className="w-4 h-4" />,
        content: (
          <AboutWindowContent profileImage="https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzE1ODE3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080" />
        ),
        position: { x: 150, y: 80 },
        size: { width: 900, height: 600 },
        isMaximized: false,
      },
      education: {
        title: "Education",
        icon: <GraduationCap className="w-4 h-4" />,
        content: <EducationWindowContent />,
        position: { x: 200, y: 100 },
        size: { width: 850, height: 600 },
        isMaximized: false,
      },
      skills: {
        title: "Skills",
        icon: <Code className="w-4 h-4" />,
        content: <SkillsWindowContent />,
        position: { x: 180, y: 90 },
        size: { width: 1000, height: 650 },
        isMaximized: false,
      },
      projects: {
        title: "Projects",
        icon: <Briefcase className="w-4 h-4" />,
        content: <ProjectsWindowContent />,
        position: { x: 160, y: 70 },
        size: { width: 1100, height: 700 },
        isMaximized: false,
      },
      achievements: {
        title: "Achievements",
        icon: <Trophy className="w-4 h-4" />,
        content: <AchievementsWindowContent />,
        position: { x: 220, y: 110 },
        size: { width: 900, height: 600 },
        isMaximized: false,
      },
      cocurriculars: {
        title: "Co-Curricular Activities",
        icon: <Award className="w-4 h-4" />,
        content: <CoCurricularsWindowContent />,
        position: { x: 190, y: 95 },
        size: { width: 900, height: 600 },
        isMaximized: false,
      },
      contact: {
        title: "Contact Me",
        icon: <Mail className="w-4 h-4" />,
        content: <ContactWindowContent />,
        position: { x: 170, y: 85 },
        size: { width: 950, height: 650 },
        isMaximized: false,
      },
      resume: {
        title: "Resume",
        icon: <FileText className="w-4 h-4" />,
        content: (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="text-center">
              <FileText className="w-20 h-20 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Resume</h3>
              <p className="text-gray-600 mb-4">Download my resume to learn more</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Download PDF
              </button>
            </div>
          </div>
        ),
        position: { x: 300, y: 150 },
        size: { width: 600, height: 400 },
        isMaximized: false,
      },
      recycle: {
        title: "Recycle Bin",
        icon: <Trash2 className="w-4 h-4" />,
        content: (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="text-center">
              <Trash2 className="w-20 h-20 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Recycle Bin</h3>
              <p className="text-gray-600">No items in the recycle bin</p>
            </div>
          </div>
        ),
        position: { x: 350, y: 180 },
        size: { width: 500, height: 400 },
        isMaximized: false,
      },
    };

    const config = windowConfigs[iconId];
    if (config) {
      const newWindow: OpenWindow = {
        id: iconId,
        ...config,
      };
      setOpenWindows([...openWindows, newWindow]);
      setActiveWindowId(iconId);
    }
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter((w) => w.id !== windowId));
    if (activeWindowId === windowId) {
      const remainingWindows = openWindows.filter((w) => w.id !== windowId);
      setActiveWindowId(remainingWindows.length > 0 ? remainingWindows[0].id : "");
    }
  };

  const toggleMaximize = (windowId: string) => {
    setOpenWindows(
      openWindows.map((w) =>
        w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  };

  return (
    <div
      className="size-full relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top, #1e3a8a 0%, #312e81 25%, #1e1b4b 50%, #0f172a 75%, #020617 100%)",
      }}
    >
      {/* Cosmic animated overlay */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)",
          filter: "blur(60px)",
        }}
      />

      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => openWindow(icon.id)}
          />
        ))}
      </div>

      {/* Windows */}
      {openWindows.map((window, index) => (
        <AeroWindow
          key={window.id}
          title={window.title}
          icon={window.icon}
          defaultPosition={window.position}
          defaultSize={window.size}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => {
            /* Minimize functionality */
          }}
          onMaximize={() => toggleMaximize(window.id)}
          isActive={activeWindowId === window.id}
          onFocus={() => setActiveWindowId(window.id)}
          zIndex={activeWindowId === window.id ? 100 : 10 + index}
          isMaximized={window.isMaximized}
        >
          {window.content}
        </AeroWindow>
      ))}

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows.map((w) => ({
          id: w.id,
          title: w.title,
          icon: w.icon,
        }))}
        activeWindow={activeWindowId}
        onWindowClick={(id) => setActiveWindowId(id)}
        onStartMenuItemClick={(item) => openWindow(item)}
      />
    </div>
  );
}