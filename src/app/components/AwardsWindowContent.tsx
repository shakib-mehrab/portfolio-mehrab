import { Award, Star } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";
import { awards } from "../../data/awards";

const DELAYS = ["0s", "0.35s", "0.70s", "1.05s", "1.4s", "1.75s", "2.1s", "2.45s"];

export function AwardsWindowContent() {
  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-1">
            <Award className="w-7 h-7 text-blue-300" />
            <h2 className="text-4xl font-bold inline-block bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Certifications
            </h2>
          </div>
          <div className="mt-2 mx-auto h-0.5 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          <p className="text-white/50 text-sm mt-2">Professional certifications and achievements</p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {[
            { value: `${awards.length}+`, label: "Certifications" },
            { value: "5+", label: "Platforms" },
            { value: "3", label: "This Year" },
          ].map((stat, i) => (
            <GlassCard key={i} padding="sm" className="!rounded-2xl" sweepDelay={`${i * 0.4}s`}>
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-blue-300" />
                <span className="text-white font-semibold text-sm">{stat.value}</span>
                <span className="text-white/55 text-sm">{stat.label}</span>
              </div>
            </GlassCard>
          ))}
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
            >
              <GlassCard
                padding="none"
                hover
                sweepDelay={DELAYS[index % DELAYS.length]}
              >
                {/* Banner: certificate image if available, else gradient + icon */}
                <div className="relative h-24 overflow-hidden rounded-t-3xl">
                  {award.image ? (
                    <>
                      <img
                        src={award.image}
                        alt={award.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // If image fails to load, hide it and show gradient fallback
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                          (e.currentTarget.nextElementSibling as HTMLElement | null)?.classList.remove("hidden");
                        }}
                      />
                      {/* Gradient fallback (hidden until image errors) */}
                      <div className={`hidden absolute inset-0 bg-gradient-to-r ${award.badgeColor} flex items-center justify-center`}>
                        <Award className="w-8 h-8 text-white/90" />
                      </div>
                    </>
                  ) : (
                    /* Gradient placeholder */
                    <div className={`w-full h-full bg-gradient-to-r ${award.badgeColor} flex items-center justify-center`}>
                      <Award className="w-8 h-8 text-white/90" />
                    </div>
                  )}
                  {/* Sweep highlight on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full hover:translate-x-[300%] transition-transform duration-700 pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-white/25 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-white text-sm font-semibold leading-tight mb-1">
                    {award.title}
                  </h3>
                  <p className="text-white/45 text-xs mb-3">{award.issuer}</p>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-white/[0.07] border border-white/[0.12] text-white/55">
                      {award.category}
                    </span>
                    <span className="text-white/35 text-xs">{award.year}</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
