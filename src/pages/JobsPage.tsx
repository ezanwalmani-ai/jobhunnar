import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { JobCard } from '../components/JobCard';
import { ApplyModal } from '../components/ApplyModal';
import { Job } from '../types';
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  X,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
  CheckCircle2,
  Building2,
  Bookmark,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface JobsPageProps {
  navigate: (route: string) => void;
  initialQuery?: string;
  initialLocation?: string;
}

export const JobsPage: React.FC<JobsPageProps> = ({
  navigate,
  initialQuery = '',
  initialLocation = '',
}) => {
  const { jobs, currentCandidate, currentRole, savedJobIds, saveJob, unsaveJob } = useApp();

  // Filter States
  const [search, setSearch] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [workMode, setWorkMode] = useState<string>('All');
  const [employmentType, setEmploymentType] = useState<string>('All');
  const [experienceLevel, setExperienceLevel] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'salary' | 'applicants'>('latest');

  // Apply Modal state
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);

  // Extract all unique skills across jobs
  const allSkills = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => (j.preferredSkills || []).forEach((s) => set.add(s)));
    return Array.from(set).slice(0, 15);
  }, [jobs]);

  // Personalized "Recommended for You" jobs calculation
  const recommendedJobsWithReasons = useMemo(() => {
    const activeJobs = jobs.filter((j) => j.status === 'published');
    const skills = currentCandidate?.skills || [];
    const desiredRole = currentCandidate?.desiredRole || currentCandidate?.headline || '';
    const preferredLocation = currentCandidate?.preferredLocation || currentCandidate?.location || '';

    // Score each job
    const scored = activeJobs.map((job) => {
      let score = 50; // base score for active jobs
      const matchReasons: string[] = [];

      // 1. Skill overlap
      const matchingSkills = (job.preferredSkills || []).filter((s) =>
        skills.some((cs) => cs.toLowerCase() === s.toLowerCase() || s.toLowerCase().includes(cs.toLowerCase()))
      );

      if (matchingSkills.length > 0) {
        score += Math.min(35, matchingSkills.length * 12);
        matchReasons.push(`Matches your skills in ${matchingSkills.slice(0, 2).join(', ')}`);
      }

      // 2. Desired role overlap
      if (desiredRole && job.title) {
        const words = desiredRole.toLowerCase().split(/[\s/]+/);
        const hasRoleWord = words.some((w) => w.length > 2 && job.title.toLowerCase().includes(w));
        if (hasRoleWord) {
          score += 15;
          matchReasons.push(`Aligns with your desired role (${desiredRole.split('/')[0].trim()})`);
        }
      }

      // 3. Location overlap
      if (preferredLocation && job.location) {
        if (job.workMode === 'Remote' || job.location.toLowerCase().includes(preferredLocation.toLowerCase())) {
          score += 10;
          matchReasons.push(job.workMode === 'Remote' ? 'Remote work option' : `In your preferred location (${job.location.split(',')[0]})`);
        }
      }

      // Default reason if limited profile data
      if (matchReasons.length === 0) {
        if (job.featured) {
          score += 20;
          matchReasons.push('Featured high-growth opportunity');
        } else {
          matchReasons.push('Actively recruiting verified employer');
        }
      }

      const matchPercent = Math.min(98, Math.max(65, score));
      return {
        job,
        score: matchPercent,
        primaryReason: matchReasons[0],
      };
    });

    // Sort by score descending and return top 3
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3);
  }, [jobs, currentCandidate]);

  // Filtered & Sorted Jobs
  const filteredJobs = useMemo(() => {
    return jobs
      .filter((j) => {
        if (j.status !== 'published') return false;

        // Search text
        if (search) {
          const q = search.toLowerCase();
          const matchTitle = (j.title || '').toLowerCase().includes(q);
          const matchCompany = (j.companyName || '').toLowerCase().includes(q);
          const matchSkills = (j.preferredSkills || []).some((s) => typeof s === 'string' && s.toLowerCase().includes(q));
          const matchOverview = (j.overview || '').toLowerCase().includes(q);
          if (!matchTitle && !matchCompany && !matchSkills && !matchOverview) return false;
        }

        // Location
        if (location) {
          const loc = location.toLowerCase();
          if (!(j.location || '').toLowerCase().includes(loc) && !(j.workMode || '').toLowerCase().includes(loc)) {
            return false;
          }
        }

        // Work mode
        if (workMode !== 'All' && j.workMode !== workMode) {
          return false;
        }

        // Employment type
        if (employmentType !== 'All' && j.employmentType !== employmentType) {
          return false;
        }

        // Experience level
        if (experienceLevel !== 'All' && j.experienceLevel !== experienceLevel) {
          return false;
        }

        // Specific skill tag
        if (selectedSkill !== 'All' && !j.preferredSkills.includes(selectedSkill)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'salary') return b.salary.max - a.salary.max;
        if (sortBy === 'applicants') return b.applicantsCount - a.applicantsCount;
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      });
  }, [jobs, search, location, workMode, employmentType, experienceLevel, selectedSkill, sortBy]);

  const handleResetFilters = () => {
    setSearch('');
    setLocation('');
    setWorkMode('All');
    setEmploymentType('All');
    setExperienceLevel('All');
    setSelectedSkill('All');
    setSortBy('latest');
  };

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(location) ||
    workMode !== 'All' ||
    employmentType !== 'All' ||
    experienceLevel !== 'All' ||
    selectedSkill !== 'All';

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Job Seeker Pathway &bull; Verified Opportunities</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Find Jobs
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore {filteredJobs.length} active verified openings tailored for your career journey.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-slate-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 shadow-2xs focus:outline-hidden cursor-pointer"
            >
              <option value="latest">Recently Posted</option>
              <option value="salary">Highest Compensation</option>
              <option value="applicants">Most Active</option>
            </select>
          </div>
        </div>

        {/* SECTION 4 REQUIREMENT: Dedicated 'Recommended for You' at the top */}
        {!hasActiveFilters && recommendedJobsWithReasons.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Recommended for You
                  </h2>
                  <p className="text-xs text-slate-500">
                    Calculated from your profile skills, target roles, and preferred location
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {recommendedJobsWithReasons.map(({ job, score, primaryReason }) => {
                const isSaved = savedJobIds.includes(job.id);
                return (
                  <div
                    key={`rec-${job.id}`}
                    className="bg-white rounded-3xl p-5 border border-emerald-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group"
                  >
                    {/* Recommendation Match Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-extrabold border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{score}% Match</span>
                      </span>

                      <button
                        onClick={() => (isSaved ? unsaveJob(job.id) : saveJob(job.id))}
                        className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                          isSaved
                            ? 'text-emerald-700 bg-emerald-50'
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                        }`}
                        title={isSaved ? 'Saved' : 'Save for later'}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-600' : ''}`} />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                          {job.title}
                        </h3>
                        <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{job.companyName}</span>
                          <span className="text-slate-300">&bull;</span>
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{job.location}</span>
                        </div>
                      </div>

                      {/* Match explanation text */}
                      <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] font-medium text-emerald-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span className="truncate">{primaryReason}</span>
                      </div>

                      {/* Compensation and Job Type */}
                      <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                        <span className="font-bold text-slate-900">
                          {job.salary?.currency || '₹'}{job.salary?.min ? (job.salary.min / 100000).toFixed(1) : '6'} - {job.salary?.max ? (job.salary.max / 100000).toFixed(1) : '12'} LPA
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {job.workMode || 'Hybrid'}
                        </span>
                      </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        className="flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => setSelectedJobForApply(job)}
                        className="flex-1 py-2 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search job title, skill, or keyword..."
                className="w-full text-xs text-slate-900 bg-transparent focus:outline-hidden"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State, or Remote..."
                className="w-full text-xs text-slate-900 bg-transparent focus:outline-hidden"
              />
              {location && (
                <button onClick={() => setLocation('')} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Work Mode */}
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70">
              <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                className="w-full text-xs text-slate-700 bg-transparent focus:outline-hidden cursor-pointer"
              >
                <option value="All">All Work Modes</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            {/* Experience Level */}
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full text-xs text-slate-700 bg-transparent focus:outline-hidden cursor-pointer"
              >
                <option value="All">All Experience Levels</option>
                <option value="Fresher">Fresher (0 years)</option>
                <option value="Junior">Junior (1-2 years)</option>
                <option value="Mid">Mid (3-5 years)</option>
                <option value="Senior">Senior (5+ years)</option>
              </select>
            </div>
          </div>

          {/* Skill Filter Tags & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Skills:</span>
              <button
                onClick={() => setSelectedSkill('All')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedSkill === 'All'
                    ? 'bg-[#062e22] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {allSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(skill)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedSkill === skill
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* All Active Jobs Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              All Active Job Openings ({filteredJobs.length})
            </h2>
          </div>

          {jobs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No jobs available yet.</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                New verified positions are published regularly. Please check back shortly or create your profile to receive alerts.
              </p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No matching jobs found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                We could not find any active openings matching your criteria. Try adjusting your search query or removing filters.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-[#062e22] text-white text-xs font-bold hover:bg-[#0b3b2c] transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
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
