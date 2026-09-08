import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobCard } from '../../components/JobCard';
import { ApplyModal } from '../../components/ApplyModal';
import { Job, CandidateProfile } from '../../types';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Bookmark,
  ShieldCheck,
  User,
  Video,
  ExternalLink,
  ChevronRight,
  Award,
  Search,
  Filter,
  Building2,
  MapPin,
  Trash2,
  Plus,
  Save,
  FileText,
  Upload,
  AlertCircle,
  Sliders,
  DollarSign,
  GraduationCap,
} from 'lucide-react';

interface JobSeekerDashboardProps {
  navigate: (route: string) => void;
  defaultTab?: 'overview' | 'applications' | 'saved_jobs' | 'profile';
}

export const JobSeekerDashboard: React.FC<JobSeekerDashboardProps> = ({
  navigate,
  defaultTab = 'overview',
}) => {
  const {
    currentCandidate,
    applications,
    jobs,
    interviews,
    savedJobIds,
    unsaveJob,
    saveJob,
    updateCandidateProfile,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'saved_jobs' | 'profile'>(
    defaultTab
  );
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);

  // Applications Filter States
  const [appFilterStatus, setAppFilterStatus] = useState<string>('All');
  const [appSearchQuery, setAppSearchQuery] = useState('');

  // Profile Form State initialized from current candidate
  const [profileForm, setProfileForm] = useState<CandidateProfile>(
    currentCandidate || {
      id: 'cand-aarav',
      userId: 'user-cand-1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '+91 98765 43210',
      headline: 'Senior Full Stack Engineer',
      location: 'Bangalore, India',
      yearsOfExperience: 5,
      experienceLevel: 'Senior',
      currentRole: 'Senior Full Stack Engineer',
      desiredRole: 'Lead Frontend Engineer / Full Stack Architect',
      preferredLocation: 'Bangalore / Remote',
      workPreference: 'Hybrid',
      availability: 'Immediate',
      profileVisibility: 'employers_only',
      availableForOpportunities: true,
      skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Tailwind CSS'],
      about:
        'Passionate full-stack developer with 5+ years building high-concurrency web applications, microservices, and design systems.',
      experiences: [
        {
          id: 'exp-1',
          company: 'HyperScale Systems',
          jobTitle: 'Senior Frontend Engineer',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          description: 'Architected high-throughput React/TypeScript dashboards.',
        },
      ],
      education: [
        {
          id: 'edu-1',
          qualification: 'B.Tech in Computer Science',
          institution: 'National Institute of Technology',
          fieldOfStudy: 'Computer Science & Engineering',
          startYear: '2016',
          endYear: '2020',
        },
      ],
      certifications: [],
      resumeName: 'Aarav_Sharma_Resume.pdf',
      completionPercentage: 85,
      recommendations: [],
    }
  );

  const [newSkill, setNewSkill] = useState('');

  const candidate = currentCandidate || profileForm;
  const myApplications = applications.filter((a) => a.candidateId === candidate.id);
  const myUpcomingInterviews = interviews.filter(
    (i) => i.candidateId === candidate.id && i.status === 'scheduled'
  );
  const mySavedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  // Compute profile completion percentage and missing fields
  const getMissingFields = () => {
    const missing: string[] = [];
    if (!profileForm.name?.trim()) missing.push('Full Name');
    if (!profileForm.headline?.trim()) missing.push('Professional Headline');
    if (!profileForm.about?.trim() || profileForm.about.length < 25) missing.push('Detailed Bio/About summary');
    if (!profileForm.phone?.trim()) missing.push('Phone Number');
    if (!profileForm.location?.trim()) missing.push('Location');
    if (!profileForm.desiredRole?.trim()) missing.push('Preferred Job Role');
    if (!profileForm.preferredLocation?.trim()) missing.push('Preferred Location');
    if (!profileForm.skills || profileForm.skills.length < 3) missing.push('At least 3 core skills');
    if (!profileForm.experiences || profileForm.experiences.length === 0) missing.push('Work Experience history');
    if (!profileForm.education || profileForm.education.length === 0) missing.push('Education details');
    if (!profileForm.resumeName) missing.push('Resume document');
    return missing;
  };

  const missingFields = getMissingFields();
  const calculatedCompletion = Math.max(
    30,
    Math.min(100, Math.round(100 - (missingFields.length * 6.5)))
  );

  // Filtered applications
  const filteredApps = myApplications.filter((app) => {
    if (appFilterStatus !== 'All' && app.status !== appFilterStatus) return false;
    if (appSearchQuery) {
      const q = appSearchQuery.toLowerCase();
      return (
        app.jobTitle.toLowerCase().includes(q) ||
        app.companyName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Recommended jobs based on candidate profile
  const recommendedJobs = jobs
    .filter((j) => {
      if (j.status !== 'published') return false;
      const skills = candidate.skills || [];
      const hasMatchingSkill = skills.some((s) =>
        typeof s === 'string' &&
        (j.preferredSkills || []).some((ps) => typeof ps === 'string' && ps.toLowerCase().includes(s.toLowerCase()))
      );
      const hasMatchingRole =
        candidate.desiredRole &&
        j.title.toLowerCase().includes(candidate.desiredRole.toLowerCase().split(' ')[0]);
      return hasMatchingSkill || hasMatchingRole;
    })
    .slice(0, 3);

  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    applied: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', label: 'Applied' },
    under_review: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', label: 'Under Review' },
    shortlisted: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', label: 'Shortlisted' },
    interview_scheduled: { bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700', label: 'Interview' },
    hired: { bg: 'bg-teal-50 border-teal-200', text: 'text-teal-800', label: 'Selected' },
    rejected: { bg: 'bg-rose-50 border-rose-200', text: 'text-rose-700', label: 'Rejected' },
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...profileForm,
      completionPercentage: calculatedCompletion,
    };
    updateCandidateProfile(updated);
    showToast('success', 'Profile Updated', 'Your profile information has been saved successfully.');
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    if (profileForm.skills.includes(newSkill.trim())) return;
    setProfileForm({
      ...profileForm,
      skills: [...profileForm.skills, newSkill.trim()],
    });
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfileForm({
      ...profileForm,
      skills: profileForm.skills.filter((s) => s !== skillToRemove),
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Welcome Header Banner */}
        <div className="bg-gradient-to-r from-[#062e22] via-[#093d2e] to-[#0d4a38] rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-2xl text-emerald-300 shadow-inner">
              {candidate?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold">{candidate?.name || 'Aarav Sharma'}</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Job Seeker
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
                {candidate?.headline || 'Senior Full Stack Engineer'} &bull; {candidate?.location || 'Bangalore, India'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('profile')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold backdrop-blur-sm transition-colors cursor-pointer"
            >
              Edit My Profile
            </button>
            <button
              onClick={() => navigate('/jobs')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Find Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Visible Dashboard Navigation Tabs (My Dashboard Central Hub) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-1.5 shadow-xs flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#062e22] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'applications'
                ? 'bg-[#062e22] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>My Applications</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'applications'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {myApplications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('saved_jobs')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'saved_jobs'
                ? 'bg-[#062e22] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Jobs</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'saved_jobs'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {mySavedJobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-[#062e22] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>My Profile</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'profile'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {calculatedCompletion}%
            </span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* 4 Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveTab('applications')}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500/40 shadow-xs cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">My Applications</span>
                  <Briefcase className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 mt-2">{myApplications.length}</div>
                <div className="text-[11px] text-emerald-700 mt-1 font-medium flex items-center gap-1">
                  <span>View live tracking</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Upcoming Interviews</span>
                  <Calendar className="w-4 h-4 text-purple-700" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 mt-2">{myUpcomingInterviews.length}</div>
                <div className="text-[11px] text-purple-700 mt-1 font-medium">
                  {myUpcomingInterviews[0] ? `Next on ${myUpcomingInterviews[0].scheduledDate}` : 'No pending interviews'}
                </div>
              </div>

              <div
                onClick={() => setActiveTab('profile')}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500/40 shadow-xs cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Profile Completion</span>
                  <Award className="w-4 h-4 text-blue-700" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 mt-2">{calculatedCompletion}%</div>
                <div className="text-[11px] text-blue-700 mt-1 font-medium flex items-center gap-1">
                  <span>{missingFields.length === 0 ? 'Fully completed' : `${missingFields.length} recommended actions`}</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab('saved_jobs')}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-500/40 shadow-xs cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Saved Jobs</span>
                  <Bookmark className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 mt-2">{mySavedJobs.length}</div>
                <div className="text-[11px] text-amber-700 mt-1 font-medium flex items-center gap-1">
                  <span>View saved jobs</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Profile Completion Prompt Banner if not 100% */}
            {calculatedCompletion < 100 && (
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-bold text-slate-900 text-sm">
                      Profile Completion: {calculatedCompletion}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Improve your recruiter visibility and job match quality by completing:{' '}
                    <strong className="text-emerald-950">{missingFields.slice(0, 3).join(', ')}</strong>.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="px-4 py-2 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs font-bold shrink-0 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  Complete Profile
                </button>
              </div>
            )}

            {/* Main Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Recent Applications & Recommended Jobs */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Recent Applications Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Recent Applications</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Real-time status updates from verified employers</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('applications')}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All ({myApplications.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {myApplications.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-500 space-y-3">
                      <p>You haven't submitted any job applications yet.</p>
                      <button
                        onClick={() => navigate('/jobs')}
                        className="px-4 py-2 rounded-xl bg-[#062e22] text-white font-semibold"
                      >
                        Find Jobs to Apply
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {myApplications.slice(0, 4).map((app) => (
                        <div
                          key={app.id}
                          className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-bold text-slate-900">{app.jobTitle}</h3>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${
                                  statusColors[app.status]?.bg || 'bg-slate-100 border-slate-200'
                                } ${statusColors[app.status]?.text || 'text-slate-700'}`}
                              >
                                {statusColors[app.status]?.label || app.status}
                              </span>
                            </div>
                            <div className="text-xs text-slate-600">
                              {app.companyName} &bull; Applied on {app.appliedDate}
                            </div>
                          </div>

                          <button
                            onClick={() => navigate(`/jobs/${app.jobId}`)}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer self-start sm:self-auto"
                          >
                            View Job
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Matched to Profile Recommendations */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>Recommended for You</span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Matched against your candidate profile preferences &amp; verified skills
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('/jobs')}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                    >
                      View All Jobs
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendedJobs.slice(0, 2).map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onApply={(j) => setSelectedJobForApply(j)}
                        onViewDetails={(id) => navigate(`/jobs/${id}`)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Col: Interviews & Learning Shortcuts */}
              <div className="space-y-6">
                
                {/* Interviews Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Video className="w-4 h-4 text-purple-600" />
                      <span>My Interviews</span>
                    </h3>
                    <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                      {myUpcomingInterviews.length} Scheduled
                    </span>
                  </div>

                  {myUpcomingInterviews.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">
                      No upcoming interviews scheduled yet.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {myUpcomingInterviews.map((interview) => (
                        <div
                          key={interview.id}
                          className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-xs font-bold text-slate-900">{interview.jobTitle}</div>
                              <div className="text-[11px] text-slate-600">{interview.companyName}</div>
                            </div>
                            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-800">
                              {interview.type}
                            </span>
                          </div>

                          <div className="text-xs text-purple-950 font-semibold flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-purple-700" />
                            <span>
                              {interview.scheduledDate} &bull; {interview.scheduledTime}
                            </span>
                          </div>

                          {interview.meetingLink && (
                            <a
                              href={interview.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full inline-flex items-center justify-center gap-1 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-[11px] font-bold transition-colors"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>Join Call</span>
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* My Learning / Upskill Shortcut */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-emerald-700" />
                      <span>Skill Certification</span>
                    </h3>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      HUNAR Upskill
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Earn verified competency credentials to stand out in the employer talent directory.
                  </p>
                  <button
                    onClick={() => navigate('/job-seeker/upskill')}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-950 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Browse Learning Modules</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header / Filter Toolbar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={appSearchQuery}
                  onChange={(e) => setAppSearchQuery(e.target.value)}
                  placeholder="Search applied jobs or companies..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={appFilterStatus}
                  onChange={(e) => setAppFilterStatus(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 text-slate-700 focus:outline-hidden focus:border-emerald-600 cursor-pointer"
                >
                  <option value="All">All Application Statuses</option>
                  <option value="applied">Applied</option>
                  <option value="under_review">Under Review</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview_scheduled">Interview</option>
                  <option value="hired">Selected</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Application List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
              {filteredApps.length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-semibold text-slate-700">No applications found</p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    {appSearchQuery || appFilterStatus !== 'All'
                      ? 'Try clearing your search or status filters.'
                      : 'You have not submitted any applications yet. Browse verified openings to get started.'}
                  </p>
                  <button
                    onClick={() => navigate('/jobs')}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors cursor-pointer"
                  >
                    Browse Open Jobs
                  </button>
                </div>
              ) : (
                filteredApps.map((app) => {
                  const statusCfg = statusColors[app.status] || {
                    bg: 'bg-slate-100 border-slate-200',
                    text: 'text-slate-700',
                    label: app.status,
                  };

                  return (
                    <div
                      key={app.id}
                      className="p-5 sm:p-6 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-bold text-slate-900 text-base">{app.jobTitle}</span>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusCfg.bg} ${statusCfg.text}`}
                          >
                            {statusCfg.label}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            {app.companyName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            Applied on {app.appliedDate}
                          </span>
                          <span className="text-emerald-700 font-semibold">
                            Score: {app.matchScore}% skill match
                          </span>
                        </div>

                        {app.timeline && app.timeline.length > 0 && (
                          <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>
                              <strong>{app.timeline[app.timeline.length - 1].status}:</strong>{' '}
                              {app.timeline[app.timeline.length - 1].note || 'Application updated'}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                        <button
                          onClick={() => navigate(`/jobs/${app.jobId}`)}
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>View Job</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SAVED JOBS */}
        {activeTab === 'saved_jobs' && (
          <div className="space-y-6 animate-fadeIn">
            {mySavedJobs.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Bookmark className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">No saved jobs yet</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                    While browsing opportunities in Find Jobs, click the bookmark icon on any job card to save it here for quick access.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/jobs')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Find Jobs</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mySavedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={(j) => setSelectedJobForApply(j)}
                    onViewDetails={(jobId) => navigate(`/jobs/${jobId}`)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: MY PROFILE (View, Edit, Add Missing Information, Save, Progress) */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-6 animate-fadeIn">
            
            {/* Profile Completion Indicator Header */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">Profile Completion: {calculatedCompletion}%</h2>
                    {calculatedCompletion === 100 ? (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                        100% Complete
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
                        {missingFields.length} Items to Finish
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Complete your profile to unlock verified recruiter discovery and 1-click applications.
                  </p>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs font-bold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${calculatedCompletion}%` }}
                />
              </div>

              {/* Missing Fields Checklist Prompts */}
              {missingFields.length > 0 && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-emerald-700" />
                    <span>Suggestions to reach 100% profile strength:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {missingFields.map((field) => (
                      <span
                        key={field}
                        className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-emerald-900 text-xs font-medium shadow-2xs"
                      >
                        + Add {field}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Section 1: Personal & Contact Information */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-700" />
                <span>Personal &amp; Contact Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Headline</label>
                  <input
                    type="text"
                    value={profileForm.headline}
                    onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                    placeholder="e.g. Senior Full Stack Engineer"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Location</label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    placeholder="e.g. Bangalore, India"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">About / Bio</label>
                  <textarea
                    rows={3}
                    value={profileForm.about}
                    onChange={(e) => setProfileForm({ ...profileForm, about: e.target.value })}
                    placeholder="Summarize your experience, engineering passions, and career strengths..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Career & Role Preferences */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-700" />
                <span>Career Preferences &amp; Target Roles</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Job Role</label>
                  <input
                    type="text"
                    value={profileForm.desiredRole || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, desiredRole: e.target.value })}
                    placeholder="e.g. Lead Frontend Engineer, Full Stack Architect"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Work Locations</label>
                  <input
                    type="text"
                    value={profileForm.preferredLocation || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, preferredLocation: e.target.value })}
                    placeholder="e.g. Bangalore, Mumbai, Remote"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Work Mode Preference</label>
                  <select
                    value={profileForm.workPreference || 'Hybrid'}
                    onChange={(e) => setProfileForm({ ...profileForm, workPreference: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 text-slate-700 focus:outline-hidden focus:border-emerald-600"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Availability</label>
                  <select
                    value={profileForm.availability || 'Immediate'}
                    onChange={(e) => setProfileForm({ ...profileForm, availability: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 text-slate-700 focus:outline-hidden focus:border-emerald-600"
                  >
                    <option value="Immediate">Immediate (Within 2 Weeks)</option>
                    <option value="1 Month">1 Month</option>
                    <option value="2 Months">2 Months</option>
                    <option value="Serving Notice">Serving Notice Period</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Skills & Competencies */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Skills &amp; Competencies</span>
              </h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  placeholder="Type a skill (e.g. React, Python, Product Strategy) and press Add..."
                  className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {profileForm.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-emerald-700 hover:text-emerald-950 p-0.5 rounded-full hover:bg-emerald-100 cursor-pointer"
                      title={`Remove ${skill}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Section 4: Resume Document */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>Resume Document</span>
              </h3>

              <div className="p-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {profileForm.resumeName || 'No resume uploaded yet'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      PDF, DOCX up to 10MB &bull; Parsed for personalized recommendations
                    </div>
                  </div>
                </div>

                <label className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-emerald-600 text-slate-700 text-xs font-bold shadow-2xs cursor-pointer flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{profileForm.resumeName ? 'Replace Resume' : 'Upload Resume'}</span>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProfileForm({
                          ...profileForm,
                          resumeName: file.name,
                        });
                        showToast('success', 'Resume Attached', `${file.name} attached to your profile.`);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Bottom Save Bar */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-sm font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        )}

      </div>

      {/* Apply Modal */}
      <ApplyModal
        job={selectedJobForApply}
        isOpen={Boolean(selectedJobForApply)}
        onClose={() => setSelectedJobForApply(null)}
        navigate={navigate}
      />
    </div>
  );
};
