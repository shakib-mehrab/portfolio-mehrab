export interface ExperienceRole {
  title: string;
  organization: string;
  period: string;
  description: string;
  type: "leadership" | "organizing" | "additional";
}

export interface AdditionalSkillGroup {
  category: string;
  iconName: string;
  color: string;
  tools: string[];
}

export const leadershipRoles: ExperienceRole[] = [
  {
    title: "Tech Club President",
    organization: "University Tech Society",
    period: "2023 – Present",
    description:
      "Leading a 50+ member tech society, organizing workshops, hackathons, and industry connect sessions. Grew club membership by 80% and established partnerships with 5 local tech companies.",
    type: "leadership",
  },
  {
    title: "Project Lead",
    organization: "Final Year Project",
    period: "2024 – Present",
    description:
      "Directing a multidisciplinary capstone project team of 4, managing sprint planning, code reviews, and stakeholder presentations. Applying agile methodology throughout a full product development cycle.",
    type: "leadership",
  },
  {
    title: "Mentor",
    organization: "Code for Beginners Program",
    period: "2022 – Present",
    description:
      "Mentoring 15+ junior students in programming fundamentals, web development, and career growth. Created structured learning paths that helped 8 mentees secure their first internships.",
    type: "leadership",
  },
];

export const organizingRoles: ExperienceRole[] = [
  {
    title: "DevFest 2024 — Co-Organizer",
    organization: "Google Developer Groups",
    period: "October 2024",
    description:
      "Co-organized DevFest 2024 with 500+ attendees. Managed speaker coordination, venue logistics, sponsorship outreach, and the day-of volunteer team.",
    type: "organizing",
  },
  {
    title: "Hackathon Season 3 — Event Manager",
    organization: "University Tech Society",
    period: "August 2024",
    description:
      "End-to-end management of a 24-hour hackathon with 200+ participants across 60 teams. Oversaw problem statement design, judging panel, prize distribution, and live streaming.",
    type: "organizing",
  },
  {
    title: "Tech Workshop Series — Program Coordinator",
    organization: "University CS Department",
    period: "2023 – 2024",
    description:
      "Coordinated a semester-long series of 12 technical workshops covering React, cloud computing, and DevOps. Secured industry speakers and managed a ৳50,000 budget.",
    type: "organizing",
  },
];

export const additionalSkills: AdditionalSkillGroup[] = [
  {
    category: "Video Editing",
    iconName: "Video",
    color: "from-red-500 to-pink-500",
    tools: ["Adobe Premiere Pro", "DaVinci Resolve", "After Effects"],
  },
  {
    category: "Photography",
    iconName: "Camera",
    color: "from-blue-500 to-indigo-500",
    tools: ["Event", "Portrait", "Product"],
  },
  {
    category: "Creative Design",
    iconName: "Palette",
    color: "from-purple-500 to-pink-500",
    tools: ["Figma", "Photoshop", "Illustrator"],
  },
  {
    category: "Public Speaking",
    iconName: "Mic",
    color: "from-green-500 to-teal-500",
    tools: ["Tech Talks", "Workshops", "Presentations"],
  },
];
