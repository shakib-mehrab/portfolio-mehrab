export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  /** Optional project screenshot, e.g. "/images/projects/ai-task-manager.jpg" */
  image?: string;
}

export const projects: Project[] = [
  {
    title: "পথিক (Pathik) - A Bangladesh Travel Companion",
    description:
      "A comprehensive Progressive Web App (PWA) for exploring Bangladesh - Metro stations, Restaurants, Hotels, Markets, and Travel information.",
    technologies: ["React", "TypeScript", "Firebase", "Nodejs"],
    githubUrl: "https://github.com/shakib-mehrab/pothik",
    liveUrl: "https://pathik-db6ee.web.app/",
    category: "Full Stack",
    image: "images/projects/pathik.png",
  },
  {
    title: "Momentum - AI-Powered Student Productivity Assistant",
    description:
      "An intelligent productivity platform that helps students organize academics, skills, and finances with AI-powered insights and personalized planning. This project is a group project built with 3 other developers as part of the SOLVIO Ai Hackthon 2025. I primarily worked on the Frontend, backend, implementing the AI-driven recommendation engine.",
    technologies: [
  "PERN", 
  "ChromaDB", 
  "TypeScript (Strict)",
  "TailwindCSS",
  "shadcn/ui",
  "Prisma ORM",
  "Python 3.11 (FastAPI)",
  "LangChain",
  "Docker & Compose"
],
    githubUrl: "https://github.com/Hackovate/momentum",
    liveUrl: "https://momentum-gemini.vercel.app/",
    category: "Ai | Full Stack",
    image: "images/projects/momentum.png",
  },
  {
    title: "TuitionTrack - A Tuition Management Web App",
    description:
      "A full-stack web application designed to streamline tuition management for students and tutors. Features include scheduling, payment tracking, and progress monitoring, built with Next.js, Firebase, and TypeScript.",
    technologies: ["Next.js", "TypeScript", "Firebase"],
    githubUrl: "https://github.com/shakib-mehrab/tutiontrack",
    liveUrl: "https://tutiontrack-tjdu.vercel.app/",
    category: "Full Stack",
    image: "images/projects/tuitionTrack.png",
  },
  {
    title: "ZeroWaste - A Sustainable Food Assistant",
    description:
      "ZeroWaste is a food waste management web app helping users track food inventory, log consumption, and access sustainability resources. It aims to reduce household food waste through intelligent tracking and insights. This a group project built with 3 other developers as part of the BUBT INNOVATEX Hackathon 2025. I primarily worked on the Frotnend and backend.",
    technologies: [
  "Next.js",
  "React",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "Prisma ORM",
  "JWT",
  "Argon2",
  "Zod",
  "ImageKit",
  "Helmet",
],
    githubUrl: "https://github.com/Hackovate/ZeroWaste",
    liveUrl: "https://zero-waste-xi.vercel.app/",
    category: "Ai / Fullstack",
    image: "images/projects/zeroWaste.png",
  },
  {
    title: "Stellar Tales - Interactive Space Weather Education Platform",
    description:
      "An engaging digital children's story app that explains space weather using real-time NASA and NOAA data with friendly visuals and interactive learning experiences. This is a group project built with 2 other developers as part of the NASA Space Apps Challenge 2025. I primarily worked on the System design, Frontend and backend.",
    technologies: ["React", "Node.js", "Express"],
    githubUrl: "https://github.com/Hackovate/steller-tales",
    liveUrl: "https://steller-tales.vercel.app/",
    category: "Full Stack",
    image: "images/projects/stellarTales.svg",
  },
  {
    title: "CSE Society - Club Management System",
    description:
      "This is a full-stack web application to manage the CSE Society activities for Comilla University's Computer Science and Engineering Department.This project can be scalable for any university club management. It includes features like event scheduling, member management, and announcement posting.",
    technologies: ["MERN",],
    githubUrl: "https://github.com/shakib-mehrab/csesociety",
    liveUrl: "#",
    category: "Full Stack",
    image: "images/projects/cse.png",
  },
];
