import { useId } from "react";

/*
 * Hand-drawn icon set in the glossy 2009 style: soft gradients, a bright rim,
 * a highlight across the top half. All drawn on a 48×48 grid.
 */

export type IconName =
  | "folder"
  | "user"
  | "projects"
  | "people"
  | "certificates"
  | "pictures"
  | "trophy"
  | "pdf"
  | "mail"
  | "cmd"
  | "bin"
  | "binFull"
  | "chip"
  | "update"
  | "graduation"
  | "personalize"
  | "start"
  | "info"
  | "globe";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 48, className }: IconProps) {
  const uid = useId().replace(/:/g, "");
  const id = (s: string) => `${uid}-${s}`;
  const url = (s: string) => `url(#${id(s)})`;

  const body = (() => {
    switch (name) {
      case "folder":
      case "projects":
      case "people":
      case "certificates":
      case "user":
        return (
          <>
            <defs>
              <linearGradient id={id("back")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e9c25f" />
                <stop offset="1" stopColor="#c79328" />
              </linearGradient>
              <linearGradient id={id("front")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fdeeb6" />
                <stop offset="0.45" stopColor="#f7d777" />
                <stop offset="1" stopColor="#eab949" />
              </linearGradient>
            </defs>
            <path d="M4 10.5a2 2 0 0 1 2-2h11l3 3.5h22a2 2 0 0 1 2 2V38H4z" fill={url("back")} stroke="#a77a1d" strokeWidth="1" />
            <rect x="9" y="11" width="30" height="22" rx="1" fill="#fff" stroke="#c9c9c9" transform="rotate(-4 24 22)" />
            <rect x="11" y="13" width="28" height="22" rx="1" fill="#fbfbfb" stroke="#d2d2d2" transform="rotate(3 24 24)" />
            <path d="M3 18.5a2 2 0 0 1 2-2h38a2 2 0 0 1 2 2.2l-1.6 19.5a2 2 0 0 1-2 1.8H6.6a2 2 0 0 1-2-1.8z" fill={url("front")} stroke="#b88a24" strokeWidth="1" />
            <path d="M5 18h38" stroke="#fff8d8" strokeWidth="1.2" opacity="0.9" />
            {name === "projects" && (
              <g transform="translate(15 22)" fill="none" stroke="#7a5a12" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
                <path d="M5 2 0 7l5 5M13 2l5 5-5 5M10.5 0 7.5 14" />
              </g>
            )}
            {name === "people" && (
              <g transform="translate(14 21)" fill="#2f7fd0" stroke="#1d4f86" strokeWidth="0.8">
                <circle cx="13" cy="4" r="3.6" fill="#7fb2e5" />
                <path d="M6.5 15c0-4 3-6.5 6.5-6.5s6.5 2.5 6.5 6.5z" fill="#7fb2e5" />
                <circle cx="7" cy="5.5" r="4" />
                <path d="M0 16c0-4.5 3.2-7 7-7s7 2.5 7 7z" />
              </g>
            )}
            {name === "certificates" && (
              <g transform="translate(16 20)">
                <circle cx="8" cy="7" r="6" fill="#d8402b" stroke="#8d1d0e" />
                <circle cx="8" cy="7" r="3.5" fill="none" stroke="#ffd2c6" strokeWidth="1" />
                <path d="M4 11.5 2.5 18l3-1.5L7 19l1-6.5M12 11.5l1.5 6.5-3-1.5L9 19l-1-6.5" fill="#d8402b" stroke="#8d1d0e" strokeWidth="0.8" />
              </g>
            )}
            {name === "user" && (
              <g transform="translate(15 20)">
                <circle cx="9" cy="5.5" r="5" fill="#f2c79c" stroke="#a46f3f" strokeWidth="0.8" />
                <path d="M4.2 4.5C4.5 1 7 0 9 0s5 1 4.8 4.8C12 3 7 3.5 4.2 4.5z" fill="#3a2a1d" />
                <path d="M0 18c0-5 4-7.8 9-7.8S18 13 18 18z" fill="#3c7fc5" stroke="#1d4f86" strokeWidth="0.8" />
              </g>
            )}
          </>
        );

      case "pictures":
        return (
          <>
            <defs>
              <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#4aa3ef" />
                <stop offset="1" stopColor="#bfe6ff" />
              </linearGradient>
            </defs>
            <g transform="rotate(-8 24 24)">
              <rect x="6" y="9" width="32" height="26" rx="1" fill="#fff" stroke="#9d9d9d" />
              <rect x="9" y="12" width="26" height="17" fill="#d9d1c3" />
            </g>
            <g transform="rotate(5 26 26)">
              <rect x="10" y="12" width="34" height="28" rx="1" fill="#fff" stroke="#8a8a8a" />
              <rect x="13" y="15" width="28" height="19" fill={url("sky")} />
              <circle cx="35" cy="20" r="2.6" fill="#fff6c4" />
              <path d="M13 34l8-9 5 5 4-4 11 8z" fill="#3d8f2f" />
              <path d="M13 34l8-9 3.4 3.4L18 34z" fill="#58b043" />
            </g>
          </>
        );

      case "trophy":
        return (
          <>
            <defs>
              <linearGradient id={id("gold")} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#b9831b" />
                <stop offset="0.35" stopColor="#ffe791" />
                <stop offset="0.6" stopColor="#f4c43c" />
                <stop offset="1" stopColor="#a8700f" />
              </linearGradient>
            </defs>
            <path d="M13 9h-6c0 8 3 12 8 13M35 9h6c0 8-3 12-8 13" fill="none" stroke="#c99a2c" strokeWidth="2.5" />
            <path d="M12 6h24v6c0 9-5 15-12 15S12 21 12 12z" fill={url("gold")} stroke="#8d5f0b" />
            <path d="M15 8h7v4c0 5-1 9-4 11-2-2-3-6-3-11z" fill="#fff" opacity="0.35" />
            <rect x="21" y="27" width="6" height="7" fill={url("gold")} stroke="#8d5f0b" strokeWidth="0.8" />
            <path d="M14 34h20l2 7H12z" fill="#5a3b22" stroke="#2d1b0e" />
            <rect x="18" y="36" width="12" height="3" rx="0.5" fill={url("gold")} />
          </>
        );

      case "pdf":
        return (
          <>
            <path d="M10 3h20l9 9v33H10z" fill="#fff" stroke="#8c8c8c" />
            <path d="M30 3v9h9" fill="#ececec" stroke="#8c8c8c" />
            <path d="M14 18h20M14 22h20M14 26h14" stroke="#c4c4c4" strokeWidth="1.5" />
            <rect x="6" y="30" width="26" height="11" rx="1.5" fill="#d7261d" stroke="#8f120c" />
            <text x="19" y="38.8" textAnchor="middle" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="700" fontSize="8" fill="#fff">PDF</text>
          </>
        );

      case "mail":
        return (
          <>
            <defs>
              <linearGradient id={id("env")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="1" stopColor="#d9e4ef" />
              </linearGradient>
            </defs>
            <rect x="4" y="12" width="40" height="27" rx="2" fill={url("env")} stroke="#6b7f95" />
            <path d="M4.5 13 24 28 43.5 13" fill="none" stroke="#6b7f95" strokeWidth="1.2" />
            <path d="M4.5 38.5 19 24.5M43.5 38.5 29 24.5" stroke="#9fb0c3" />
            <rect x="33" y="15" width="7" height="8" fill="#3f8be0" stroke="#24589a" strokeWidth="0.6" />
            <circle cx="36.5" cy="19" r="2" fill="#fff" opacity="0.7" />
          </>
        );

      case "cmd":
        return (
          <>
            <rect x="4" y="7" width="40" height="34" rx="2" fill="#2a2a2a" stroke="#000" />
            <rect x="4.5" y="7.5" width="39" height="6" fill="#c9d9ec" />
            <rect x="7" y="16" width="34" height="22" fill="#000" />
            <text x="9" y="26" fontFamily="Consolas, monospace" fontSize="8" fill="#c0c0c0">C:\&gt;</text>
            <rect x="27" y="23" width="5" height="2" fill="#c0c0c0" />
          </>
        );

      case "bin":
      case "binFull":
        return (
          <>
            <defs>
              <linearGradient id={id("bin")} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#9fb8cf" stopOpacity="0.85" />
                <stop offset="0.4" stopColor="#f2f8ff" stopOpacity="0.75" />
                <stop offset="1" stopColor="#7d98b3" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {name === "binFull" && (
              <g>
                <rect x="15" y="4" width="13" height="16" fill="#fff" stroke="#9a9a9a" transform="rotate(-14 21 12)" />
                <rect x="22" y="5" width="12" height="15" fill="#f6f3e1" stroke="#a49d74" transform="rotate(12 28 12)" />
                <path d="M16 13h10M17 16h8" stroke="#bbb" transform="rotate(-14 21 12)" />
              </g>
            )}
            <path d="M10 13h28l-3.4 30a2 2 0 0 1-2 1.8H15.4a2 2 0 0 1-2-1.8z" fill={url("bin")} stroke="#4b6782" />
            <path d="M16 18l1.5 22M24 18v22M32 18l-1.5 22" stroke="#4b6782" strokeOpacity="0.45" />
            <ellipse cx="24" cy="13" rx="14.5" ry="3.4" fill="#e8f1fa" fillOpacity="0.8" stroke="#4b6782" />
            <path d="M14 15c3 3 4 20 3.5 27" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.5" fill="none" />
          </>
        );

      case "chip":
        return (
          <>
            <defs>
              <linearGradient id={id("pcb")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#5c6875" />
                <stop offset="1" stopColor="#262d35" />
              </linearGradient>
            </defs>
            <rect x="6" y="6" width="36" height="36" rx="3" fill="#2f8f4e" stroke="#174f2a" />
            {[12, 18, 24, 30, 36].map((p) => (
              <g key={p} stroke="#e7c35a" strokeWidth="1.6">
                <path d={`M${p} 7v6M${p} 35v6M7 ${p}h6M35 ${p}h6`} />
              </g>
            ))}
            <rect x="13" y="13" width="22" height="22" rx="2" fill={url("pcb")} stroke="#11161b" />
            <rect x="14" y="14" width="20" height="9" rx="1.5" fill="#fff" opacity="0.13" />
            <circle cx="17" cy="31" r="1.3" fill="#9aa5b1" />
          </>
        );

      case "update":
        return (
          <>
            <defs>
              <radialGradient id={id("globe")} cx="0.35" cy="0.3" r="0.8">
                <stop offset="0" stopColor="#c6ecff" />
                <stop offset="0.5" stopColor="#3d93dd" />
                <stop offset="1" stopColor="#123f80" />
              </radialGradient>
            </defs>
            <circle cx="24" cy="24" r="16" fill={url("globe")} stroke="#0f3366" />
            <path d="M14 17c4 0 5 3 9 2s3 4 0 6-1 6-4 7M30 12c-1 3 2 4 4 4s3 3 2 6" fill="none" stroke="#6cc24a" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
            <path d="M37 12a17 17 0 0 1 4 15" fill="none" stroke="#2fa32f" strokeWidth="4" strokeLinecap="round" />
            <path d="M44 25l-3 5-4-4z" fill="#2fa32f" />
            <path d="M11 36a17 17 0 0 1-4-15" fill="none" stroke="#2fa32f" strokeWidth="4" strokeLinecap="round" />
            <path d="M4 23l3-5 4 4z" fill="#2fa32f" />
            <ellipse cx="20" cy="15" rx="9" ry="5" fill="#fff" opacity="0.3" />
          </>
        );

      case "graduation":
        return (
          <>
            <defs>
              <linearGradient id={id("cap")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#4a4f59" />
                <stop offset="1" stopColor="#15181d" />
              </linearGradient>
            </defs>
            <path d="M13 24v9c0 3 5 6 11 6s11-3 11-6v-9" fill={url("cap")} stroke="#000" />
            <path d="M2 18 24 9l22 9-22 9z" fill={url("cap")} stroke="#000" />
            <path d="M6 18 24 11l18 7" fill="none" stroke="#fff" strokeOpacity="0.35" />
            <path d="M24 18l13 4v12" fill="none" stroke="#e7b93b" strokeWidth="1.5" />
            <path d="M35 34h4l1 6h-6z" fill="#e7b93b" stroke="#9c7212" strokeWidth="0.6" />
          </>
        );

      case "personalize":
        return (
          <>
            <defs>
              <linearGradient id={id("scr")} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#1b70c9" />
                <stop offset="0.55" stopColor="#5fc0f2" />
                <stop offset="1" stopColor="#0b3f86" />
              </linearGradient>
            </defs>
            <rect x="4" y="7" width="40" height="28" rx="2" fill="#2a2f36" stroke="#0e1114" />
            <rect x="7" y="10" width="34" height="22" fill={url("scr")} />
            <path d="M7 26c8-6 16 2 34-8v14H7z" fill="#fff" opacity="0.2" />
            <path d="M19 35h10l2 6H17z" fill="#59606a" />
            <rect x="13" y="40" width="22" height="3" rx="1" fill="#2a2f36" />
            <circle cx="35" cy="16" r="6" fill="#f6f1e6" stroke="#8b7a55" />
            <circle cx="33" cy="14" r="1.4" fill="#e53935" />
            <circle cx="36.5" cy="13.5" r="1.4" fill="#43a047" />
            <circle cx="38" cy="17" r="1.4" fill="#1e88e5" />
          </>
        );

      case "info":
        return (
          <>
            <defs>
              <radialGradient id={id("info")} cx="0.4" cy="0.3" r="0.8">
                <stop offset="0" stopColor="#bfe3ff" />
                <stop offset="0.6" stopColor="#2b7fd6" />
                <stop offset="1" stopColor="#0d3f86" />
              </radialGradient>
            </defs>
            <circle cx="24" cy="24" r="19" fill={url("info")} stroke="#0b356e" />
            <ellipse cx="24" cy="15" rx="13" ry="8" fill="#fff" opacity="0.35" />
            <circle cx="24" cy="14.5" r="3" fill="#fff" />
            <path d="M20 20h6v14h3v3H19v-3h3V23h-2z" fill="#fff" />
          </>
        );

      case "globe":
        return (
          <>
            <defs>
              <radialGradient id={id("g2")} cx="0.35" cy="0.3" r="0.8">
                <stop offset="0" stopColor="#d8f1ff" />
                <stop offset="0.55" stopColor="#3f9be3" />
                <stop offset="1" stopColor="#134a8f" />
              </radialGradient>
            </defs>
            <circle cx="24" cy="24" r="19" fill={url("g2")} stroke="#0f3366" />
            <path d="M5 24h38M24 5c-7 6-7 32 0 38M24 5c7 6 7 32 0 38M9 13h30M9 35h30" fill="none" stroke="#fff" strokeOpacity="0.45" />
          </>
        );

      case "start":
        return <OrbGlyph />;
    }
  })();

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      {body}
    </svg>
  );
}

/* The Start orb's mark: an original glowing "M" ribbon, not anyone's flag. */
export function OrbGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ position: "relative" }}>
      <defs>
        <linearGradient id="orb-m" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#bdf2ff" />
        </linearGradient>
        <filter id="orb-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.1" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M3.5 18.5c1.2-4.5 2.3-9 3.6-12.2.4-1 1.6-1 2 0L12 13l2.9-6.7c.4-1 1.6-1 2 0 1.3 3.2 2.4 7.7 3.6 12.2"
        fill="none"
        stroke="url(#orb-m)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#orb-glow)"
      />
    </svg>
  );
}

/* Caption-button glyphs, drawn white with a dark halo (see .w7-cap svg) */
export function CapGlyph({ kind }: { kind: "min" | "max" | "restore" | "close" }) {
  if (kind === "close")
    return (
      <svg width="12" height="11" viewBox="0 0 12 11" aria-hidden="true">
        <path d="M2 1.5l8 8M10 1.5l-8 8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  if (kind === "min")
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        <rect x="1" y="6.5" width="8" height="2.5" fill="#fff" />
      </svg>
    );
  if (kind === "restore")
    return (
      <svg width="11" height="10" viewBox="0 0 11 10" aria-hidden="true">
        <path d="M3 .8h7v5.7H8.6M1 3h6.8v6H1z" fill="none" stroke="#fff" strokeWidth="1.6" />
        <path d="M1 3h6.8v1.6H1z" fill="#fff" />
      </svg>
    );
  return (
    <svg width="11" height="10" viewBox="0 0 11 10" aria-hidden="true">
      <rect x="1" y="1" width="9" height="8" fill="none" stroke="#fff" strokeWidth="1.6" />
      <rect x="1" y="1" width="9" height="2.4" fill="#fff" />
    </svg>
  );
}
