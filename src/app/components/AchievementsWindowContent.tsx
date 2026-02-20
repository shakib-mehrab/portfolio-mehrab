import { Trophy, Star, Award, Rocket } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";
import { achievements } from "../../data/achievements";

const DELAYS = ["0s", "0.5s", "1.0s", "1.5s"];

export function AchievementsWindowContent() {
  const featured = achievements.find((a) => a.featured);
  const others = achievements.filter((a) => !a.featured);

  const starPositions = [
    { top: "10%", left: "20%" },
    { top: "15%", left: "75%" },
    { top: "70%", left: "10%" },
    { top: "65%", left: "85%" },
    { top: "40%", left: "5%" },
    { top: "35%", left: "90%" },
  ];

  const iconForAchievement = (title: string) => {
    if (title.toLowerCase().includes("nasa") || title.toLowerCase().includes("space"))
      return <Rocket className="w-16 h-16 text-blue-400" />;
    if (title.toLowerCase().includes("hackathon") || title.toLowerCase().includes("winner"))
      return <Trophy className="w-10 h-10 text-yellow-400" />;
    if (title.toLowerCase().includes("research") || title.toLowerCase().includes("publication"))
      return <Award className="w-10 h-10 text-purple-400" />;
    return <Star className="w-10 h-10 text-green-400" />;
  };

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
            <Trophy className="w-7 h-7 text-blue-300" />
            <h2 className="text-4xl font-bold inline-block bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Achievements
            </h2>
          </div>
          <div className="mt-2 mx-auto h-0.5 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          <p className="text-white/50 text-sm mt-2">Recognition for contributions and excellence</p>
        </motion.div>

        {/* Featured Achievement */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <GlassCard glow hover sweepDelay="0.6s" className="text-center relative overflow-hidden">
              {/* Animated Stars */}
              {starPositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full pointer-events-none"
                  style={{ top: pos.top, left: pos.left }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.35 }}
                />
              ))}

              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 180 }}
                    className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-blue-400/20"
                  >
                    {iconForAchievement(featured.title)}
                  </motion.div>
                </div>
                <h3 className="text-2xl font-bold inline-block bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-2">
                  {featured.title}
                </h3>
                <p className="text-blue-200 text-sm mb-3">{featured.subtitle}</p>
                <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-4">
                  {featured.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {featured.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs bg-blue-500/20 border border-blue-400/30 text-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Other Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {others.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 + index * 0.1, ease: "easeOut" }}
            >
              <GlassCard hover sweepDelay={DELAYS[index % DELAYS.length]} className="h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.08] border border-white/10 flex items-center justify-center mb-3">
                    {iconForAchievement(achievement.title)}
                  </div>
                  <h4 className="text-white font-semibold mb-1">{achievement.title}</h4>
                  <p className="text-blue-200 text-xs mb-2">{achievement.subtitle}</p>
                  <p className="text-white/60 text-xs leading-relaxed mb-3">{achievement.description}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {achievement.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full text-xs bg-white/10 border border-white/20 text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
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
