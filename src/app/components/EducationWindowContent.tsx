import { GraduationCap, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";
import { education } from "../../data/education";

export function EducationWindowContent() {
  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-1">
            <GraduationCap className="w-7 h-7 text-blue-300" />
            <h2 className="text-4xl font-bold inline-block bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Education
            </h2>
          </div>
          <div className="mt-2 mx-auto h-0.5 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          <p className="text-white/50 text-sm mt-2">My academic journey and qualifications</p>
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
              <GraduationCap className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-white font-semibold text-sm">{education.length}</span>
              <span className="text-white/55 text-sm">Degrees</span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Education Timeline */}
        <div className="space-y-5">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.12, ease: "easeOut" }}
            >
              <GlassCard padding="none" hover sweepDelay={`${index * 0.5}s`}>
                <div className="flex">
                  <div className="w-1 flex-shrink-0 bg-gradient-to-b from-blue-400 to-purple-400 rounded-l-3xl" />
                  <div className="p-6 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                        <div className="flex items-center gap-2 text-blue-200 text-sm font-medium">
                          <GraduationCap className="w-4 h-4" />
                          <span>{edu.institution}</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs border flex-shrink-0 ${
                          edu.status === "Final Year"
                            ? "bg-blue-500/30 border-blue-400/30 text-blue-200"
                            : "bg-green-500/30 border-green-400/30 text-green-200"
                        }`}
                      >
                        {edu.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-white/50 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.period}</span>
                    </div>
                    <p className="text-white/80 leading-relaxed text-sm">{edu.description}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
