export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    iconName: "Code2",
    color: "from-indigo-500 to-blue-500",
    skills: [
      { name: "C/C++", level: 85 },
      { name: "JavaScript", level: 92 },
      { name: "TypeScript", level: 85 },
      { name: "Python", level: 78 },
      { name: "Solidity", level: 78 },
      { name: "Java", level: 70 },
    ],
  },
  {
    title: "Competitive Programming",
    iconName: "Trophy",
    color: "from-yellow-500 to-orange-500",
    skills: [
      { name: "Data Structures", level: 85 },
      { name: "Dynamic Programming", level: 80 },
      { name: "Graphs & Trees", level: 82 },
      { name: "Number Theory", level: 75 },
      { name: "Greedy Algorithms", level: 78 },
    ],
  },
  {
    title: "Frontend Development",
    iconName: "Layout",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 82 },
      { name: "Tailwind CSS", level: 88 },
      { name: "HTML/CSS", level: 95 },
      { name: "Redux", level: 80 },
      { name: "Vite", level: 85 },
    ],
  },
  {
    title: "Backend Development",
    iconName: "Server",
    color: "from-purple-500 to-blue-500",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "Django", level: 75 },
      { name: "REST APIs", level: 88 },
      { name: "GraphQL", level: 72 },
      { name: "Socket.io", level: 78 },
    ],
  },
  {
    title: "Database & Tools",
    iconName: "Database",
    color: "from-cyan-500 to-teal-500",
    skills: [
      { name: "MongoDB", level: 82 },
      { name: "PostgreSQL", level: 80 },
      { name: "Redis", level: 70 },
      { name: "Git", level: 90 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 68 },
    ],
  },
  {
    title: "Blockchain & Web3",
    iconName: "Code",
    color: "from-orange-500 to-amber-500",
    skills: [
      { name: "Solidity", level: 78 },
      { name: "Ethereum", level: 75 },
      { name: "Web3.js", level: 72 },
      { name: "Smart Contracts", level: 80 },
      { name: "Hardhat", level: 70 },
      { name: "IPFS", level: 65 },
    ],
  },
  {
    title: "Mobile Development",
    iconName: "Smartphone",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "React Native", level: 75 },
      { name: "Android Development", level: 62 },
      { name: "Flutter", level: 58 },
      { name: "Mobile UI/UX", level: 70 },
      { name: "React Navigation", level: 73 },
      { name: "Expo", level: 72 },
    ],
  },
  {
    title: "Machine Learning & AI",
    iconName: "Brain",
    color: "from-violet-500 to-purple-500",
    skills: [
      { name: "Model Training", level: 75 },
      { name: "Federated Learning", level: 72 },
      { name: "Explainable AI", level: 70 },
      { name: "TensorFlow", level: 68 },
      { name: "PyTorch", level: 65 },
      { name: "Scikit-learn", level: 73 },
    ],
  },
  {
    title: "Other Skills",
    iconName: "Wrench",
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "UI/UX Design", level: 70 },
      { name: "Agile/Scrum", level: 80 },
      { name: "Testing (Jest)", level: 75 },
      { name: "CI/CD", level: 68 },
      { name: "Problem Solving", level: 85 },
      { name: "Team Leadership", level: 78 },
    ],
  },
];
