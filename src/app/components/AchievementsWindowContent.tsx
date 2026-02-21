import { Trophy, Star, Award, Rocket } from "lucide-react";
import { motion } from "motion/react";
import { achievements } from "../../data/achievements";

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
            className="group"
          >
            {/* Glassmorphism Banner with Background Image */}
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-500">
              {/* Background Image */}
              <img
                src={featured.image || "images/achievements/NasaSpace.jpg"}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              
              {/* Gradient Overlay - Dark for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
              
              {/* Continuous Light Sweep Animation */}
              <div 
                className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{
                  animation: 'sweep 5s linear infinite',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.05) 60%, transparent 100%)',
                  backgroundSize: '200% 100%',
                }}
              />

              {/* Animated Stars */}
              {starPositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full pointer-events-none z-10"
                  style={{ top: pos.top, left: pos.left }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.35 }}
                />
              ))}

              {/* Frosted Glass Content Area */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 backdrop-blur-sm bg-gradient-to-b from-transparent via-black/20 to-black/60 group-hover:backdrop-blur-md transition-all duration-500">
                <div className="relative z-10 text-center max-w-3xl">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 180 }}
                    className="inline-flex mb-6"
                  >
                    <div className="relative overflow-hidden p-2" style={{ filter: 'drop-shadow(0 10px 40px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))' }}>
                      {/* Enhanced Glassmorphism shadow background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl border border-white/30" />
                      {featured.icon ? (
                        <img
                          src={featured.icon}
                          alt={`${featured.title} icon`}
                          className="h-24 w-auto object-contain relative z-10"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-24 h-24 flex items-center justify-center relative z-10">
                          {iconForAchievement(featured.title)}
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
                    {featured.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-blue-200 text-lg md:text-xl font-semibold mb-4 drop-shadow">
                    {featured.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-6 drop-shadow">
                    {featured.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {featured.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-md border border-white/30 text-white shadow-lg hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CSS for sweep animation */}
              <style>{`
                @keyframes sweep {
                  0% {
                    background-position: -200% 0;
                  }
                  100% {
                    background-position: 200% 0;
                  }
                }
              `}</style>
            </div>
          </motion.div>
        )}

        {/* Other Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {others.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 + index * 0.1, ease: "easeOut" }}
              className="group"
            >
              {/* Enhanced GlassCard with continuous sweep */}
              <div className="relative h-full min-h-[300px] rounded-3xl border border-white/[0.08] overflow-hidden transition-all duration-300 hover:shadow-[0_0_44px_rgba(59,130,246,0.30)] hover:-translate-y-0.5 hover:border-white/[0.16]">
                {/* Background Image (if available) */}
                {achievement.image ? (
                  <>
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                    {/* Gradient Overlay - Dark for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80 transition-opacity duration-500 group-hover:via-black/65 group-hover:to-black/85" />
                  </>
                ) : (
                  /* Solid background for cards without images */
                  <div className="absolute inset-0 backdrop-blur-2xl bg-white/[0.05]" />
                )}

                {/* Top-edge inner highlight line */}
                <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/[0.08] via-transparent to-purple-500/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Continuous Light Sweep Animation */}
                <div 
                  className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
                  style={{
                    animation: 'sweep-continuous 4s linear infinite',
                    animationDelay: `${index * 0.5}s`,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.05) 60%, transparent 100%)',
                    backgroundSize: '200% 100%',
                  }}
                />

                {/* Content with backdrop blur for image cards */}
                <div className={`flex flex-col items-center justify-center text-center relative z-10 h-full p-6 ${achievement.image ? 'backdrop-blur-sm' : ''}`}>
                  <div className="relative overflow-hidden mb-3 p-1.5" style={{ filter: 'drop-shadow(0 6px 20px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.2))' }}>
                    {/* Enhanced Glassmorphism shadow background */}
                    <div className={`absolute inset-0 ${achievement.image ? 'bg-gradient-to-br from-white/20 via-white/12 to-white/5 backdrop-blur-xl border border-white/40' : 'bg-gradient-to-br from-white/15 via-white/8 to-white/5 backdrop-blur-lg border border-white/20'}`} />
                    {achievement.icon ? (
                      <img
                        src={achievement.icon}
                        alt={`${achievement.title} icon`}
                        className="h-14 w-auto object-contain relative z-10"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.innerHTML = '';
                            const icon = document.createElement('div');
                            icon.className = 'w-full h-full flex items-center justify-center';
                            parent.appendChild(icon);
                          }
                        }}
                      />
                    ) : (
                      <div className="w-14 h-14 flex items-center justify-center relative z-10">
                        {iconForAchievement(achievement.title)}
                      </div>
                    )}
                  </div>
                  <h4 className={`font-semibold mb-1 ${achievement.image ? 'text-white text-lg' : 'text-white'}`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-xs mb-2 ${achievement.image ? 'text-blue-200' : 'text-blue-200'}`}>
                    {achievement.subtitle}
                  </p>
                  <p className={`text-xs leading-relaxed mb-3 ${achievement.image ? 'text-white/90 drop-shadow' : 'text-white/60'}`}>
                    {achievement.description}
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {achievement.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded-full text-xs ${achievement.image ? 'bg-white/10 backdrop-blur-md border border-white/30 text-white' : 'bg-white/10 border border-white/20 text-white/60'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CSS for sweep animation */}
                <style>{`
                  @keyframes sweep-continuous {
                    0% {
                      background-position: -200% 0;
                    }
                    100% {
                      background-position: 200% 0;
                    }
                  }
                `}</style>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
