interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
  sweepDelay?: string;
}

export function GlassCard({
  children,
  className = "",
  glow = false,
  hover = false,
  padding = "md",
  sweepDelay = "0s",
}: GlassCardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-3 md:p-4",
    md: "p-4 md:p-6",
    lg: "p-6 md:p-8",
  };

  return (
    <div
      className={`
        relative overflow-hidden group
        backdrop-blur-2xl bg-white/[0.05] rounded-2xl md:rounded-3xl border border-white/[0.08]
        ${glow ? "shadow-[0_0_35px_rgba(59,130,246,0.22)]" : ""}
        ${hover ? "transition-all duration-300 hover:bg-white/[0.08] hover:shadow-[0_0_44px_rgba(59,130,246,0.30)] hover:-translate-y-0.5 hover:border-white/[0.16]" : ""}
        ${paddingClasses[padding]}
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
    >
      {/* Top-edge inner highlight line */}
      <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Hover gradient overlay — matches reference_style */}
      {hover && (
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-500/[0.08] via-transparent to-purple-500/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}

      {/* Children */}
      {children}

      {/* Light sweep — rendered last so it floats above content via blend */}
      {/* Note: Dynamic animation delay requires inline style - this is intentional */}
      {/* eslint-disable-next-line no-inline-styles */}
      <div
        className="absolute inset-0 pointer-events-none animate-sweep"
        data-delay={sweepDelay}
        style={{ animationDelay: sweepDelay }}
      >
        <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.11] to-transparent" />
      </div>
    </div>
  );
}
