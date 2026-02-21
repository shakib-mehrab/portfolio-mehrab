export interface CoCurricular {
  title: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  iconName: string;
  color: string;
  image?: string;
}

export const cocurriculars: CoCurricular[] = [
  {
    title: "Comilla University IT Society",
    role: "General Secretary",
    organization: "Comilla University",
    period: "2025 – Present",
    description:
      "Leading the IT Society of Comilla University, organizing tech workshops, coding competitions, and industry talks. Successfully increased member engagement by 40% through innovative events and collaborations.",
    iconName: "Users",
    color: "from-blue-500 to-cyan-500",
    image: "images/curricular/itsociety.jpg",
  },
  {
    title: "CSE Society - Comilla University",
    role: "Former General Secretary (Elected)",
    organization: "Comilla University",
    period: "2024 – 2025",
    description:
      "Led the Computer Science and Engineering Society of Comilla University, organizing academic events, guest lectures, and technical workshops. Increased student participation in CSE-related activities by 50%.",
    iconName: "PenLine",
    color: "from-pink-500 to-rose-500",
    image: "images/curricular/society.png",
  },
  {
    title: "TEDx Comilla University",
    role: "Deputy Lead - Technical Team",
    organization: "Comilla University",
    period: "Season 1 (2024) & Season 2 (2025)",
    description:
      "Spearheaded the technical operations for TEDx events at Comilla University, managing audio-visual setups, live streaming, and event logistics. Ensured seamless execution of 2 successful TEDx events with over 200 attendees each.",
    iconName: "VideoCamera",
    color: "from-purple-500 to-blue-500",
    image: "images/curricular/tedx.jpg",
  },
  {
    title: "BASIS Student Forum CoU Chapter",
    role: "Convenor",
    organization: "Bangladesh Association of Software and Information Services (BASIS)",
    period: "2024 – Present",
    description:
      "Leading the BASIS Student Forum chapter at Comilla University, fostering a community of aspiring tech professionals. Organized workshops on emerging technologies and facilitated networking opportunities with industry leaders.",
    iconName: "Heart",
    color: "from-green-500 to-emerald-500",
    image: "images/curricular/basis.jpg",
  },
  {
    title: "Startup Bangladesh - University Chapter",
    role: "Convener",
    organization: "Startup Bangladesh",
    period: "2024 – Present",
    description:
      "Leading the University Chapter of Startup Bangladesh, promoting entrepreneurship and innovation among students. Organized pitch competitions, startup bootcamps, and mentorship sessions to nurture the next generation of entrepreneurs.",
    iconName: "Link",
    color: "from-orange-500 to-amber-500",
    image: "images/curricular/startupbd.jpg",
  },
  {
    title: "Campus Ambassador - Pioneer Alpha",
    role: "Campus Ambassador",
    organization: "Pioneer Alpha",
    period: "2024 – 2025",
    description:
      "Represented Pioneer Alpha at Comilla University, promoting their AI-powered learning platform. Organized webinars and workshops to introduce students to the platform's features and benefits, resulting in a 30% increase in student sign-ups.",
    iconName: "BookOpen",
    color: "from-cyan-500 to-teal-500",
    image: "images/curricular/pioneeralpha.png",
  },
  
];
