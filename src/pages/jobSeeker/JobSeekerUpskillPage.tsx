import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Award, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, BookOpen, Star } from 'lucide-react';

interface JobSeekerUpskillPageProps {
  navigate: (route: string) => void;
}

export const JobSeekerUpskillPage: React.FC<JobSeekerUpskillPageProps> = ({ navigate }) => {
  const { currentCandidate } = useApp();

  const tracks = [
    {
      id: 'trk-1',
      title: 'Full Stack Web & Modern APIs',
      category: 'Software Engineering',
      level: 'Advanced',
      modules: 12,
      duration: '6 Weeks',
      badge: 'Certified Full Stack Pro',
      status: 'Active',
      progress: 85,
    },
    {
      id: 'trk-2',
      title: 'Risk Modeling & Financial Analysis',
      category: 'Finance & Analytics',
      level: 'Intermediate',
      modules: 8,
      duration: '4 Weeks',
      badge: 'Verified Risk Analyst',
      status: 'Available',
      progress: 0,
    },
    {
      id: 'trk-3',
      title: 'Modern Supply Chain Operations & Dispatch',
      category: 'Operations',
      level: 'Foundational',
      modules: 10,
      duration: '5 Weeks',
      badge: 'Certified Operations Specialist',
      status: 'Available',
      progress: 0,
    },
    {
      id: 'trk-4',
      title: 'Product Design Systems & Usability',
      category: 'UI/UX Design',
      level: 'Intermediate',
      modules: 6,
      duration: '3 Weeks',
      badge: 'Verified UI/UX Practitioner',
      status: 'Available',
      progress: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Job Seeker Journey</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Learning &amp; Upskill
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Verify your competencies, complete skill benchmarks, and earn badges visible to verified employers.
            </p>
          </div>

          <button
            onClick={() => navigate('/job-seeker/profile')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-emerald-600 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View Verified Profile</span>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
          </button>
        </div>

        {/* Current Verified Badges Showcase */}
        <div className="bg-gradient-to-r from-[#062e22] to-[#0a3f30] text-white rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>HUNAR Skill Verification</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">Your Verified Competencies</h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Skill badges give you priority ranking when employers filter the talent directory and review applicants.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {(currentCandidate?.skills || ['React', 'TypeScript', 'Node.js', 'System Design']).slice(0, 4).map((skill: any) => (
                <div
                  key={typeof skill === 'string' ? skill : skill.name}
                  className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{typeof skill === 'string' ? skill : skill.name}</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upskill Pathways Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Recommended Learning Pathways</h3>
            <span className="text-xs text-slate-500">Curated for high-demand employer skills</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-500/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                      {track.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{track.duration}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{track.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {track.modules} practical modules &bull; Level: {track.level}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
                    <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Badge unlocked: <strong>{track.badge}</strong></span>
                  </div>

                  {track.progress > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                        <span>Course Progress</span>
                        <span>{track.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${track.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-2">
                  <button
                    onClick={() => navigate('/jobs')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 border border-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{track.progress > 0 ? 'Continue Track' : 'View Syllabus & Skills'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
