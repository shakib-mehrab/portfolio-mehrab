// Photography shown in the Pictures library (desktop icon "Photography").
// Drop images in public/images/photography/ and list them here; the folder
// shows "This folder is empty." until the first entry is added. Photos also
// become available as desktop backgrounds in Personalization.
export interface Photo {
  src: string;
  title: string;
  taken?: string; // e.g. "March 2026"
  place?: string;
  camera?: string;
}

export const photos: Photo[] = [
  // { src: "/images/photography/sunset.webp", title: "Sunset over Gomti", taken: "March 2026", place: "Cumilla" },
];
