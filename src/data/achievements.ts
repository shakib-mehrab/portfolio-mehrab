export interface Achievement {
  title: string;
  subtitle: string;
  organization: string;
  date: string;
  description: string;
  tags: string[];
  featured?: boolean;
  iconColor: string;
}

export const achievements: Achievement[] = [
  {
    title: "NASA Space Apps Challenge 2024",
    subtitle: "Global Participation — Innovation Award",
    organization: "NASA",
    date: "2024",
    description:
      "Participated in the world's largest global hackathon organised by NASA. Developed a Space Tech Solution that earned the Innovation Award and received global recognition among thousands of submissions.",
    tags: ["Featured", "Global Participation", "Innovation Award", "Space Tech"],
    featured: true,
    iconColor: "text-blue-400",
  },
  {
    title: "Hackathon Winner 2024",
    subtitle: "1st Place — National Level",
    organization: "National Tech Competition",
    date: "2024",
    description:
      "Secured first place in a national-level hackathon, competing against teams from across the country. Built and presented a complete product prototype within 24 hours.",
    tags: ["1st Place", "National"],
    featured: false,
    iconColor: "text-yellow-400",
  },
  {
    title: "Research Publication 2023",
    subtitle: "Machine Learning in Healthcare",
    organization: "Academic Journal",
    date: "2023",
    description:
      "Published a peer-reviewed research paper on the application of machine learning techniques in healthcare diagnostics, contributing original findings to the academic community.",
    tags: ["Published", "ML", "Healthcare"],
    featured: false,
    iconColor: "text-purple-400",
  },
  {
    title: "Open Source Contributor",
    subtitle: "Active Contributor",
    organization: "GitHub",
    date: "2023 – Present",
    description:
      "Consistently contributing to open-source projects, fixing bugs, implementing features, and helping triage issues for widely-used libraries in the JavaScript and Python ecosystems.",
    tags: ["Open Source", "Community"],
    featured: false,
    iconColor: "text-green-400",
  },
];
