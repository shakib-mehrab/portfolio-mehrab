import { ExternalLink, Github, Code2 } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";
import { projects } from "../../data/projects";

const DELAYS = ["0s", "0.4s", "0.8s", "1.2s", "1.6s", "2.0s"];

export function ProjectsWindowContent() {
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
          <div className="flex items-center justify-center gap-3 mb-1">
            <Code2 className="w-7 h-7 text-blue-300" />
            <h2 className="text-4xl font-bold inline-block bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Projects
            </h2>
          </div>
          <div className="mt-2 mx-auto h-0.5 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          <p className="text-white/50 text-sm mt-2">Showcase of my recent work and contributions</p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className="flex flex-col"
            >
              <GlassCard
                padding="none"
                hover
                sweepDelay={DELAYS[index % DELAYS.length]}
                className="flex flex-col flex-1"
              >
                {/* Banner: project screenshot if available, else gradient */}
                <div className="relative h-32 overflow-hidden rounded-t-3xl flex-shrink-0">
                  {project.image ? (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                          (e.currentTarget.nextElementSibling as HTMLElement | null)?.classList.remove("hidden");
                        }}
                      />
                      {/* Gradient fallback shown if image errors */}
                      <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-500/25 to-purple-500/25 flex items-center justify-center">
                        <Code2 className="w-12 h-12 text-white/[0.15]" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/25 to-purple-500/25 flex items-center justify-center">
                      <Code2 className="w-12 h-12 text-white/[0.15]" />
                    </div>
                  )}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent pointer-events-none" />
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs bg-black/30 border border-white/10 text-white/60">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full bg-white/[0.07] border border-white/[0.12] text-xs text-white/65 hover:text-white hover:border-white/25 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.07] border border-white/[0.10] text-white/65 text-xs rounded-xl hover:bg-white/[0.14] hover:text-white hover:border-white/20 transition-all duration-200"
                      >
                        <Github className="w-3 h-3" />
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border border-blue-400/20 text-white/90 text-xs rounded-xl hover:from-blue-500/50 hover:to-cyan-500/50 hover:shadow-[0_0_14px_rgba(59,130,246,0.3)] transition-all duration-200"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live Demo
                      </a>
                    )}
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
