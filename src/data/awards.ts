export type AwardCategory =
  | "Cloud"
  | "Web"
  | "ML"
  | "Mobile"
  | "DevOps"
  | "Design"
  | "Data"
  | "Security";

export interface Award {
  title: string;
  issuer: string;
  year: string;
  category: AwardCategory;
  badgeColor: string;
}

export const awards: Award[] = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2024",
    category: "Cloud",
    badgeColor: "from-orange-500 to-amber-600",
  },
  {
    title: "Full Stack Web Development",
    issuer: "Meta",
    year: "2023",
    category: "Web",
    badgeColor: "from-blue-500 to-blue-700",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford / Coursera",
    year: "2023",
    category: "ML",
    badgeColor: "from-purple-500 to-violet-700",
  },
  {
    title: "React Native — The Practical Guide",
    issuer: "Udemy",
    year: "2023",
    category: "Mobile",
    badgeColor: "from-cyan-500 to-blue-600",
  },
  {
    title: "Docker & Kubernetes",
    issuer: "Udemy",
    year: "2024",
    category: "DevOps",
    badgeColor: "from-teal-500 to-cyan-600",
  },
  {
    title: "UI/UX Design Fundamentals",
    issuer: "Google / Coursera",
    year: "2022",
    category: "Design",
    badgeColor: "from-pink-500 to-rose-600",
  },
  {
    title: "Python for Data Science",
    issuer: "IBM / Coursera",
    year: "2022",
    category: "Data",
    badgeColor: "from-yellow-500 to-amber-600",
  },
  {
    title: "Cybersecurity Fundamentals",
    issuer: "Cisco",
    year: "2023",
    category: "Security",
    badgeColor: "from-red-500 to-rose-700",
  },
];
