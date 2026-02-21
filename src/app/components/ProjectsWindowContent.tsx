import { useState } from "react";
import { ExternalLink, Github, Code2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { projects, learningProjects } from "../../data/projects";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [showAllTech, setShowAllTech] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const visibleTech = showAllTech ? project.technologies : project.technologies.slice(0, 3);
  const hasMoreTech = project.technologies.length > 3;
  
  // Check if description is long enough to need expansion
  const isLongDescription = project.description.length > 120;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="flex flex-col group"
    >
      {/* Glassmorphism Card with full background image */}
      <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:-translate-y-2">
        {/* Glowing Border Effect */}
        <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-blue-400/40 via-purple-400/40 to-cyan-400/40 group-hover:from-blue-400/60 group-hover:via-purple-400/60 group-hover:to-cyan-400/60 transition-all duration-500 animate-pulse-slow">
          <div className="absolute inset-0 rounded-3xl bg-black/20 backdrop-blur-sm" />
        </div>

        {/* Background Image */}
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-cyan-500/30" />
        )}
        
        {/* Gradient Overlay - Dark at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 transition-opacity duration-500 group-hover:via-black/30 group-hover:to-black/85" />
        
        {/* Continuous Light Sweep Animation - Always active */}
        <div 
          className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
          style={{
            animation: 'sweep 4s linear infinite',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.05) 60%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
        />
        
        {/* Category Badge - Top Right */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-lg transition-all duration-300 group-hover:bg-black/60 group-hover:border-white/30">
          {project.category}
        </div>

        {/* Frosted Glass Content Area - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-xl bg-gradient-to-t from-black/60 via-black/40 to-transparent border-t border-white/10 transition-all duration-500 group-hover:backdrop-blur-2xl group-hover:from-black/70 group-hover:via-black/50">
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 font-bangla drop-shadow-lg transition-all duration-300 group-hover:text-blue-100">
            {project.title}
          </h3>
          
          {/* Description */}
          <div className="mb-3">
            <p className={`text-white/90 text-sm leading-relaxed drop-shadow transition-all duration-300 group-hover:text-white ${!showFullDescription && isLongDescription ? 'line-clamp-2' : ''}`}>
              {project.description}
            </p>
            {isLongDescription && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-xs text-blue-300 hover:text-blue-200 transition-colors duration-200 mt-1 font-medium"
              >
                {showFullDescription ? "Show Less" : "See More"}
              </button>
            )}
          </div>

          {/* Tech Pills */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              <AnimatePresence mode="popLayout">
                {visibleTech.map((tech) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs text-white font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-200"
                  >
                    {tech}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
            {hasMoreTech && (
              <button
                onClick={() => setShowAllTech(!showAllTech)}
                className="flex items-center gap-1 text-xs text-blue-300 hover:text-blue-200 transition-colors duration-200 mt-2 font-medium"
              >
                <motion.span
                  animate={{ rotate: showAllTech ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <ChevronDown className="w-3 h-3" />
                </motion.span>
                {showAllTech ? "Show Less" : `+${project.technologies.length - 3} More`}
              </button>
            )}
          </div>

          {/* Action Buttons with Frosted Glass */}
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium rounded-xl hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            {project.liveUrl && project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500/80 to-cyan-500/80 backdrop-blur-md border border-blue-400/50 text-white text-sm font-medium rounded-xl hover:from-blue-500 hover:to-cyan-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* CSS for animations */}
        <style>{`
          @keyframes sweep {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          
          @keyframes pulse-slow {
            0%, 100% {
              opacity: 0.6;
            }
            50% {
              opacity: 1;
            }
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </motion.div>
  );
}

export function ProjectsWindowContent() {
  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-6xl mx-auto space-y-10">
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

        {/* Main Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
          ))}
        </div>

        {/* Learning Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6 mt-12"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold inline-block bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Learning Projects
            </h3>
            <div className="mt-2 mx-auto h-0.5 w-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full" />
            <p className="text-white/40 text-sm mt-2">Basic fullstack development practice projects</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {learningProjects.map((project, index) => (
              <ProjectCard key={`learning-${project.title}-${index}`} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
