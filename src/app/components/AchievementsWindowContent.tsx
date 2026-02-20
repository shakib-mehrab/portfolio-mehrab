import { Award, Trophy, Medal, Star } from "lucide-react";

interface Achievement {
  title: string;
  organization: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

export function AchievementsWindowContent() {
  const achievements: Achievement[] = [
    {
      title: "1st Place - National Hackathon 2023",
      organization: "TechCrunch Disrupt",
      date: "September 2023",
      description:
        "Won first place among 500+ teams with an innovative blockchain-based supply chain solution.",
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
    },
    {
      title: "Google Summer of Code Participant",
      organization: "Google",
      date: "Summer 2023",
      description:
        "Contributed to open-source React library, implementing new features and fixing critical bugs.",
      icon: <Star className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "AWS Certified Solutions Architect",
      organization: "Amazon Web Services",
      date: "June 2023",
      description:
        "Achieved professional certification in designing and deploying scalable systems on AWS.",
      icon: <Award className="w-6 h-6 text-orange-500" />,
    },
    {
      title: "Dean's List - All Semesters",
      organization: "Stanford University",
      date: "2020 - 2024",
      description:
        "Consistently maintained GPA above 3.8 throughout all academic semesters.",
      icon: <Medal className="w-6 h-6 text-purple-500" />,
    },
    {
      title: "Best Research Paper Award",
      organization: "IEEE Conference",
      date: "March 2023",
      description:
        "Published research on machine learning applications in blockchain consensus mechanisms.",
      icon: <Award className="w-6 h-6 text-green-500" />,
    },
    {
      title: "Microsoft Student Ambassador",
      organization: "Microsoft",
      date: "2022 - 2024",
      description:
        "Led workshops and organized tech events for 200+ students, promoting cloud computing.",
      icon: <Star className="w-6 h-6 text-blue-600" />,
    },
  ];

  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-5xl mx-auto">
        <div className="backdrop-blur-xl bg-gradient-to-r from-yellow-500/30 to-orange-500/30 text-white rounded-lg p-6 shadow-lg mb-6 border border-white/30">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8" />
            <h2 className="text-3xl font-bold drop-shadow-lg">Achievements & Awards</h2>
          </div>
          <p className="text-yellow-100 drop-shadow-md">Recognition for my contributions and excellence</p>
        </div>

        <div className="grid gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/20 rounded-lg shadow-md p-5 border border-white/30 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-14 h-14 backdrop-blur-md bg-white/30 rounded-lg flex items-center justify-center border-2 border-white/40">
                  {achievement.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md">
                    {achievement.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-white/80 mb-2">
                    <span className="font-semibold">{achievement.organization}</span>
                    <span className="text-white/60">•</span>
                    <span>{achievement.date}</span>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed drop-shadow-sm">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}