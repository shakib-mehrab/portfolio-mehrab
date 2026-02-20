import { Code, Database, Layout, Server, Smartphone, Wrench } from "lucide-react";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export function SkillsWindowContent() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: <Layout className="w-6 h-6" />,
      skills: [
        { name: "React.js", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Tailwind CSS", level: 88 },
        { name: "Next.js", level: 82 },
        { name: "HTML/CSS", level: 95 },
        { name: "JavaScript", level: 92 },
      ],
    },
    {
      title: "Backend Development",
      icon: <Server className="w-6 h-6" />,
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 80 },
        { name: "Python", level: 78 },
        { name: "Django", level: 75 },
        { name: "REST APIs", level: 88 },
        { name: "GraphQL", level: 72 },
      ],
    },
    {
      title: "Database & Tools",
      icon: <Database className="w-6 h-6" />,
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
      icon: <Code className="w-6 h-6" />,
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
      icon: <Smartphone className="w-6 h-6" />,
      skills: [
        { name: "React Native", level: 75 },
        { name: "Flutter", level: 65 },
        { name: "iOS Development", level: 60 },
        { name: "Android Development", level: 62 },
      ],
    },
    {
      title: "Other Skills",
      icon: <Wrench className="w-6 h-6" />,
      skills: [
        { name: "UI/UX Design", level: 70 },
        { name: "Agile/Scrum", level: 80 },
        { name: "Testing (Jest)", level: 75 },
        { name: "CI/CD", level: 68 },
      ],
    },
  ];

  const getSkillColor = (level: number) => {
    if (level >= 85) return "bg-green-500";
    if (level >= 70) return "bg-blue-500";
    if (level >= 50) return "bg-yellow-500";
    return "bg-gray-400";
  };

  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-white rounded-lg p-6 shadow-lg mb-6 border border-white/30">
          <div className="flex items-center gap-3 mb-2">
            <Code className="w-8 h-8" />
            <h2 className="text-3xl font-bold drop-shadow-lg">Technical Skills</h2>
          </div>
          <p className="text-purple-100 drop-shadow-md">My expertise across different technologies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/20 rounded-lg shadow-md p-6 border border-white/30"
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/20">
                <div className="text-blue-300">{category.icon}</div>
                <h3 className="text-xl font-semibold text-white drop-shadow-md">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-white/90 drop-shadow-sm">{skill.name}</span>
                      <span className="text-sm text-white/70">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getSkillColor(
                          skill.level
                        )}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 backdrop-blur-xl bg-blue-500/20 border border-white/30 rounded-lg p-4">
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-white/90 drop-shadow-sm">Expert (85%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-white/90 drop-shadow-sm">Advanced (70-84%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="text-white/90 drop-shadow-sm">Intermediate (50-69%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}