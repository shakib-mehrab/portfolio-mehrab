import { Users, Calendar, MapPin, Award } from "lucide-react";

interface Activity {
  title: string;
  role: string;
  organization: string;
  period: string;
  description: string;
}

export function CoCurricularsWindowContent() {
  const activities: Activity[] = [
    {
      title: "Google Developer Student Club",
      role: "President",
      organization: "Stanford University",
      period: "2023 - 2024",
      description:
        "Led a team of 30+ members in organizing tech workshops, hackathons, and coding bootcamps. Facilitated connections between students and industry professionals.",
    },
    {
      title: "Robotics Team",
      role: "Team Captain",
      organization: "University Robotics Club",
      period: "2022 - 2024",
      description:
        "Managed a team of 15 students in designing and building autonomous robots for national competitions. Secured 2nd place in the Regional Robotics Championship.",
    },
    {
      title: "Tech for Good Initiative",
      role: "Volunteer Developer",
      organization: "Non-Profit Organization",
      period: "2021 - Present",
      description:
        "Developed web applications for local non-profits to help streamline their operations. Created a donation management system used by 5+ organizations.",
    },
    {
      title: "Blockchain Research Group",
      role: "Research Assistant",
      organization: "Stanford CS Department",
      period: "2022 - 2023",
      description:
        "Conducted research on scalability solutions for blockchain networks. Co-authored a paper on Layer 2 protocols published in a peer-reviewed journal.",
    },
    {
      title: "Code Mentorship Program",
      role: "Mentor",
      organization: "University Mentorship Initiative",
      period: "2021 - 2024",
      description:
        "Mentored 20+ first-year students in programming fundamentals and career development. Helped students secure internships at major tech companies.",
    },
    {
      title: "Tech Blog Writer",
      role: "Contributing Author",
      organization: "Medium & Dev.to",
      period: "2020 - Present",
      description:
        "Published 50+ articles on web development, blockchain, and software engineering best practices. Reached 10K+ readers monthly.",
    },
  ];

  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-5xl mx-auto">
        <div className="backdrop-blur-xl bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-white rounded-lg p-6 shadow-lg mb-6 border border-white/30">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8" />
            <h2 className="text-3xl font-bold drop-shadow-lg">Co-Curricular Activities</h2>
          </div>
          <p className="text-indigo-100 drop-shadow-md">Leadership roles and community involvement</p>
        </div>

        <div className="grid gap-5">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/20 rounded-lg shadow-md p-6 border border-white/30 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{activity.title}</h3>
                  <div className="flex items-center gap-2 text-indigo-200 font-semibold text-sm">
                    <Award className="w-4 h-4" />
                    <span>{activity.role}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-white/80 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{activity.organization}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{activity.period}</span>
                </div>
              </div>

              <p className="text-white/90 leading-relaxed drop-shadow-sm">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}