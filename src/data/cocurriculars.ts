export interface CoCurricular {
  title: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  iconName: string;
  color: string;
}

export const cocurriculars: CoCurricular[] = [
  {
    title: "Google Developer Student Club",
    role: "President",
    organization: "Leading University",
    period: "2023 – 2024",
    description:
      "Led a team of 30+ members in organizing tech workshops, hackathons, and coding bootcamps. Facilitated direct connections between students and industry professionals.",
    iconName: "Users",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Robotics Team",
    role: "Team Captain",
    organization: "University Robotics Club",
    period: "2022 – 2024",
    description:
      "Managed a team of 15 students building autonomous robots for national competitions. Secured top 3 placement at the Regional Robotics Championship.",
    iconName: "Cpu",
    color: "from-purple-500 to-blue-500",
  },
  {
    title: "Tech for Good Initiative",
    role: "Volunteer Developer",
    organization: "Non-Profit Organization",
    period: "2021 – Present",
    description:
      "Developed web applications for local non-profits to streamline their operations. Created a donation management system now used by 5+ organizations.",
    iconName: "Heart",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Blockchain Research Group",
    role: "Research Assistant",
    organization: "University CS Department",
    period: "2022 – 2023",
    description:
      "Conducted research on scalability solutions for blockchain networks. Co-authored a paper on Layer 2 protocols published in a peer-reviewed journal.",
    iconName: "Link",
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Code Mentorship Program",
    role: "Mentor",
    organization: "University Mentorship Initiative",
    period: "2021 – 2024",
    description:
      "Mentored 20+ first-year students in programming fundamentals and career development. Helped mentees secure internships at major tech companies.",
    iconName: "BookOpen",
    color: "from-cyan-500 to-teal-500",
  },
  {
    title: "Tech Blog Writer",
    role: "Contributing Author",
    organization: "Medium & Dev.to",
    period: "2020 – Present",
    description:
      "Published 50+ articles on web development, blockchain, and software engineering. Reaching 10K+ readers monthly across both platforms.",
    iconName: "PenLine",
    color: "from-pink-500 to-rose-500",
  },
];
