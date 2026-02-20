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
  /** Optional path to certificate image, e.g. "/images/certificates/aws.jpg" */
  image?: string;
}

export const awards: Award[] = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2024",
    category: "Cloud",
    badgeColor: "from-orange-500 to-amber-600",
    image: "../../public/images/certificates/certificate1.png",
  },
  {
    title: "Full Stack Web Development",
    issuer: "Meta",
    year: "2023",
    category: "Web",
    badgeColor: "from-blue-500 to-blue-700",
    // image: "/images/certificates/meta-fullstack.jpg",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford / Coursera",
    year: "2023",
    category: "ML",
    badgeColor: "from-purple-500 to-violet-700",
    // image: "/images/certificates/ml-specialization.jpg",
  },
  {
    title: "React Native — The Practical Guide",
    issuer: "Udemy",
    year: "2023",
    category: "Mobile",
    badgeColor: "from-cyan-500 to-blue-600",
    // image: "/images/certificates/react-native.jpg",
  },
  {
    title: "Docker & Kubernetes",
    issuer: "Udemy",
    year: "2024",
    category: "DevOps",
    badgeColor: "from-teal-500 to-cyan-600",
    // image: "/images/certificates/docker-kubernetes.jpg",
  },
  {
    title: "UI/UX Design Fundamentals",
    issuer: "Google / Coursera",
    year: "2022",
    category: "Design",
    badgeColor: "from-pink-500 to-rose-600",
    // image: "/images/certificates/uiux-design.jpg",
  },
  {
    title: "Python for Data Science",
    issuer: "IBM / Coursera",
    year: "2022",
    category: "Data",
    badgeColor: "from-yellow-500 to-amber-600",
    // image: "/images/certificates/python-datascience.jpg",
  },
  {
    title: "Cybersecurity Fundamentals",
    issuer: "Cisco",
    year: "2023",
    category: "Security",
    badgeColor: "from-red-500 to-rose-700",
    // image: "/images/certificates/cisco-cybersecurity.jpg",
  },
];
