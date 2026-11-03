// Numbered notes pinned onto featured project screenshots.
// x / y are percentages of the image frame; keep notes factual and short.
export interface Hotspot {
  x: number;
  y: number;
  title: string;
  body: string;
}

export const hotspotsData: Record<string, Hotspot[]> = {
  'stellar-tales': [
    { x: 30, y: 28, title: 'Live NASA & NOAA data', body: 'Space-weather stories are driven by real-time data from NASA and NOAA, not canned text.' },
    { x: 70, y: 62, title: 'Built for children', body: 'A story-first interface with friendly visuals and interactive learning, so kids can follow a solar storm without the jargon.' },
    { x: 24, y: 76, title: 'Global finalist', body: 'Built for NASA Space Apps Challenge 2025 and selected as a global finalist among 1,290+ submissions.' },
  ],
  'rs-foundation': [
    { x: 47, y: 6, title: 'Blood Connect', body: 'A blood-donor directory with blood-group filters and donor sign-up, backed by Firebase Firestore.' },
    { x: 79, y: 16, title: 'Bangla & English', body: 'The whole site switches between Bangla and English from the header toggle.' },
    { x: 28, y: 55, title: 'Donate, volunteer, give blood', body: 'Three calls to action up front, plus volunteer and help-request forms and a public donation ledger for transparency.' },
    { x: 68, y: 42, title: 'Built for a real NGO', body: 'Live site for RS Foundation, working since 2021 on flood relief, livelihoods, children’s art kits and clean-up drives.' },
  ],
  momentum: [
    { x: 84, y: 48, title: 'AI planning with RAG', body: 'LangChain and ChromaDB let the assistant reason over a student’s academics, skills and finances to build personalised plans.' },
    { x: 30, y: 26, title: 'Python AI service', body: 'A FastAPI service runs the AI layer next to a PERN app with Prisma ORM, shipped with Docker.' },
    { x: 66, y: 72, title: 'National top 10', body: 'Built as a team for SOLVIO AI Hackathon 2025, where it placed in the national top 10.' },
  ],
  'road-guardian': [
    { x: 50, y: 58, title: 'Multi-agent orchestration', body: 'LangGraph coordinates several AI agents in real time to handle an emergency end to end.' },
    { x: 40, y: 75, title: 'Offline-first PWA', body: 'Runs as a PWA with local SQLite, so it keeps working in regions where the network is the first thing to fail.' },
    { x: 82, y: 9, title: 'RAG medical guidance', body: 'First-aid guidance is retrieved from a knowledge base and generated with Groq-hosted Llama 3.1.' },
  ],
  'ad-deen': [
    { x: 13, y: 26, title: 'Prayer-time engine', body: 'High-precision astronomical calculation (solar declination, equation of time, refraction) for all 64 districts of Bangladesh.' },
    { x: 38, y: 55, title: 'Alarms for every waqt', body: 'A start alarm and a 15-minute end warning for each prayer, each with its own channel and custom sound.' },
    { x: 62, y: 40, title: '100-point amal tracker', body: 'Daily scoring for prayers, Quran and azkhar, with streaks, a 7-day chart and milestones.' },
    { x: 86, y: 26, title: 'Day & night by prayer time', body: 'The palette switches to night at Maghrib and back to day at Fajr, independent of the phone’s dark mode.' },
  ],
  pathik: [
    { x: 50, y: 84, title: 'One search for everything', body: 'Metro stations, restaurants, hotels and markets from a single search bar.' },
    { x: 56, y: 62, title: 'Metro route planner', body: 'Dhaka metro stations and travel information built in for getting around the city.' },
    { x: 42, y: 24, title: 'Installable PWA', body: 'A Progressive Web App on React, TypeScript and Firebase that installs on any phone.' },
  ],
};
