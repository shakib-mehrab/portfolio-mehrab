export interface ExperienceRole {
  title: string;
  organization: string;
  period: string;
  description: string;
  type: "work" | "leadership" | "organizing" | "additional";
  link?: string;
}

export interface AdditionalSkillGroup {
  category: string;
  iconName: string;
  color: string;
  tools: string[];
}

export const workExperience: ExperienceRole[] = [
  {
    title: "CSEFEST Website Development",
    organization: "Department of CSE, Comilla University",
    period: "2025",
    description:
      "Developed the official website for CSEFEST, the biggest event of the Department of Computer Science and Engineering. Created a comprehensive platform for event registration, scheduling, and information management.",
    type: "work",
    link: "https://csefest.com",
  },
  {
    title: "Collaborative Project Development",
    organization: "Multi-University Team Projects",
    period: "2024 – 2025",
    description:
      "Participated in various group projects collaborating with teams from different universities across Bangladesh. Worked on full-stack web applications, implementing modern development practices and agile methodologies.",
    type: "work",
  },
  {
    title: "SUST Karate Club Website",
    organization: "Shahjalal University of Science and Technology",
    period: "2024",
    description:
      "Contributed to building the official website for SUST Karate Club, designing and implementing features for member management, event showcasing, and club information display.",
    type: "work",
  },
];

export const leadershipRoles: ExperienceRole[] = [
  {
    title: "General Secretary",
    organization: "Comilla University IT Society",
    period: "2025 – Present",
    description:
      "Leading the IT Society of Comilla University, organizing tech workshops, coding competitions, and industry talks. Successfully increased member engagement by 40% through innovative events and collaborations.",
    type: "leadership",
  },
  {
    title: "Former General Secretary (Elected)",
    organization: "CSE Society - Comilla University",
    period: "2024 – 2025",
    description:
      "Led the Computer Science and Engineering Society of Comilla University, organizing academic events, guest lectures, and technical workshops. Increased student participation in CSE-related activities by 50%.",
    type: "leadership",
  },
  {
    title: "Deputy Lead - Technical Team",
    organization: "TEDx Comilla University",
    period: "Season 1 (2024) & Season 2 (2025)",
    description:
      "Spearheaded the technical operations for TEDx events at Comilla University, managing audio-visual setups, live streaming, and event logistics. Ensured seamless execution of 2 successful TEDx events with over 200 attendees each.",
    type: "leadership",
  },
  {
    title: "Convenor",
    organization: "BASIS Student Forum CoU Chapter",
    period: "2024 – Present",
    description:
      "Leading the BASIS Student Forum chapter at Comilla University, fostering a community of aspiring tech professionals. Organized workshops on emerging technologies and facilitated networking opportunities with industry leaders.",
    type: "leadership",
  },
  {
    title: "Convener",
    organization: "Startup Bangladesh - University Chapter",
    period: "2024 – Present",
    description:
      "Leading the University Chapter of Startup Bangladesh, promoting entrepreneurship and innovation among students. Organized pitch competitions, startup bootcamps, and mentorship sessions to nurture the next generation of entrepreneurs.",
    type: "leadership",
  },
  {
    title: "Campus Ambassador",
    organization: "Pioneer Alpha",
    period: "2024 – 2025",
    description:
      "Represented Pioneer Alpha at Comilla University, promoting their AI-powered learning platform. Organized webinars and workshops to introduce students to the platform's features and benefits, resulting in a 30% increase in student sign-ups.",
    type: "leadership",
  },
];

export const organizingRoles: ExperienceRole[] = [
  {
    title: "CSE Fest 2025 — Chief Coordinator",
    organization: "Department of CSE, Comilla University",
    period: "2025",
    description:
      "Led the entire CSE Fest 2025, the biggest event of the year for the Department of Computer Science and Engineering. Coordinated Regional Programming Contest, Sports Week, Cultural Week, and other activities as General Secretary of CSE Society.",
    type: "organizing",
  },
  {
    title: "CoU IT Society IT Fest Inter University Programming Contest — Head Organizer",
    organization: "Comilla University IT Society",
    period: "2025",
    description:
      "Organized a national level inter-university programming competition as the head of the organizing team. Managed participant registration, problem setting, judging, and logistics for teams from universities across Bangladesh.",
    type: "organizing",
  },
  {
    title: "TEDxCoU — Deputy Lead (2 Seasons)",
    organization: "TEDx Comilla University",
    period: "Season 1 (2024) & Season 2 (2025)",
    description:
      "Organized TEDx events for 2 consecutive seasons as Deputy Lead. Managed technical operations, speaker coordination, venue setup, and ensured flawless execution of both events with 200+ attendees each.",
    type: "organizing",
  },
  {
    title: "CoU Inter University Programming Contest 2023 — Organizing Member",
    organization: "Department of CSE, Comilla University",
    period: "2023",
    description:
      "Served as an organizing member for the inter-university programming contest hosted by the Department of Computer Science and Engineering. A national level competitive programming contest that brought together talented programmers from across the country.",
    type: "organizing",
  },
];

export const additionalSkills: AdditionalSkillGroup[] = [
  {
    category: "Video Editing",
    iconName: "Video",
    color: "from-red-500 to-pink-500",
    tools: ["Adobe Premiere Pro", "DaVinci Resolve", "After Effects", "CapCut"],
  },
  {
    category: "Photography",
    iconName: "Camera",
    color: "from-blue-500 to-indigo-500",
    tools: ["Event", "Portrait", "Product","Landscape", "Conceptual"],
  },
  {
    category: "Creative Design",
    iconName: "Palette",
    color: "from-purple-500 to-pink-500",
    tools: ["Figma", "Photoshop", "Illustrator", "Canva"],
  },
  {
    category: "Public Speaking",
    iconName: "Mic",
    color: "from-green-500 to-teal-500",
    tools: ["Tech Talks", "Workshops", "Presentations", "Storytelling"],
  },
];
