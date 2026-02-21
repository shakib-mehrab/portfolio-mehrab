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
import { ExperienceWindowContent } from "./components/ExperienceWindowContent";
import { AwardsWindowContent } from "./components/AwardsWindowContent";
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
  UserCheck,
  Medal,
} from "lucide-react";

function getCenterPosition(width: number, height: number) {
  return {
    x: Math.max(10, Math.round((window.innerWidth - width) / 2)),
    y: Math.max(10, Math.round((window.innerHeight - 48 - height) / 2)),
  };
}

interface OpenWindow {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
  isMinimized: boolean;
}

export default function App() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>(() => [
    {
      id: "welcome",
      title: "Welcome",
      icon: <User className="w-4 h-4" />,
      content: <WelcomeWindowContent />,
      position: getCenterPosition(800, 500),
      size: { width: 800, height: 500 },
      isMaximized: false,
      isMinimized: false,
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
    {
      id: "experience",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 flex items-center justify-center shadow-lg">
          <UserCheck className="w-7 h-7 text-white drop-shadow-md" />
        </div>
      ),
      label: "Experience",
    },
    {
      id: "awards",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
          <Medal className="w-7 h-7 text-white drop-shadow-md" />
        </div>
      ),
      label: "Certifications",
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
        content: <AboutWindowContent />,
        position: { x: 150, y: 80 },
        size: { width: 900, height: 600 },
        isMaximized: false,
        isMinimized: false,
      },
      education: {
        title: "Education",
        icon: <GraduationCap className="w-4 h-4" />,
        content: <EducationWindowContent />,
        position: { x: 200, y: 100 },
        size: { width: 850, height: 600 },
        isMaximized: false,
        isMinimized: false,
      },
      skills: {
        title: "Skills",
        icon: <Code className="w-4 h-4" />,
        content: <SkillsWindowContent />,
        position: { x: 180, y: 90 },
        size: { width: 1000, height: 650 },
        isMaximized: false,
        isMinimized: false,
      },
      projects: {
        title: "Projects",
        icon: <Briefcase className="w-4 h-4" />,
        content: <ProjectsWindowContent />,
        position: { x: 160, y: 70 },
        size: { width: 1100, height: 700 },
        isMaximized: false,
        isMinimized: false,
      },
      achievements: {
        title: "Achievements",
        icon: <Trophy className="w-4 h-4" />,
        content: <AchievementsWindowContent />,
        position: { x: 220, y: 110 },
        size: { width: 900, height: 600 },
        isMaximized: false,
        isMinimized: false,
      },
      cocurriculars: {
        title: "Co-Curricular Activities",
        icon: <Award className="w-4 h-4" />,
        content: <CoCurricularsWindowContent />,
        position: { x: 190, y: 95 },
        size: { width: 900, height: 600 },
        isMaximized: false,
        isMinimized: false,
      },
      contact: {
        title: "Contact Me",
        icon: <Mail className="w-4 h-4" />,
        content: <ContactWindowContent />,
        position: { x: 170, y: 85 },
        size: { width: 950, height: 650 },
        isMaximized: false,
        isMinimized: false,
      },
      resume: {
        title: "Resume",
        icon: <FileText className="w-4 h-4" />,
        content: (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center backdrop-blur-xl bg-white/[0.05] border border-white/[0.08] rounded-3xl p-10 shadow-[0_0_35px_rgba(59,130,246,0.20)]">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-5 shadow-lg">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold inline-block bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-2">Resume</h3>
              <p className="text-white/60 mb-6 text-sm">Download my resume to learn more about my experience</p>
              <a
                href="/resume.pdf"
                download="Shakib_Mehrab_Resume.pdf"
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:-translate-y-0.5"
              >
                Download PDF
              </a>
            </div>
          </div>
        ),
        position: { x: 300, y: 150 },
        size: { width: 600, height: 400 },
        isMaximized: false,
        isMinimized: false,
      },
      recycle: {
        title: "Recycle Bin",
        icon: <Trash2 className="w-4 h-4" />,
        content: (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center backdrop-blur-xl bg-white/[0.05] border border-white/[0.08] rounded-3xl p-10 shadow-[0_0_35px_rgba(59,130,246,0.10)]">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center mx-auto mb-5 shadow-lg">
                <Trash2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white/80 mb-2">Recycle Bin</h3>
              <p className="text-white/45 text-sm">No items in the recycle bin</p>
            </div>
          </div>
        ),
        position: { x: 350, y: 180 },
        size: { width: 500, height: 400 },
        isMaximized: false,
        isMinimized: false,
      },
      experience: {
        title: "Experience",
        icon: <UserCheck className="w-4 h-4" />,
        content: <ExperienceWindowContent />,
        position: { x: 170, y: 80 },
        size: { width: 950, height: 650 },
        isMaximized: false,
        isMinimized: false,
      },
      awards: {
        title: "Certifications",
        icon: <Medal className="w-4 h-4" />,
        content: <AwardsWindowContent />,
        position: { x: 190, y: 100 },
        size: { width: 1050, height: 700 },
        isMaximized: false,
        isMinimized: false,
      },
    };

    const config = windowConfigs[iconId];
    if (config) {
      const newWindow: OpenWindow = {
        id: iconId,
        ...config,
        position: getCenterPosition(config.size.width, config.size.height),
      };
      
      // Remove welcome window and add new window in single state update
      const updatedWindows = iconId !== "welcome" 
        ? openWindows.filter((w) => w.id !== "welcome")
        : openWindows;
      
      setOpenWindows([...updatedWindows, newWindow]);
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

  const minimizeWindow = (windowId: string) => {
    setOpenWindows(
      openWindows.map((w) =>
        w.id === windowId ? { ...w, isMinimized: true } : w
      )
    );
  };

  const restoreWindow = (windowId: string) => {
    setOpenWindows(
      openWindows.map((w) =>
        w.id === windowId ? { ...w, isMinimized: false } : w
      )
    );
    setActiveWindowId(windowId);
  };

  const handleTaskbarClick = (windowId: string) => {
    const window = openWindows.find((w) => w.id === windowId);
    if (window?.isMinimized) {
      restoreWindow(windowId);
    } else {
      setActiveWindowId(windowId);
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-desktop">
      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 opacity-40 bg-ambient-overlay" />

      {/* Decorative floating elements — reference_style inspired - hidden on mobile */}
      <div className="hidden md:block absolute top-1/4 right-[12%] w-56 h-56 border border-blue-500/10 rounded-full pointer-events-none animate-orbit" />
      <div className="hidden md:block absolute bottom-1/3 left-[30%] w-36 h-36 border border-purple-500/10 rounded-lg rotate-12 pointer-events-none" />
      <div className="hidden md:block absolute top-[12%] right-[35%] w-2 h-2 bg-blue-400/60 rounded-full pointer-events-none animate-float" />
      <div className="hidden md:block absolute top-[60%] right-[8%] w-1.5 h-1.5 bg-purple-400/60 rounded-full pointer-events-none animate-float-slow" />
      <div className="hidden md:block absolute top-[35%] left-[40%] w-1 h-1 bg-cyan-400/50 rounded-full pointer-events-none animate-pulse" />
      <div className="hidden md:block absolute bottom-[20%] right-[25%] w-1.5 h-1.5 bg-blue-300/40 rounded-full pointer-events-none animate-pulse delay-pulse-1s" />

      {/* Welcome Message - Transparent Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="text-center max-w-4xl px-6 md:px-8">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 opacity-[0.12] text-cyan-200 whitespace-nowrap"
            style={{ 
              fontFamily: '"Quantico", sans-serif',
              textShadow: '0 0 30px rgba(34, 211, 238, 0.15), 0 0 60px rgba(59, 130, 246, 0.1), 0 0 90px rgba(147, 51, 234, 0.08)'
            }}
          >
            Welcome to My Portfolio
          </h1>
          <p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-[0.11] text-blue-200 leading-relaxed"
            style={{ 
              fontFamily: '"Quantico", sans-serif',
              textShadow: '0 0 25px rgba(59, 130, 246, 0.12), 0 0 50px rgba(34, 211, 238, 0.08)'
            }}
          >
            To explore, click any of the icons on the desktop menu
          </p>
          <p 
            className="text-xs sm:text-sm md:text-base lg:text-lg opacity-[0.09] text-purple-200/80 leading-relaxed px-4"
            style={{ 
              fontFamily: '"Quantico", sans-serif',
              fontStyle: 'italic',
              textShadow: '0 0 20px rgba(147, 51, 234, 0.1), 0 0 40px rgba(59, 130, 246, 0.06)'
            }}
          >
            Inspired by the nostalgia of Windows 7—my childhood desktop theme that sparked my love for technology. This portfolio brings back those cherished memories.
          </p>
        </div>
      </div>

      {/* Desktop Icons — 2-col grid on desktop, hidden on mobile (use Start Menu instead) */}
      <div className="hidden md:grid absolute top-4 left-3 z-10 grid-cols-2 gap-1 content-start overflow-y-auto overflow-x-hidden scrollbar-none desktop-icons-grid">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => openWindow(icon.id)}
            isOpen={activeWindowId === icon.id}
          />
        ))}
      </div>

      {/* Windows */}
      {openWindows
        .filter((window) => !window.isMinimized)
        .map((window, index) => (
        <AeroWindow
          key={window.id}
          title={window.title}
          icon={window.icon}
          defaultPosition={window.position}
          defaultSize={window.size}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
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
        onWindowClick={handleTaskbarClick}
        onStartMenuItemClick={(item) => openWindow(item)}
      />
    </div>
  );
}