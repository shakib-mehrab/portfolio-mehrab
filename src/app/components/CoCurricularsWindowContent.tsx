import { Users, Cpu, Heart, Link, BookOpen, PenLine, Calendar, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";
import { cocurriculars } from "../../data/cocurriculars";

const iconMap: Record<string, LucideIcon> = {
  Users, Cpu, Heart, Link, BookOpen, PenLine,
};

const DELAYS = ["0s", "0.6s", "1.2s", "1.8s", "2.4s", "3.0s"];

export function CoCurricularsWindowContent() {
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
            <Users className="w-7 h-7 text-blue-300" />
            <h2 className="text-4xl font-bold inline-block bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Co-Curricular Activities
            </h2>
          </div>
          <div className="mt-2 mx-auto h-0.5 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          <p className="text-white/50 text-sm mt-2">Leadership roles and community involvement</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="flex justify-center"
        >
          <GlassCard padding="sm" className="!rounded-2xl" sweepDelay="0.2s">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-white font-semibold text-sm">{cocurriculars.length}</span>
              <span className="text-white/55 text-sm">Activities</span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cocurriculars.map((activity, index) => {
            const Icon = iconMap[activity.iconName] ?? Users;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.09, ease: "easeOut" }}
              >
                <GlassCard hover padding="none" sweepDelay={DELAYS[index % DELAYS.length]}>
                  <div className="flex">
                    {/* Left accent bar */}
                    <div className="w-1 flex-shrink-0 bg-gradient-to-b from-blue-400 to-purple-400 rounded-l-3xl" />
                    <div className="p-5 flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold leading-tight">{activity.title}</h3>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-blue-500/20 border border-blue-400/25 text-blue-200">
                            {activity.role}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs text-white/40 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{activity.organization}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{activity.period}</span>
                        </div>
                      </div>

                      <p className="text-white/65 text-sm leading-relaxed">{activity.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
