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
    institution: "Leading University",
    period: "2021 – 2025",
    status: "Final Year",
    description:
      "Focused on software engineering, full-stack development, and cloud computing. Active member of the Google Developer Student Club and Tech Society president for 2023-2024.",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Notable College",
    period: "2018 – 2020",
    status: "Completed",
    description:
      "Completed higher secondary education with distinction in Science. Developed foundational interests in mathematics, physics, and computing.",
  },
];
