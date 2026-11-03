import { AchievementItem } from '../types';

export const achievementsData: AchievementItem[] = [
  {
    id: 'ach-nasa',
    title: 'NASA Space Apps Challenge 2025',
    subtitle: 'Global Finalist',
    award: 'Global Finalist',
    organization: 'NASA',
    year: '2025',
    description: "Participated in the world's largest global hackathon organised by NASA. Developed a Space Tech Solution that received global recognition among 1,290+ submissions.",
    iconName: 'Rocket',
    tag: 'Global Finalist',
    tags: ['Featured', 'Global Finalist', 'Story Telling', 'Space Tech'],
    featured: true,
    image: '/images/achievements/NasaSpace.jpg',
    icon: '/images/achievements/icons/nasa.jpg'
  },
  {
    id: 'ach-solvio',
    title: 'SOLVIO AI Hackathon 2025',
    subtitle: 'TOP 10, National Level',
    award: 'TOP 10, National Level',
    organization: 'Sheba Platform',
    year: '2025',
    description: 'Secured a place among top 10 in a national-level hackathon, competing against teams from across the country. Built and presented a complete product prototype within 24 hours.',
    iconName: 'Cpu',
    tag: 'National Top 10',
    tags: ['Top 10', 'National'],
    featured: false,
    image: '/images/achievements/Solvio.webp',
    icon: '/images/achievements/icons/solvio.png'
  },
  {
    id: 'ach-blockchain',
    title: 'Bangladesh Blockchain Olympiad',
    subtitle: 'Finalist, National Level',
    award: 'Finalist, National Level',
    organization: 'ICT Division',
    year: '2025',
    description: 'Participated in the national-level Bangladesh Blockchain Olympiad, securing a finalist position among teams from across the country.',
    iconName: 'ShieldCheck',
    tag: 'National Finalist',
    tags: ['Finalist', 'National'],
    featured: false,
    image: '/images/achievements/BUBT.webp',
    icon: '/images/achievements/icons/olympiadicon.png'
  },
  {
    id: 'ach-health',
    title: 'AI Healthcare Hackathon',
    subtitle: 'Finalist',
    award: 'Finalist',
    organization: 'Central Asian University, Tashkent',
    year: '2026',
    description: 'Reached the finalist stage in an AI healthcare hackathon by building and presenting a practical solution focused on real-world health use cases.',
    iconName: 'Activity',
    tag: 'International Finalist',
    tags: ['Finalist', 'AI Healthcare', 'Hackathon'],
    featured: false
  },
  {
    id: 'ach-hult',
    title: 'Hult Prize at Comilla University',
    subtitle: 'Finalist',
    award: 'Finalist',
    organization: 'Comilla University',
    year: '2025-2026',
    description: 'Recognized as a finalist at Hult Prize at Comilla University with team CoU_ImpactCatalyst for the 2025-2026 season.',
    iconName: 'Trophy',
    tag: 'Finalist',
    tags: ['Finalist', 'Hult Prize', 'Innovation'],
    featured: false,
    icon: '/images/achievements/icons/hult.png'
  }
];
