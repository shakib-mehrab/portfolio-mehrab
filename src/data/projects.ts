export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

export const projects: Project[] = [
  {
    title: "AI-Powered Task Manager",
    description:
      "Smart task management application using machine learning to predict task duration and optimize scheduling. Features real-time collaboration, productivity analytics, and AI-driven priority suggestions.",
    technologies: ["Next.js", "TypeScript", "Python", "TensorFlow", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#",
    category: "AI / Full Stack",
  },
  {
    title: "Real-time Collaboration Platform",
    description:
      "Secure team collaboration platform with end-to-end encrypted messaging, file sharing, live document editing, and video calling. Supports workspaces and per-channel permissions.",
    technologies: ["React", "Socket.io", "Node.js", "WebRTC", "Redis"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Full Stack",
  },
  {
    title: "E-Commerce Mobile App",
    description:
      "Full-featured mobile marketplace with vendor management, Stripe payment processing, push notifications, and real-time inventory tracking. Available on iOS and Android.",
    technologies: ["React Native", "Node.js", "MongoDB", "Stripe", "Firebase"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Mobile",
  },
  {
    title: "Weather Analytics Dashboard",
    description:
      "Comprehensive weather analytics platform with historical data visualisation, forecast models, and location-based alerts. Integrates multiple weather APIs with custom aggregation.",
    technologies: ["React", "TypeScript", "Recharts", "FastAPI", "PostgreSQL"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Data / Frontend",
  },
  {
    title: "Social Media Analytics Tool",
    description:
      "Cross-platform analytics solution for tracking engagement, follower growth, and content performance. Automated PDF reporting and competitor benchmarking built in.",
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "Chart.js"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Analytics",
  },
  {
    title: "Code Snippet Manager",
    description:
      "Developer productivity tool for saving, tagging, and sharing code snippets with syntax highlighting for 50+ languages. Supports team collections and public sharing.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Dev Tool",
  },
];
