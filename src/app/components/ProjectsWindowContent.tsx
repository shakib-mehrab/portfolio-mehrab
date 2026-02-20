import { ExternalLink, Github, Code2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export function ProjectsWindowContent() {
  const projects: Project[] = [
    {
      title: "DeFi Trading Platform",
      description:
        "A decentralized finance platform for trading crypto assets with automated market making and liquidity pools. Built with Solidity smart contracts and React frontend.",
      image:
        "https://images.unsplash.com/photo-1700619663094-be321751b545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBzZXR1cHxlbnwxfHx8fDE3NzE0ODYxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      technologies: ["React", "Solidity", "Web3.js", "Ethereum", "Tailwind CSS"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      title: "AI-Powered Task Manager",
      description:
        "Smart task management application that uses machine learning to predict task duration and optimize scheduling. Features real-time collaboration and productivity analytics.",
      image:
        "https://images.unsplash.com/photo-1700619663094-be321751b545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBzZXR1cHxlbnwxfHx8fDE3NzE0ODYxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      technologies: ["Next.js", "TypeScript", "Python", "TensorFlow", "MongoDB"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      title: "Social Media Analytics Dashboard",
      description:
        "Comprehensive analytics platform for tracking social media performance across multiple platforms. Real-time data visualization and automated reporting features.",
      image:
        "https://images.unsplash.com/photo-1700619663094-be321751b545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBzZXR1cHxlbnwxfHx8fDE3NzE0ODYxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      technologies: ["React", "Node.js", "Express", "PostgreSQL", "Recharts"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      title: "E-Commerce Marketplace",
      description:
        "Full-featured online marketplace with vendor management, payment processing, inventory tracking, and customer reviews. Mobile-responsive design.",
      image:
        "https://images.unsplash.com/photo-1700619663094-be321751b545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBzZXR1cHxlbnwxfHx8fDE3NzE0ODYxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      technologies: ["React", "Redux", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      title: "Real-Time Chat Application",
      description:
        "Secure messaging platform with end-to-end encryption, file sharing, and video calling capabilities. Supports group chats and custom emojis.",
      image:
        "https://images.unsplash.com/photo-1700619663094-be321751b545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBzZXR1cHxlbnwxfHx8fDE3NzE0ODYxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      technologies: ["React", "Socket.io", "Node.js", "WebRTC", "Redis"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      title: "Portfolio Management System",
      description:
        "Investment portfolio tracker with real-time stock data, performance analytics, and risk assessment. Includes automated trading alerts.",
      image:
        "https://images.unsplash.com/photo-1700619663094-be321751b545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBzZXR1cHxlbnwxfHx8fDE3NzE0ODYxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      technologies: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL"],
      githubUrl: "#",
    },
  ];

  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-gradient-to-r from-green-500/30 to-blue-500/30 text-white rounded-lg p-6 shadow-lg mb-6 border border-white/30">
          <div className="flex items-center gap-3 mb-2">
            <Code2 className="w-8 h-8" />
            <h2 className="text-3xl font-bold drop-shadow-lg">Projects</h2>
          </div>
          <p className="text-green-100 drop-shadow-md">Showcase of my recent work and contributions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/20 rounded-lg shadow-md overflow-hidden border border-white/30 hover:shadow-xl transition-shadow"
            >
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">{project.title}</h3>
                <p className="text-white/80 text-sm mb-4 leading-relaxed drop-shadow-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 backdrop-blur-md bg-blue-500/30 text-white text-xs font-medium rounded border border-white/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className="flex items-center gap-1 px-3 py-1.5 backdrop-blur-md bg-gray-700/40 text-white text-sm rounded hover:bg-gray-700/60 transition-colors border border-white/30"
                    >
                      <Github className="w-3 h-3" />
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="flex items-center gap-1 px-3 py-1.5 backdrop-blur-md bg-blue-500/40 text-white text-sm rounded hover:bg-blue-500/60 transition-colors border border-white/30"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}