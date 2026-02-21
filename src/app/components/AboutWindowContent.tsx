import { MapPin, Mail, Github, Linkedin, Twitter, Instagram, Calendar, Facebook, Palette, Languages, Code2, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";
import { profile } from "../../data/profile";
import { education } from "../../data/education";
import { skillCategories } from "../../data/skills";

export function AboutWindowContent() {
  return (
    <div className="p-3 md:p-6 overflow-auto h-full">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-4xl font-bold inline-block bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="mt-2 mx-auto h-0.5 w-16 md:w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
        </motion.div>

        {/* Profile + Meta Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 md:gap-6"
        >
          {/* Avatar */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 200 }}
              className="relative h-full w-32 md:w-48 rounded-3xl overflow-hidden ring-2 ring-blue-400/40 shadow-[0_0_30px_rgba(59,130,246,0.4),0_0_60px_rgba(139,92,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6),0_0_80px_rgba(139,92,246,0.4)] transition-shadow duration-300"
            >
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
              {/* Light sweep animation */}
              {/* eslint-disable-next-line no-inline-styles */}
              <div
                className="absolute inset-0 pointer-events-none animate-sweep"
                data-delay="0.2s"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Identity + Contact */}
          <GlassCard className="flex-1" hover sweepDelay="0.3s">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{profile.name}</h3>
            <p className="text-blue-200 mb-3 md:mb-4 text-xs md:text-sm">{profile.tagline}</p>
            <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 text-blue-300 flex-shrink-0" />
                <span className="truncate">{profile.location}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="w-3 h-3 md:w-4 md:h-4 text-blue-300 flex-shrink-0" />
                <span className="truncate">{profile.email}</span>
              </div>
            </div>
            <div className="flex gap-1.5 md:gap-2 mt-3 md:mt-4 flex-wrap">
              {[
                { href: profile.social.github, icon: <Github className="w-3 h-3 md:w-4 md:h-4" /> },
                { href: profile.social.linkedin, icon: <Linkedin className="w-3 h-3 md:w-4 md:h-4" /> },
                { href: profile.social.facebook, icon: <Facebook className="w-3 h-3 md:w-4 md:h-4" /> },
                { href: profile.social.behance, icon: <Palette className="w-3 h-3 md:w-4 md:h-4" /> },
                { href: profile.social.twitter, icon: <Twitter className="w-3 h-3 md:w-4 md:h-4" /> },
                { href: profile.social.instagram, icon: <Instagram className="w-3 h-3 md:w-4 md:h-4" /> },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="w-7 h-7 md:w-8 md:h-8 bg-white/[0.08] border border-white/10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.15] hover:border-white/20 transition-colors duration-200"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassCard glow hover sweepDelay="0.8s">
            <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">My Story</h3>
            <div className="space-y-2 md:space-y-3">
              {profile.bio.map((paragraph, i) => (
                <p key={i} className="text-white/80 leading-relaxed text-xs md:text-sm">
                  {paragraph}
                </p>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
            <span className="inline-block bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Currently Studying 
            </span>
          </h3>
          <div className="space-y-3 md:space-y-4">
            {education.filter(edu => edu.status === "Final Year").map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.35 + i * 0.1, ease: "easeOut" }}
              >
                <GlassCard padding="none" hover sweepDelay={`${0.5 + i * 0.4}s`}>
                  <div className="flex">
                    <div className="w-1 flex-shrink-0 bg-gradient-to-b from-blue-400 to-purple-400 rounded-l-3xl" />
                    <div className="p-3 md:p-5 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5 md:mb-2">
                        <h4 className="text-white font-semibold text-sm md:text-base">{edu.degree}</h4>
                        <span
                          className={`px-2 md:px-3 py-0.5 rounded-full text-[10px] md:text-xs border flex-shrink-0 ${
                            edu.status === "Final Year"
                              ? "bg-blue-500/30 border-blue-400/30 text-blue-200"
                              : "bg-green-500/30 border-green-400/30 text-green-200"
                          }`}
                        >
                          {edu.status}
                        </span>
                      </div>
                      <p className="text-blue-200 text-xs md:text-sm font-medium mb-1">{edu.institution}</p>
                      <div className="flex items-center gap-1 text-white/50 text-[10px] md:text-xs mb-1.5 md:mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{edu.period}</span>
                      </div>
                      <p className="text-white/70 text-xs md:text-sm leading-relaxed">{edu.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-4">
            <span className="inline-block bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Top Skills
            </span>
          </h3>
          <GlassCard glow hover sweepDelay="1.2s">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skillCategories
                .flatMap(category => category.skills)
                .sort((a, b) => b.level - a.level)
                .slice(0, 9)
                .map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.45 + i * 0.05 }}
                    className="flex items-center gap-2 bg-white/[0.05] border border-white/10 rounded-xl p-3 hover:bg-white/[0.08] hover:border-white/20 transition-colors"
                  >
                    <Code2 className="w-4 h-4 text-blue-300 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{skill.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/50">{skill.level}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Languages Spoken */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-4">
            <span className="inline-block bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Languages Spoken
            </span>
          </h3>
          <GlassCard glow hover sweepDelay="1.4s">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Bangla", level: "Native", proficiency: 100 },
                { name: "English", level: "Fluent", proficiency: 90 },
              ].map((lang, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.1 }}
                  className="flex items-center gap-3 bg-white/[0.05] border border-white/10 rounded-xl p-4 hover:bg-white/[0.08] hover:border-white/20 transition-colors"
                >
                  <Languages className="w-5 h-5 text-blue-300 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white font-medium">{lang.name}</p>
                      <span className="text-xs text-blue-200 bg-blue-500/20 px-2 py-0.5 rounded-full">
                        {lang.level}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                        style={{ width: `${lang.proficiency}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4">
            <span className="inline-block bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              My Journey
            </span>
          </h3>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-400 via-purple-400 to-orange-400 opacity-30" />
            
            <div className="space-y-8">
              {[
                {
                  year: "2022-2023",
                  yearLabel: "First Year",
                  title: "Competitive Programming Foundation",
                  description: "Started competitive programming, participated in coding contests, and gained deep understanding of data structures, algorithms, and logical problem-solving approaches.",
                  color: "from-blue-400 to-cyan-400",
                  dotColor: "bg-blue-400",
                },
                {
                  year: "2023-2024",
                  yearLabel: "Second Year",
                  title: "Blockchain Technology Exploration",
                  description: "Explored and learned intermediate blockchain technology and its relevant tech stack, understanding decentralized systems and smart contract development.",
                  color: "from-purple-400 to-pink-400",
                  dotColor: "bg-purple-400",
                },
                {
                  year: "2024-2025",
                  yearLabel: "Third Year",
                  title: "Full-Stack Development Mastery",
                  description: "Developed full-stack applications using MERN and PERN stacks to understand web technologies more deeply, taking my skill level up one more step.",
                  color: "from-green-400 to-teal-400",
                  dotColor: "bg-green-400",
                },
                {
                  year: "2025-2026",
                  yearLabel: "Fourth Year",
                  title: "Hackathons & Research",
                  description: "Competed in major hackathons: Global Finalist in NASA Space Apps Challenge 2025, Top 10 among 850 teams in SOLVIO AI Hackathon 2025, 12th place in BUBT National Hackathon 2025, and selected for AI Healthcare Hackathon at Central Asian University. Currently working on thesis: developing a hybrid architecture for IoT using Blockchain, Federated Learning, and Explainable AI.",
                  color: "from-orange-400 to-amber-400",
                  dotColor: "bg-orange-400",
                },
              ].map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.65 + i * 0.1, ease: "easeOut" }}
                  className="relative flex gap-6"
                >
                  {/* Dot with Year */}
                  <div className="relative flex-shrink-0 flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 + i * 0.1, type: "spring" }}
                      className={`w-10 h-10 rounded-full ${milestone.dotColor} flex items-center justify-center shadow-lg ring-4 ring-white/10 mb-2`}
                    >
                      <Trophy className="w-5 h-5 text-white" />
                    </motion.div>
                    <span className="text-xs font-bold text-white/90 whitespace-nowrap">{milestone.year}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <GlassCard padding="none" hover sweepDelay={`${1.6 + i * 0.3}s`}>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-blue-200 text-xs font-medium bg-blue-500/20 px-2 py-0.5 rounded-full">{milestone.yearLabel}</span>
                        </div>
                        <h4 className="text-white font-semibold text-base mb-2">{milestone.title}</h4>
                        <p className="text-white/70 text-sm leading-relaxed">{milestone.description}</p>
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
