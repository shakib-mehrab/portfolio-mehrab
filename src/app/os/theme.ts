// The sixteen window colours from Windows 7's Personalization panel
export const glassColors = [
  { name: "Sky", rgb: "116 184 252" },
  { name: "Twilight", rgb: "38 112 196" },
  { name: "Sea", rgb: "48 164 170" },
  { name: "Leaf", rgb: "102 178 70" },
  { name: "Lime", rgb: "176 214 66" },
  { name: "Sun", rgb: "250 206 62" },
  { name: "Pumpkin", rgb: "244 140 50" },
  { name: "Ruby", rgb: "206 46 46" },
  { name: "Fuchsia", rgb: "234 70 160" },
  { name: "Blush", rgb: "244 150 180" },
  { name: "Violet", rgb: "160 92 206" },
  { name: "Lavender", rgb: "176 166 240" },
  { name: "Taupe", rgb: "176 160 130" },
  { name: "Chocolate", rgb: "120 76 46" },
  { name: "Slate", rgb: "100 112 128" },
  { name: "Frost", rgb: "226 236 246" },
] as const;

export interface Wallpaper {
  id: string;
  name: string;
  src: string;
  glass: (typeof glassColors)[number]["name"];
}

export const wallpapers: Wallpaper[] = [
  { id: "aurora", name: "Aurora", src: "/wallpapers/aurora.svg", glass: "Sky" },
  { id: "space", name: "Space Apps", src: "/wallpapers/space.svg", glass: "Twilight" },
  { id: "dusk", name: "Cumilla Dusk", src: "/wallpapers/dusk.svg", glass: "Blush" },
  { id: "leaf", name: "Leaf", src: "/wallpapers/leaf.svg", glass: "Leaf" },
];

export interface ThemeState {
  wallpaper: string;
  glass: string;
  intensity: number; // 0.15 – 0.85, Windows' "Color intensity" slider
  transparency: boolean;
}

export const defaultTheme: ThemeState = {
  wallpaper: "aurora",
  glass: "Sky",
  intensity: 0.5,
  transparency: true,
};

const KEY = "mehrab7.theme";

export function loadTheme(): ThemeState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...defaultTheme, ...JSON.parse(raw) };
  } catch {
    // storage blocked: fall back to the default theme
  }
  return defaultTheme;
}

export function saveTheme(theme: ThemeState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(theme));
  } catch {
    // not fatal
  }
}

export function glassRgb(name: string) {
  return glassColors.find((c) => c.name === name)?.rgb ?? glassColors[0].rgb;
}
