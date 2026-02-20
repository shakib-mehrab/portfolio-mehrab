export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  status: string;
  description: string;
}

export const education: EducationEntry[] = [
  {
    degree: "B.Sc. Computer Science & Engineering",
    institution: "Comilla Univeristy, Cumilla, Bangladesh",
    period: "2022 – 2026",
    status: "Final Year",
    description:
      "Focused on software engineering, full-stack development, and cloud computing. General Secretary at Comilla Univeristy IT Society, Former General Secretary at CSE Society, Former Technical Deputy Lead at TedXCoU-2025",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Govt. M.C College, Sylhet, Bangladesh",
    period: "2018 – 2020",
    status: "Completed",
    description:
      "Completed higher secondary education with distinction in Science. Developed foundational interests in mathematics, physics, and computing.",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Al-Amin Jamea Islamia High School, Sylhet, Bangladesh",
    period: "2016 – 2018",
    status: "Completed",
    description:
      "Completed secondary education with GPA-5. Active in extracurriculars including debate club and computer programming contests.",
  },
];
