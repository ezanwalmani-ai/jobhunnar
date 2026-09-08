import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Award, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, BookOpen, Star } from 'lucide-react';

interface JobSeekerUpskillPageProps {
  navigate: (route: string) => void;
}

export const JobSeekerUpskillPage: React.FC<JobSeekerUpskillPageProps> = ({ navigate }) => {
  const { currentCandidate, courses } = useApp();

  const publishedCourses = courses.filter((c) => c.status === 'published');
  const candidateSkills = currentCandidate?.skills || [];

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
              {candidateSkills.length > 0 ? (
                candidateSkills.slice(0, 5).map((skill: any) => (
                  <div
                    key={typeof skill === 'string' ? skill : skill.name}
                    className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{typeof skill === 'string' ? skill : skill.name}</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-1" />
                  </div>
                ))
              ) : (
                <div className="text-xs text-emerald-200/90 italic bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl">
                  Add skills in your profile to showcase verified badges to recruiters.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upskill Pathways Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Recommended Learning Pathways</h3>
            <span className="text-xs text-slate-500">Managed through HUNAR Admin</span>
          </div>

          {publishedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {publishedCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-500/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                        {course.category}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{course.duration}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{course.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {course.modulesCount} practical modules &bull; Level: {course.level}
                    </p>

                    {course.badgeName && (
                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
                        <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Badge unlocked: <strong>{course.badgeName}</strong></span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-2">
                    <button
                      onClick={() => navigate('/jobs')}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 border border-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>View Syllabus &amp; Opportunities</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 text-center max-w-xl mx-auto my-8">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-100">
                <BookOpen className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">No learning courses available yet.</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
                We're preparing new curriculum and skill certification tracks. Approved learning programs published by administrators will appear here.
              </p>
              <button
                onClick={() => navigate('/job-seeker/profile')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Update My Skills in Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
