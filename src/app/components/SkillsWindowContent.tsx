import { useState } from "react";
import { Code, Database, Layout, Server, Smartphone, Wrench, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GlassCard } from "./GlassCard";
import { skillCategories } from "../../data/skills";
import type { SkillCategory } from "../../data/skills";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Layout, Server, Database, Code, Smartphone, Wrench,
};

const DELAYS = ["0s", "0.7s", "1.4s", "2.1s", "2.8s", "3.5s"];

function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[category.iconName] ?? Code;

  return (
    <GlassCard hover sweepDelay={DELAYS[index % DELAYS.length]}>
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.08]">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white">{category.title}</h3>
      </div>

      {/* Skill Pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {category.skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full bg-white/[0.07] border border-white/[0.12] text-sm text-white/85 hover:bg-white/[0.12] hover:border-white/20 transition-colors duration-200"
          >
            {skill.name}
          </span>
        ))}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center gap-1.5 text-xs font-medium text-blue-300/75 hover:text-blue-200 transition-colors duration-200 select-none"
      >
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="inline-flex"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.span>
        {expanded ? "Hide Levels" : "See Levels"}
      </button>

      {/* Collapsible progress bars */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="levels"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-4 mt-2 border-t border-white/[0.07]">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-white/55">{skill.name}</span>
                    <span className="text-xs text-white/35">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/[0.07] rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{
                        duration: 0.7,
                        delay: skillIndex * 0.05,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

export function SkillsWindowContent() {
  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold inline-block bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="mt-2 mx-auto h-0.5 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          <p className="text-white/50 text-sm mt-2">My expertise across different technologies</p>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
            >
              <SkillCategoryCard category={category} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <GlassCard padding="sm" className="!rounded-2xl">
            <div className="flex flex-wrap gap-6 text-sm justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
                <span className="text-white/65">Expert (85%+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-70" />
                <span className="text-white/65">Advanced (70–84%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full opacity-50" />
                <span className="text-white/65">Intermediate (50–69%)</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
