import { User, MapPin, Cake, Mail, Phone, Linkedin, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AboutWindowContentProps {
  profileImage?: string;
}

export function AboutWindowContent({ profileImage }: AboutWindowContentProps) {
  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/20 rounded-lg shadow-md p-6 border border-white/30">
        <div className="flex gap-6 mb-6">
          <div className="flex-shrink-0">
            {profileImage ? (
              <ImageWithFallback
                src={profileImage}
                alt="Profile"
                className="w-40 h-40 rounded-lg object-cover border-4 border-white/40 shadow-lg"
              />
            ) : (
              <div className="w-40 h-40 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-4 border-white/40 shadow-lg">
                <User className="w-20 h-20 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">John Doe</h2>
            <p className="text-xl text-blue-200 mb-4 drop-shadow-md">
              Full Stack Developer & Blockchain Enthusiast
            </p>

            <div className="space-y-2 text-white/90 drop-shadow-md">
              <div className="flex items-center gap-2">
                <Cake className="w-4 h-4 text-blue-300" />
                <span>Age: 22</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-300" />
                <span>Location: San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-300" />
                <span>john.doe@email.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-300" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6">
          <h3 className="text-xl font-semibold text-white mb-3 drop-shadow-md">About Me</h3>
          <p className="text-white/90 leading-relaxed mb-4 drop-shadow-sm">
            I am a passionate Computer Science student with a strong foundation in full-stack web
            development and emerging technologies. My journey in tech began with a curiosity about
            how things work, which quickly evolved into a deep love for creating innovative
            solutions that solve real-world problems.
          </p>
          <p className="text-white/90 leading-relaxed mb-4 drop-shadow-sm">
            Currently pursuing my Bachelor's degree in Computer Science and Engineering, I
            specialize in building scalable web applications using modern frameworks like React,
            Node.js, and blockchain technologies. I'm particularly interested in decentralized
            systems and their potential to revolutionize various industries.
          </p>
          <p className="text-white/90 leading-relaxed mb-4 drop-shadow-sm">
            When I'm not coding, you can find me contributing to open-source projects, attending
            tech meetups, or exploring the latest advancements in AI and machine learning. I believe
            in continuous learning and staying updated with the ever-evolving tech landscape.
          </p>

          <h3 className="text-xl font-semibold text-white mb-3 mt-6 drop-shadow-md">Connect With Me</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-blue-500/40 text-white rounded hover:bg-blue-500/60 transition-colors border border-white/30"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-gray-700/40 text-white rounded hover:bg-gray-700/60 transition-colors border border-white/30"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}