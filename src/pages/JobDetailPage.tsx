import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApplyModal } from '../components/ApplyModal';
import { JobCard } from '../components/JobCard';
import {
  MapPin,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Building2,
  ArrowLeft,
  Share2,
  Send,
  ExternalLink,
} from 'lucide-react';

interface JobDetailPageProps {
  jobId: string;
  navigate: (route: string) => void;
}

export const JobDetailPage: React.FC<JobDetailPageProps> = ({ jobId, navigate }) => {
  const { jobs, savedJobIds, saveJob, unsaveJob, currentCandidate, showToast } = useApp();
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const job = jobs.find((j) => j.id === jobId) || jobs[0];
  const isSaved = savedJobIds.includes(job.id);

  // Match score calculation
  let matchScore: number | null = null;
  let matchingSkills: string[] = [];
  if (currentCandidate && Array.isArray(currentCandidate.skills) && Array.isArray(job?.preferredSkills)) {
    matchingSkills = currentCandidate.skills.filter((skill) =>
      typeof skill === 'string' &&
      job.preferredSkills.some((s) => typeof s === 'string' && s.toLowerCase().includes(skill.toLowerCase()))
    );
    matchScore = Math.round(
      Math.min(98, 70 + (matchingSkills.length / Math.max(1, job.preferredSkills.length)) * 28)
    );
  }

  const formatSalary = (min: number, max: number, currency: string) => {
    if (currency === 'INR') {
      const minLakh = (min / 100000).toFixed(1).replace('.0', '');
      const maxLakh = (max / 100000).toFixed(1).replace('.0', '');
      return `₹${minLakh} Lakh - ₹${maxLakh} Lakh per year`;
    }
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  const similarJobs = jobs
    .filter((j) => j.id !== job.id && (j.industry === job.industry || j.department === job.department))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('info', 'Link Copied', 'Job opening link copied to clipboard.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back navigation */}
        <button
          onClick={() => navigate('/jobs')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Jobs</span>
        </button>

        {/* Main Job Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <img
                src={job.companyLogo}
                alt={job.companyName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-slate-700">{job.companyName}</span>
                  {job.isVerifiedCompany && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Employer
                    </span>
                  )}
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-600 pt-1">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {job.location} ({job.workMode})
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    {job.employmentType}
                  </span>
                  <span>&bull;</span>
                  <span className="font-semibold text-slate-900">
                    {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleShare}
                className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                title="Share Job"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => (isSaved ? unsaveJob(job.id) : saveJob(job.id))}
                className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                title={isSaved ? 'Unsave' : 'Save'}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setApplyModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>1-Click Apply</span>
              </button>
            </div>
          </div>

          {/* Match Score Banner */}
          {matchScore && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {matchScore}%
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Strong Profile Match</span>
                  </div>
                  <div className="text-xs text-emerald-800 mt-0.5">
                    Your HUNAR profile matches {matchingSkills.length} required skills: {matchingSkills.join(', ')}
                  </div>
                </div>
              </div>
              <div className="text-xs text-emerald-900 font-semibold flex items-center gap-3">
                <span>&bull; Skills Match</span>
                <span>&bull; Experience Level Match</span>
                <span>&bull; Location Preference</span>
              </div>
            </div>
          )}
        </div>

        {/* Content Layout: Left 2 Cols (Job Content), Right 1 Col (Sidebar info) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900">Job Overview</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{job.overview}</p>

              {/* Responsibilities */}
              <div className="pt-4 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Key Responsibilities</h3>
                <ul className="space-y-2.5">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="pt-4 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Qualifications &amp; Requirements</h3>
                <ul className="space-y-2.5">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preferred Skills */}
              <div className="pt-4 space-y-2.5">
                <h3 className="text-sm font-bold text-slate-900">Preferred Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.preferredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200/60 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="pt-4 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Compensation &amp; Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {job.benefits.map((benefit, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Summary Widget */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">Job Summary</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Posted Date:</span>
                  <span className="font-semibold text-slate-800">{job.postedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Application Deadline:</span>
                  <span className="font-semibold text-slate-800">{job.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Department:</span>
                  <span className="font-semibold text-slate-800">{job.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Experience Level:</span>
                  <span className="font-semibold text-slate-800">{job.experienceLevel} ({job.minExperienceYears}+ yrs)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Applicants:</span>
                  <span className="font-semibold text-emerald-800">{job.applicantsCount} applied</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Apply with HUNAR Profile</span>
                </button>
              </div>
            </div>

            {/* About Company Widget */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{job.companyName}</h4>
                  <p className="text-[11px] text-slate-500">{job.industry}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Verified enterprise hiring partner with authenticated recruiter credentials on the HUNAR network.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/companies')}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                >
                  <span>View Company Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Jobs */}
        {similarJobs.length > 0 && (
          <div className="pt-10 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Similar Job Openings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarJobs.map((sj) => (
                <JobCard
                  key={sj.id}
                  job={sj}
                  onApply={() => setApplyModalOpen(true)}
                  onViewDetails={(id) => navigate(`/jobs/${id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Apply Modal */}
      <ApplyModal
        job={job}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        navigate={navigate}
      />
    </div>
  );
};
