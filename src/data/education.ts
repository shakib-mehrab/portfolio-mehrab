import { EducationItem } from '../types';

export const educationData: EducationItem[] = [
  {
    id: 'edu-cou',
    degree: 'B.Sc. Computer Science & Engineering',
    institution: 'Comilla University',
    location: 'Cumilla, Bangladesh',
    period: '2022 – 2026',
    status: 'Completed',
    cgpa: '3.51',
    highlights: [
      'Focused on software engineering, full-stack development, Web3 development and AI.',
      'Acquired strong foundation in MERN, Next.js, Web3, MySQL, PostgreSQL, and cloud infrastructure.',
      'Finalist in national and international hackathons, including NASA Space Apps Challenge 2025 (global finalist).',
      'General Secretary at Comilla University IT Society, Former General Secretary at CSE Society, Former Technical Deputy Lead at TEDxCoU 2025.'
    ],
   
  },
  {
    id: 'edu-mc',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Govt. M.C College',
    location: 'Sylhet, Bangladesh',
    period: '2018 – 2020',
    status: 'Completed',
    cgpa: '5.00',
    highlights: [
      'Completed higher secondary education with distinction in Science.',
      'Developed foundational interests in mathematics, physics, and computing.'
    ]
  },
  {
    id: 'edu-alamin',
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Al-Amin Jamea Islamia High School',
    location: 'Sylhet, Bangladesh',
    period: '2016 – 2018',
    status: 'Completed',
    cgpa: '5.00',
    highlights: [
      'Completed secondary education with GPA-5.',
      'Active in extracurriculars including debate club and computer programming contests.'
    ]
  }
];
