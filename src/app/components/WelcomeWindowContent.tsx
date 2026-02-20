import { User } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface WelcomeWindowContentProps {
  profileImage?: string;
}

export function WelcomeWindowContent({ profileImage }: WelcomeWindowContentProps) {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-2xl backdrop-blur-xl bg-white/20 rounded-lg shadow-lg p-8 border border-white/30">
        <div className="flex items-start gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            {profileImage ? (
              <ImageWithFallback
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white/40 shadow-xl"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-4 border-white/40 shadow-xl">
                <User className="w-16 h-16 text-white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              Welcome to My Portfolio
            </h1>
            <h2 className="text-xl text-blue-200 mb-4 drop-shadow-md">
              Full Stack Developer | Blockchain Enthusiast | CSE Student
            </h2>
            <p className="text-white/90 leading-relaxed drop-shadow-md">
              Hello! I'm a passionate computer science student with a keen interest in full-stack
              development and blockchain technology. I love building innovative solutions that make
              a difference. This portfolio showcases my journey, projects, and achievements.
            </p>
            <p className="text-white/90 leading-relaxed mt-4 drop-shadow-md">
              Feel free to explore my desktop by double-clicking on any icon to learn more about my
              education, skills, projects, and achievements. You can also use the Start menu at the
              bottom left to navigate through different sections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}