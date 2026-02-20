import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa: string;
  description: string;
  image?: string;
}

export function EducationWindowContent() {
  const education: EducationItem[] = [
    {
      degree: "Bachelor of Science in Computer Science & Engineering",
      institution: "Stanford University",
      location: "Stanford, CA",
      period: "2020 - 2024",
      gpa: "3.8/4.0",
      description:
        "Focused on software engineering, artificial intelligence, and blockchain technology. Member of the Computer Science Honor Society and Google Developer Student Club.",
      image: "https://images.unsplash.com/photo-1631599143424-5bc234fbebf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcxNTMwMjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      degree: "High School Diploma",
      institution: "Lincoln High School",
      location: "San Francisco, CA",
      period: "2016 - 2020",
      gpa: "3.9/4.0",
      description:
        "Valedictorian. Advanced Placement courses in Computer Science, Mathematics, and Physics. Captain of the Robotics Team.",
    },
  ];

  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/30 to-blue-600/30 text-white rounded-lg p-6 shadow-lg border border-white/30">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-8 h-8" />
            <h2 className="text-3xl font-bold drop-shadow-lg">Education</h2>
          </div>
          <p className="text-blue-100 drop-shadow-md">My academic journey and achievements</p>
        </div>

        {education.map((edu, index) => (
          <div
            key={index}
            className="backdrop-blur-xl bg-white/20 rounded-lg shadow-md overflow-hidden border border-white/30"
          >
            {edu.image && (
              <ImageWithFallback
                src={edu.image}
                alt={edu.institution}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{edu.degree}</h3>
              <div className="flex items-center gap-2 text-blue-200 mb-1">
                <GraduationCap className="w-4 h-4" />
                <span className="font-semibold drop-shadow-md">{edu.institution}</span>
              </div>
              <div className="flex items-center gap-4 text-white/80 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{edu.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{edu.period}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-semibold">GPA: {edu.gpa}</span>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed drop-shadow-sm">{edu.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}