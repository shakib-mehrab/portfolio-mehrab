import { AdditionalSkillGroup } from '../types';

export const additionalSkillsData: AdditionalSkillGroup[] = [
  {
    title: 'Video Editing',
    icon: 'Video',
    description: 'Post-production and video editing for event promos, tech trailers, and digital content.',
    items: ['Adobe Premiere Pro', 'DaVinci Resolve', 'After Effects', 'CapCut']
  },
  {
    title: 'Photography',
    icon: 'Camera',
    description: 'Capturing moments across technical events, portraits, products, landscapes, and conceptual photography.',
    items: ['Event', 'Portrait', 'Product', 'Landscape', 'Conceptual']
  },
  {
    title: 'Creative Design',
    icon: 'Palette',
    description: 'Designing brand assets, banners, vector logos, wireframes, and UI mockups.',
    items: ['Figma', 'Photoshop', 'Illustrator', 'Canva']
  },
  {
    title: 'Public Speaking',
    icon: 'Mic',
    description: 'Delivering technical talks, facilitating workshops, presenting pitches, and storytelling.',
    items: ['Tech Talks', 'Workshops', 'Presentations', 'Storytelling']
  }
];
