import { useState } from "react";
import { Users, Video, Camera, Palette, Mic, Calendar, Briefcase, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GlassCard } from "./GlassCard";
import { workExperience, leadershipRoles, organizingRoles, additionalSkills } from "../../data/experience";

const iconMap: Record<string, LucideIcon> = { Video, Camera, Palette, Mic };

type Tab = "work" | "leadership" | "organizing" | "additional";

const DELAYS = ["0s", "0.5s", "1.0s", "1.5s", "2.0s"];

export function ExperienceWindowContent() {
  const [activeTab, setActiveTab] = useState<Tab>("work");

  const tabs: { id: Tab; label: string }[] = [
    { id: "work", label: "Work Experience" },
    { id: "leadership", label: "Leadership" },
    { id: "organizing", label: "Organizing" },
    { id: "additional", label: "Additional Skills" },
  ];

  const roles = activeTab === "work" ? workExperience : activeTab === "leadership" ? leadershipRoles : organizingRoles;

  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-1">
            <Briefcase className="w-7 h-7 text-blue-300" />
            <h2 className="text-4xl font-bold inline-block bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Experience
            </h2>
          </div>
          <div className="mt-2 mx-auto h-0.5 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          <p className="text-white/50 text-sm mt-2">Work experience, leadership, organizing, and additional expertise</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex gap-2 flex-wrap"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 border-transparent text-white shadow-[0_0_16px_rgba(59,130,246,0.35)]"
                  : "bg-white/[0.05] border-white/[0.08] text-white/55 hover:bg-white/[0.10] hover:text-white/90 hover:border-white/15"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {(activeTab === "work" || activeTab === "leadership" || activeTab === "organizing") && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-300" />
                <span className="text-white/50 text-sm">
                  {activeTab === "work" ? `${workExperience.length} Projects` : activeTab === "leadership" ? `${leadershipRoles.length} Roles` : `${organizingRoles.length} Events`}
                </span>
              </div>
              {roles.map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
                >
                  <GlassCard hover padding="none" sweepDelay={DELAYS[index % DELAYS.length]}>
                    <div className="flex">
                      <div className="w-1 flex-shrink-0 bg-gradient-to-b from-blue-400 to-purple-400 rounded-l-3xl" />
                      <div className="p-5 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-white font-semibold">{role.title}</h3>
                              {role.link && (
                                <a
                                  href={role.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-blue-300 hover:text-blue-200 transition-colors duration-200"
                                  aria-label={`Visit ${role.title}`}
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                            <p className="text-blue-200 text-sm">{role.organization}</p>
                          </div>
                          <div className="flex items-center gap-1 text-white/40 text-xs flex-shrink-0">
                            <Calendar className="w-3 h-3" />
                            <span>{role.period}</span>
                          </div>
                        </div>
                        <p className="text-white/65 text-sm leading-relaxed">{role.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "additional" && (
            <motion.div
              key="additional"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-4 h-4 text-blue-300" />
                <span className="text-white/50 text-sm">{additionalSkills.length} Skill Areas</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {additionalSkills.map((skillGroup, index) => {
                  const Icon = iconMap[skillGroup.iconName] ?? Palette;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
                    >
                      <GlassCard hover sweepDelay={DELAYS[index % DELAYS.length]}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${skillGroup.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-white font-semibold">{skillGroup.category}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.tools.map((tool, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full bg-white/[0.07] border border-white/[0.12] text-sm text-white/75 hover:text-white hover:border-white/20 transition-colors duration-200"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
