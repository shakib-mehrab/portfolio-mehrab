import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  GraduationCap,
  Award,
  Mail,
  FileText,
  Trash2,
  Power,
  Search,
  ChevronRight,
  Settings,
  HardDrive,
  FolderOpen,
  Code,
  Trophy,
  Briefcase,
  UserCheck,
  Medal,
} from "lucide-react";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuItemClick: (item: string) => void;
}

export function StartMenu({ isOpen, onClose, onMenuItemClick }: StartMenuProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const leftMenuItems = [
    { icon: <User className="w-5 h-5" />, label: "About Me", id: "about" },
    { icon: <GraduationCap className="w-5 h-5" />, label: "Education", id: "education" },
    { icon: <Code className="w-5 h-5" />, label: "Skills", id: "skills" },
    { icon: <Briefcase className="w-5 h-5" />, label: "Projects", id: "projects" },
    { icon: <Trophy className="w-5 h-5" />, label: "Achievements", id: "achievements" },
    { icon: <Award className="w-5 h-5" />, label: "Co-Curriculars", id: "cocurriculars" },
    { icon: <Mail className="w-5 h-5" />, label: "Contact Me", id: "contact" },
    { icon: <UserCheck className="w-5 h-5" />, label: "Experience", id: "experience" },
    { icon: <Medal className="w-5 h-5" />, label: "Certifications", id: "awards" },
  ];

  const rightMenuItems = [
    { icon: <HardDrive className="w-5 h-5" />, label: "My Computer" },
    { icon: <FolderOpen className="w-5 h-5" />, label: "Documents" },
    { icon: <Settings className="w-5 h-5" />, label: "Control Panel" },
    { icon: <FileText className="w-5 h-5" />, label: "Resume" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          {/* Start Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-12 left-0 md:left-0 right-0 md:right-auto z-50 md:w-[520px] w-full md:h-[580px] h-[calc(100vh-3rem)] rounded-none md:rounded-tr-lg shadow-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(to bottom, rgba(242, 244, 247, 0.95), rgba(232, 234, 237, 0.95))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            {/* User Profile Section */}
            <div className="h-12 md:h-14 bg-gradient-to-b from-[rgba(169,207,241,0.5)] to-transparent px-3 md:px-4 flex items-center gap-2 md:gap-3 border-b border-white/50">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-lg">
                <User className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="font-semibold text-sm md:text-base text-gray-800">Mehrab Hossain Shakib</span>
            </div>

            {/* Menu Content */}
            <div className="flex flex-col md:flex-row h-[calc(100%-9rem)] md:h-[calc(100%-112px)]">
              {/* Left Column - Programs */}
              <div className="flex-1 bg-white/40 backdrop-blur-sm p-2 overflow-y-auto">
                <div className="space-y-0.5">
                  {leftMenuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onMenuItemClick(item.id);
                        onClose();
                      }}
                      className="w-full flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 rounded hover:bg-blue-500/20 hover:shadow-sm transition-all group"
                    >
                      <div className="text-blue-600 group-hover:text-blue-700 flex-shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column - System - hidden on small mobile */}
              <div className="hidden sm:block w-full sm:w-52 p-2 border-t sm:border-t-0 sm:border-l border-white/40 overflow-y-auto">
                <div className="space-y-0.5">
                  {rightMenuItems.map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between gap-2 px-2 md:px-3 py-2 rounded hover:bg-blue-500/20 transition-all group"
                    >
                      <div className="flex items-center gap-2">
                        <div className="text-blue-600 group-hover:text-blue-700 flex-shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-800">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-gray-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="h-10 md:h-12 bg-gradient-to-r from-[rgba(169,207,241,0.4)] to-[rgba(138,186,230,0.4)] backdrop-blur-md px-3 md:px-4 flex items-center gap-2 border-t border-white/50">
              <Search className="w-3 h-3 md:w-4 md:h-4 text-gray-600 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search programs and files"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-white/60 border border-gray-300 rounded px-2 py-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
              />
            </div>

            {/* Shutdown Section */}
            <div className="h-10 md:h-11 bg-gradient-to-b from-[rgba(169,207,241,0.6)] to-[rgba(138,186,230,0.6)] backdrop-blur-md px-3 md:px-4 flex items-center justify-end border-t border-white/50">
              <button className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 rounded hover:bg-red-500/20 transition-all group">
                <Power className="w-3 h-3 md:w-4 md:h-4 text-red-600 group-hover:text-red-700" />
                <span className="text-xs md:text-sm font-medium text-gray-800">Shut down</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
