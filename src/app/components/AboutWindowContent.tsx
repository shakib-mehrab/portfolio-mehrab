import { MapPin, Mail, Github, Linkedin, Twitter, Instagram, Calendar, Facebook, Palette } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";
import { profile } from "../../data/profile";
import { education } from "../../data/education";

export function AboutWindowContent() {
  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold inline-block bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="mt-2 mx-auto h-0.5 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
        </motion.div>

        {/* Profile + Meta Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-6"
        >
          {/* Avatar */}
          <div className="flex-shrink-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 200 }}
              className="relative h-full w-48 rounded-3xl overflow-hidden ring-2 ring-blue-400/40 shadow-[0_0_30px_rgba(59,130,246,0.4),0_0_60px_rgba(139,92,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6),0_0_80px_rgba(139,92,246,0.4)] transition-shadow duration-300"
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
            <h3 className="text-2xl font-bold text-white mb-1">{profile.name}</h3>
            <p className="text-blue-200 mb-4 text-sm">{profile.tagline}</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-4 h-4 text-blue-300 flex-shrink-0" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="w-4 h-4 text-blue-300 flex-shrink-0" />
                <span>{profile.email}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {[
                { href: profile.social.github, icon: <Github className="w-4 h-4" /> },
                { href: profile.social.linkedin, icon: <Linkedin className="w-4 h-4" /> },
                { href: profile.social.facebook, icon: <Facebook className="w-4 h-4" /> },
                { href: profile.social.behance, icon: <Palette className="w-4 h-4" /> },
                { href: profile.social.twitter, icon: <Twitter className="w-4 h-4" /> },
                { href: profile.social.instagram, icon: <Instagram className="w-4 h-4" /> },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="w-8 h-8 bg-white/[0.08] border border-white/10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.15] hover:border-white/20 transition-colors duration-200"
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
            <h3 className="text-lg font-semibold text-white mb-4">My Story</h3>
            <div className="space-y-3">
              {profile.bio.map((paragraph, i) => (
                <p key={i} className="text-white/80 leading-relaxed text-sm">
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
          <h3 className="text-lg font-semibold mb-4">
            <span className="inline-block bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              My Education
            </span>
          </h3>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.35 + i * 0.1, ease: "easeOut" }}
              >
                <GlassCard padding="none" hover sweepDelay={`${0.5 + i * 0.4}s`}>
                  <div className="flex">
                    <div className="w-1 flex-shrink-0 bg-gradient-to-b from-blue-400 to-purple-400 rounded-l-3xl" />
                    <div className="p-5 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h4 className="text-white font-semibold">{edu.degree}</h4>
                        <span
                          className={`px-3 py-0.5 rounded-full text-xs border flex-shrink-0 ${
                            edu.status === "Final Year"
                              ? "bg-blue-500/30 border-blue-400/30 text-blue-200"
                              : "bg-green-500/30 border-green-400/30 text-green-200"
                          }`}
                        >
                          {edu.status}
                        </span>
                      </div>
                      <p className="text-blue-200 text-sm font-medium mb-1">{edu.institution}</p>
                      <div className="flex items-center gap-1 text-white/50 text-xs mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{edu.period}</span>
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed">{edu.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
