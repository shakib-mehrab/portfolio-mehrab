import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-brainify',
    role: 'Software Engineering Intern',
    company: 'Brainify Technologies',
    location: 'Narayanganj, Dhaka',
    period: 'October 2026 – Present',
    description: [
      "Debugging and maintaining ClockifyNow, the company's in-house product, and resolving its existing issues.",
      "Proposing and implementing improvements to ClockifyNow's features and code quality.",
      'Getting up to speed on client projects alongside the engineering team.'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express.js', 'Socket.io', 'Tailwind CSS']
  },
  {
    id: 'exp-csefest',
    role: 'CSEFEST Website Development',
    company: 'Department of CSE, Comilla University',
    location: 'Cumilla, Bangladesh',
    period: '2025',
    link: 'https://csefest.com',
    description: [
      'Developed the official website for CSEFEST, the biggest event of the Department of Computer Science and Engineering.',
      'Created a comprehensive platform for event registration, scheduling, and information management.',
      'Handled team ticket generation and live contestant scoreboards.'
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Redis', 'Tailwind CSS']
  },
  {
    id: 'exp-sust-karate',
    role: 'SUST Karate Club Website',
    company: 'Shahjalal University of Science and Technology',
    location: 'Sylhet, Bangladesh',
    period: '2024',
    description: [
      'Contributed to building the official website for SUST Karate Club.',
      'Designed and implemented features for member management, event showcasing, and club information display.',
      'Ensured seamless cross-device mobile responsiveness.'
    ],
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Git']
  }
];
