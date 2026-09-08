import React from 'react';
import { Job } from '../types';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Briefcase,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  onViewDetails: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply, onViewDetails }) => {
  const { savedJobIds, saveJob, unsaveJob, currentCandidate } = useApp();
  const isSaved = savedJobIds.includes(job.id);

  // Calculate Match Score with candidate skills
  let matchScore: number | null = null;
  if (currentCandidate && Array.isArray(currentCandidate.skills) && Array.isArray(job?.preferredSkills)) {
    const matchingCount = currentCandidate.skills.filter((skill) =>
      typeof skill === 'string' &&
      job.preferredSkills.some((s) => typeof s === 'string' && s.toLowerCase().includes(skill.toLowerCase()))
    ).length;
    matchScore = Math.round(
      Math.min(98, 70 + (matchingCount / Math.max(1, job.preferredSkills.length)) * 28)
    );
  }

  const formatSalary = (min: number, max: number, currency: string) => {
    if (currency === 'INR') {
      const minLakh = (min / 100000).toFixed(1).replace('.0', '');
      const maxLakh = (max / 100000).toFixed(1).replace('.0', '');
      return `₹${minLakh}L - ₹${maxLakh}L / yr`;
    }
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/40 p-5 sm:p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Top Header: Logo, Company, Title, Save */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-xs shrink-0"
              loading="lazy"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-slate-700">{job.companyName}</span>
                {job.isVerifiedCompany && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200/60">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified
                  </span>
                )}
                {job.featured && (
                  <span className="px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                    Featured
                  </span>
                )}
              </div>
              <h3
                onClick={() => onViewDetails(job.id)}
                className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors mt-0.5 cursor-pointer leading-snug"
              >
                {job.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => (isSaved ? unsaveJob(job.id) : saveJob(job.id))}
            className="p-2 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer shrink-0"
            title={isSaved ? 'Remove from saved' : 'Save this job'}
            aria-label="Save Job"
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 text-emerald-600" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Metadata badges */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 mt-3.5">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            <span>
              {job.employmentType} &bull; {job.workMode}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <span>{formatSalary(job.salary.min, job.salary.max, job.salary.currency)}</span>
          </div>
        </div>

        {/* Short overview */}
        <p className="text-xs text-slate-500 line-clamp-2 mt-3 leading-relaxed">
          {job.overview}
        </p>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {(job.preferredSkills || []).slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
            >
              {skill}
            </span>
          ))}
          {(job.preferredSkills || []).length > 4 && (
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[11px]">
              +{(job.preferredSkills || []).length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Match Score & Action Buttons */}
      <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between gap-3">
        {matchScore ? (
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-800">{matchScore}% Match</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Posted {job.postedDate}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(job.id)}
            className="px-3 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
          >
            Details
          </button>
          <button
            onClick={() => onApply(job)}
            className="px-3.5 py-1.5 rounded-lg bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer inline-flex items-center gap-1"
          >
            <span>Apply</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
