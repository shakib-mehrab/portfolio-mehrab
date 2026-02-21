export interface Achievement {
  title: string;
  subtitle: string;
  organization: string;
  date: string;
  description: string;
  tags: string[];
  featured?: boolean;
  iconColor: string;
  image?: string;
  icon?: string;
}

export const achievements: Achievement[] = [
  {
    title: "NASA Space Apps Challenge 2025",
    subtitle: "Global Finalist",
    organization: "NASA",
    date: "2025",
    description:
      "Participated in the world's largest global hackathon organised by NASA. Developed a Space Tech Solution that received global recognition among 1290 of submissions.",
    tags: ["Featured", "Global Finalist", "Story Telling", "Space Tech"],
    featured: true,
    iconColor: "text-blue-400",
    image: "images/achievements/NasaSpace.jpg",
    icon: "images/achievements/icons/nasa.jpg",
  },
  {
    title: "SOLVIO AI Hackathon 2025",
    subtitle: "TOP 10 — National Level",
    organization: "Sheba Platform",
    date: "2025",
    description:
      "Secured a place among top 10 in a national-level hackathon, competing against teams from across the country. Built and presented a complete product prototype within 24 hours.",
    tags: ["Top 10", "National"],
    featured: false,
    iconColor: "text-yellow-400",
    image: "images/achievements/Solvio.png",
    icon: "images/achievements/icons/solvio.png",
  },
  // {
  //   title: "Research Publication 2023",
  //   subtitle: "Machine Learning in Healthcare",
  //   organization: "Academic Journal",
  //   date: "2023",
  //   description:
  //     "Published a peer-reviewed research paper on the application of machine learning techniques in healthcare diagnostics, contributing original findings to the academic community.",
  //   tags: ["Published", "ML", "Healthcare"],
  //   featured: false,
  //   iconColor: "text-purple-400",
  // },
  {
    title: "Bangladesh Blockchain Olympiad 2024",
    subtitle: "Finalist — National Level",
    organization: "ICT Division",
    date: "2025",
    description:
      "Participated in the national-level Bangladesh Blockchain Olympiad, securing a finalist position among teams from across the country.",
    tags: ["Finalist", "National"],
    featured: false,
    iconColor: "text-green-400",
    image: "images/achievements/BUBT.png",
    icon: "images/achievements/icons/olympiadicon.png",
  },
];
