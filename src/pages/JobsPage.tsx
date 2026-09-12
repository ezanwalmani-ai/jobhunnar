import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { JobCard } from '../components/JobCard';
import { ApplyModal } from '../components/ApplyModal';
import { Job } from '../types';
import { ScrollReveal, StaggerGroup, StaggerItem, EASE_PREMIUM, TextMaskReveal, ScrollProgress } from '../lib/motion';
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  X,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Building2,
  Calendar,
  DollarSign,
  SlidersHorizontal,
  BookOpen,
  UserCheck,
  RefreshCw,
  AlertCircle,
  Clock,
  ArrowRight,
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

  // Loading & Error States
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Mobile Filter Drawer State
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter States
  const [search, setSearch] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [department, setDepartment] = useState<string>('All');
  const [workMode, setWorkMode] = useState<string>('All');
  const [employmentType, setEmploymentType] = useState<string>('All');
  const [experienceLevel, setExperienceLevel] = useState<string>('All');
  const [salaryRange, setSalaryRange] = useState<string>('All');
  const [datePosted, setDatePosted] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'relevance' | 'salary_high' | 'salary_low'>('recent');

  // Apply Modal state
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);

  // Simulate initial load / reload
  useEffect(() => {
    setIsLoading(true);
    setLoadError(null);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 280);
    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setIsLoading(true);
    setLoadError(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  // SOURCE OF TRUTH: published jobs only from backend
  const publishedJobs = useMemo(() => {
    return (jobs || []).filter((j) => j && j.status === 'published');
  }, [jobs]);

  // Dynamically extract categories / departments strictly from published jobs
  const availableDepartments = useMemo(() => {
    const set = new Set<string>();
    publishedJobs.forEach((j) => {
      if (j.department && typeof j.department === 'string' && j.department.trim()) {
        set.add(j.department.trim());
      }
    });
    return Array.from(set).sort();
  }, [publishedJobs]);

  // Dynamically extract skills strictly from published jobs
  const availableSkills = useMemo(() => {
    const set = new Set<string>();
    publishedJobs.forEach((j) => {
      (j.preferredSkills || []).forEach((s) => {
        if (typeof s === 'string' && s.trim()) {
          set.add(s.trim());
        }
      });
    });
    return Array.from(set).sort().slice(0, 16);
  }, [publishedJobs]);

  // Filtered & Sorted Jobs derived strictly from published backend jobs
  const filteredJobs = useMemo(() => {
    const now = Date.now();

    return publishedJobs
      .filter((j) => {
        // Keyword search (title, company, skills, overview, department)
        if (search && search.trim()) {
          const q = search.toLowerCase().trim();
          const titleMatch = (j.title || '').toLowerCase().includes(q);
          const companyMatch = (j.companyName || '').toLowerCase().includes(q);
          const overviewMatch = (j.overview || '').toLowerCase().includes(q);
          const deptMatch = (j.department || '').toLowerCase().includes(q);
          const industryMatch = (j.industry || '').toLowerCase().includes(q);
          const skillsMatch = (j.preferredSkills || []).some(
            (s) => typeof s === 'string' && s.toLowerCase().includes(q)
          );
          if (!titleMatch && !companyMatch && !overviewMatch && !deptMatch && !industryMatch && !skillsMatch) {
            return false;
          }
        }

        // Location text or filter
        if (location && location.trim()) {
          const loc = location.toLowerCase().trim();
          const jobLoc = (j.location || '').toLowerCase();
          const jobMode = (j.workMode || '').toLowerCase();
          if (!jobLoc.includes(loc) && !jobMode.includes(loc)) {
            return false;
          }
        }

        // Department
        if (department !== 'All' && j.department !== department) {
          return false;
        }

        // Work Mode
        if (workMode !== 'All' && j.workMode !== workMode) {
          return false;
        }

        // Employment Type
        if (employmentType !== 'All' && j.employmentType !== employmentType) {
          return false;
        }

        // Experience Level
        if (experienceLevel !== 'All' && j.experienceLevel !== experienceLevel) {
          return false;
        }

        // Skill tag
        if (selectedSkill !== 'All' && !(j.preferredSkills || []).includes(selectedSkill)) {
          return false;
        }

        // Salary Range
        if (salaryRange !== 'All') {
          const maxSalary = j.salary?.max || j.salary?.min || 0;
          const minSalary = j.salary?.min || 0;
          if (salaryRange === 'under_6' && maxSalary > 600000 && maxSalary !== 0) {
            return false;
          }
          if (salaryRange === '6_to_12' && (maxSalary < 600000 || (minSalary > 1200000 && minSalary !== 0))) {
            return false;
          }
          if (salaryRange === '12_to_20' && (maxSalary < 1200000 || (minSalary > 2000000 && minSalary !== 0))) {
            return false;
          }
          if (salaryRange === '20_plus' && maxSalary < 2000000) {
            return false;
          }
        }

        // Date Posted
        if (datePosted !== 'All' && j.postedDate) {
          const postedTime = new Date(j.postedDate).getTime();
          if (!isNaN(postedTime)) {
            const diffHours = (now - postedTime) / (1000 * 60 * 60);
            if (datePosted === '24h' && diffHours > 24) return false;
            if (datePosted === '7d' && diffHours > 24 * 7) return false;
            if (datePosted === '30d' && diffHours > 24 * 30) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'salary_high') {
          const aMax = a.salary?.max || a.salary?.min || 0;
          const bMax = b.salary?.max || b.salary?.min || 0;
          return bMax - aMax;
        }
        if (sortBy === 'salary_low') {
          const aMin = a.salary?.min || a.salary?.max || 0;
          const bMin = b.salary?.min || b.salary?.max || 0;
          return aMin - bMin;
        }
        if (sortBy === 'relevance' && currentCandidate?.skills) {
          const aSkills = currentCandidate.skills.filter((s) => (a.preferredSkills || []).includes(s)).length;
          const bSkills = currentCandidate.skills.filter((s) => (b.preferredSkills || []).includes(s)).length;
          return bSkills - aSkills;
        }
        // Default 'recent'
        const timeA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
        const timeB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
        return timeB - timeA;
      });
  }, [
    publishedJobs,
    search,
    location,
    department,
    workMode,
    employmentType,
    experienceLevel,
    salaryRange,
    datePosted,
    selectedSkill,
    sortBy,
    currentCandidate,
  ]);

  // Real-time Match Recommendations: only shown if published jobs exist AND candidate is logged in with profile skills
  const recommendedJobs = useMemo(() => {
    if (publishedJobs.length === 0) return [];
    if (!currentCandidate || !Array.isArray(currentCandidate.skills) || currentCandidate.skills.length === 0) {
      return [];
    }

    const candidateSkills = currentCandidate.skills;
    const scored = publishedJobs
      .map((job) => {
        const matches = (job.preferredSkills || []).filter((s) =>
          candidateSkills.some(
            (cs) => typeof cs === 'string' && typeof s === 'string' && cs.toLowerCase() === s.toLowerCase()
          )
        );
        const matchPercent = Math.round(
          Math.min(98, 68 + (matches.length / Math.max(1, (job.preferredSkills || []).length)) * 30)
        );
        return { job, score: matchPercent, matchCount: matches.length };
      })
      .filter((item) => item.matchCount > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return scored;
  }, [publishedJobs, currentCandidate]);

  const handleResetFilters = () => {
    setSearch('');
    setLocation('');
    setDepartment('All');
    setWorkMode('All');
    setEmploymentType('All');
    setExperienceLevel('All');
    setSalaryRange('All');
    setDatePosted('All');
    setSelectedSkill('All');
    setSortBy('recent');
  };

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(location) ||
    department !== 'All' ||
    workMode !== 'All' ||
    employmentType !== 'All' ||
    experienceLevel !== 'All' ||
    salaryRange !== 'All' ||
    datePosted !== 'All' ||
    selectedSkill !== 'All';

  // Strict opportunity count label
  const opportunityCountLabel = useMemo(() => {
    const count = filteredJobs.length;
    if (count === 0) return '0 opportunities';
    if (count === 1) return '1 opportunity';
    return `${count} opportunities`;
  }, [filteredJobs.length]);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <ScrollProgress />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <ScrollReveal direction="up" distance={16}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#004D40] text-xs font-bold border border-teal-200">
                <Briefcase className="w-3.5 h-3.5 text-[#004D40]" />
                <span>Verified Career Marketplace</span>
              </div>
              <TextMaskReveal
                as="h1"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#101828] tracking-tight"
                delay={0.1}
                duration={0.65}
              >
                Find Your Next Opportunity
              </TextMaskReveal>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                Discover opportunities based on skills, experience, and career interests. Every opening is published and verified by trusted employers.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="md:hidden px-4 py-2.5 rounded-xl border border-[#D0D5DD] bg-white text-[#101828] text-xs font-bold shadow-2xs flex items-center gap-2 cursor-pointer min-h-[44px]"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#667085]" />
                <span>Filters {hasActiveFilters && '(Active)'}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#667085] font-semibold hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-bold px-3 py-2.5 rounded-xl border border-[#D0D5DD] bg-white text-[#101828] shadow-2xs focus:outline-hidden cursor-pointer min-h-[44px]"
                  aria-label="Sort job listings"
                >
                  <option value="recent">Most Recent</option>
                  <option value="relevance">Relevance</option>
                  <option value="salary_high">Salary: High to Low</option>
                  <option value="salary_low">Salary: Low to High</option>
                </select>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Search Bar & Primary Filter Controls */}
        <ScrollReveal direction="up" delay={0.06} distance={18}>
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E4E7EC] shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Primary Search Input */}
            <div className="md:col-span-7 flex items-center gap-2.5 px-4 py-3 rounded-2xl border border-[#D0D5DD] bg-[#F7F8FA] focus-within:border-[#061226] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#061226]/10 transition-all">
              <Search className="w-4 h-4 text-[#667085] shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jobs, skills, companies or keywords"
                className="w-full text-xs sm:text-sm text-[#101828] bg-transparent focus:outline-hidden placeholder:text-[#667085]"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="p-1 text-[#667085] hover:text-[#101828] cursor-pointer rounded-full"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location Input */}
            <div className="md:col-span-5 flex items-center gap-2.5 px-4 py-3 rounded-2xl border border-[#D0D5DD] bg-[#F7F8FA] focus-within:border-[#061226] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#061226]/10 transition-all">
              <MapPin className="w-4 h-4 text-[#667085] shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State, or Remote..."
                className="w-full text-xs sm:text-sm text-[#101828] bg-transparent focus:outline-hidden placeholder:text-[#667085]"
              />
              {location && (
                <button
                  onClick={() => setLocation('')}
                  className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer rounded-full"
                  title="Clear location"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Secondary Filter Dropdowns (Desktop & Tablet) */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            {/* Department */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-hidden cursor-pointer"
              >
                <option value="All">All Departments</option>
                {availableDepartments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Work Mode */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Work Mode</label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-hidden cursor-pointer"
              >
                <option value="All">All Work Modes</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            {/* Experience Level */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Experience</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-hidden cursor-pointer"
              >
                <option value="All">All Experience</option>
                <option value="Fresher">Fresher (0 yrs)</option>
                <option value="Junior">Junior (1-2 yrs)</option>
                <option value="Mid">Mid (3-5 yrs)</option>
                <option value="Senior">Senior (5+ yrs)</option>
                <option value="Lead">Lead</option>
              </select>
            </div>

            {/* Salary Range */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Salary Range</label>
              <select
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-hidden cursor-pointer"
              >
                <option value="All">All Salaries</option>
                <option value="under_6">Up to ₹6 LPA</option>
                <option value="6_to_12">₹6 LPA - ₹12 LPA</option>
                <option value="12_to_20">₹12 LPA - ₹20 LPA</option>
                <option value="20_plus">₹20+ LPA</option>
              </select>
            </div>

            {/* Date Posted */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date Posted</label>
              <select
                value={datePosted}
                onChange={(e) => setDatePosted(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-hidden cursor-pointer"
              >
                <option value="All">Anytime</option>
                <option value="24h">Past 24 hours</option>
                <option value="7d">Past 7 days</option>
                <option value="30d">Past 30 days</option>
              </select>
            </div>
          </div>

          {/* Skill Filter Pills (Extracted dynamically only from published jobs) */}
          {availableSkills.length > 0 && (
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                  Popular Skills:
                </span>
                <button
                  onClick={() => setSelectedSkill('All')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedSkill === 'All'
                      ? 'bg-[#061226] text-white shadow-2xs'
                      : 'bg-[#F7F8FA] text-[#667085] hover:bg-slate-200'
                  }`}
                >
                  All
                </button>
                {availableSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkill(skill === selectedSkill ? 'All' : skill)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedSkill === skill
                        ? 'bg-[#FF2B1A] text-white shadow-2xs'
                        : 'bg-[#F7F8FA] text-[#101828] hover:bg-slate-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#FF2B1A] hover:text-[#e02213] font-bold flex items-center gap-1 cursor-pointer py-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>
          )}
        </div>
        </ScrollReveal>

        {/* Real Profile Recommendations: only if published jobs exist and profile matches */}
        {!hasActiveFilters && recommendedJobs.length > 0 && (
          <ScrollReveal direction="up" delay={0.08}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-[#004D40] text-white flex items-center justify-center shadow-2xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#101828]">
                      Recommended for Your Profile
                    </h2>
                    <p className="text-xs text-[#667085]">
                      Matched with your profile skills: {(currentCandidate?.skills || []).slice(0, 3).join(', ')}
                    </p>
                  </div>
                </div>
              </div>

              <StaggerGroup staggerDelay={0.07} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedJobs.map(({ job, score }) => (
                  <StaggerItem key={`rec-${job.id}`}>
                    <div className="relative h-full">
                      <div className="absolute -top-2.5 right-4 z-10 px-2.5 py-0.5 rounded-full bg-[#004D40] text-white text-[10px] font-extrabold shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{score}% Profile Match</span>
                      </div>
                      <JobCard
                        job={job}
                        onApply={(j) => setSelectedJobForApply(j)}
                        onViewDetails={(id) => navigate(`/jobs/${id}`)}
                      />
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </ScrollReveal>
        )}

        {/* Job Listings Header & Count */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Opportunities
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing <strong className="text-slate-800">{opportunityCountLabel}</strong> from verified employers
                </p>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-slate-600 hover:text-slate-900 font-semibold underline cursor-pointer"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Loading State: Skeleton Cards */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-200 shrink-0" />
                        <div className="space-y-2">
                          <div className="w-24 h-3 bg-slate-200 rounded-sm" />
                          <div className="w-36 h-4 bg-slate-200 rounded-sm" />
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-slate-200 shrink-0" />
                    </div>
                    <div className="flex gap-2">
                      <div className="w-20 h-4 bg-slate-200 rounded-sm" />
                      <div className="w-24 h-4 bg-slate-200 rounded-sm" />
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="w-full h-3 bg-slate-200 rounded-sm" />
                      <div className="w-3/4 h-3 bg-slate-200 rounded-sm" />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <div className="w-16 h-5 bg-slate-200 rounded-md" />
                      <div className="w-16 h-5 bg-slate-200 rounded-md" />
                      <div className="w-16 h-5 bg-slate-200 rounded-md" />
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="w-20 h-3 bg-slate-200 rounded-sm" />
                      <div className="flex gap-2">
                        <div className="w-16 h-7 bg-slate-200 rounded-lg" />
                        <div className="w-16 h-7 bg-slate-200 rounded-lg" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : loadError ? (
              /* Error State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="p-12 text-center bg-white rounded-3xl border border-rose-200 shadow-xs space-y-4 max-w-lg mx-auto"
              >
                <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">We couldn&apos;t load jobs right now.</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Please check your connection or try refreshing the job feed.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleRetry}
                    className="px-5 py-2.5 rounded-xl bg-[#061226] text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retry</span>
                  </button>
                </div>
              </motion.div>
            ) : publishedJobs.length === 0 ? (
              /* Empty State: Zero Published Jobs in Backend */
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-10 sm:p-14 text-center bg-white rounded-3xl border border-[#E4E7EC] shadow-xs space-y-5 max-w-xl mx-auto"
              >
                <div className="w-16 h-16 rounded-2xl bg-teal-50 text-[#004D40] flex items-center justify-center mx-auto border border-teal-100">
                  <Briefcase className="w-8 h-8 text-[#004D40]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-[#101828]">
                    No opportunities available right now.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#667085] max-w-md mx-auto leading-relaxed">
                    New opportunities are added regularly. Please check back soon.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => navigate('/job-seeker/profile')}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#FF2B1A] hover:bg-[#e02213] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Update My Profile</span>
                  </button>
                  <button
                    onClick={() => navigate('/job-seeker/upskill')}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#D0D5DD] hover:bg-[#F7F8FA] text-[#101828] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <BookOpen className="w-4 h-4 text-[#004D40]" />
                    <span>Explore Learning</span>
                  </button>
                </div>
              </motion.div>
            ) : filteredJobs.length === 0 ? (
              /* Search / Filter yielded 0 results */
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-10 sm:p-14 text-center bg-white rounded-3xl border border-[#E4E7EC] shadow-xs space-y-4 max-w-lg mx-auto"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F7F8FA] text-[#667085] flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-[#101828]">No jobs match your current search.</h3>
                  <p className="text-xs text-[#667085] max-w-sm mx-auto leading-relaxed">
                    Try changing your keywords or filters.
                  </p>
                </div>
                <div className="pt-3">
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 rounded-xl bg-[#061226] text-white text-xs font-bold hover:bg-[#0c1f3d] transition-colors cursor-pointer min-h-[44px] inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Clear Filters</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Jobs Grid with Stagger */
              <StaggerGroup staggerDelay={0.05} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <StaggerItem key={job.id}>
                    <JobCard
                      job={job}
                      onApply={(j) => setSelectedJobForApply(j)}
                      onViewDetails={(jobId) => navigate(`/jobs/${jobId}`)}
                    />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* Mobile Filter Drawer / Modal */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_PREMIUM }}
              className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
                <div className="flex items-center gap-2 font-bold text-[#101828] text-base">
                  <Filter className="w-4 h-4 text-[#004D40]" />
                  <span>Filter Opportunities</span>
                </div>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Department */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Department / Category</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold"
                  >
                    <option value="All">All Departments</option>
                    {availableDepartments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Work Mode */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Work Mode</label>
                  <select
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold"
                  >
                    <option value="All">All Work Modes</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                {/* Employment Type */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Employment Type</label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold"
                  >
                    <option value="All">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>

                {/* Experience Level */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Experience Level</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold"
                  >
                    <option value="All">All Experience Levels</option>
                    <option value="Fresher">Fresher (0 yrs)</option>
                    <option value="Junior">Junior (1-2 yrs)</option>
                    <option value="Mid">Mid (3-5 yrs)</option>
                    <option value="Senior">Senior (5+ yrs)</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>

                {/* Salary Range */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Salary Range</label>
                  <select
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold"
                  >
                    <option value="All">All Salaries</option>
                    <option value="under_6">Up to ₹6 LPA</option>
                    <option value="6_to_12">₹6 LPA - ₹12 LPA</option>
                    <option value="12_to_20">₹12 LPA - ₹20 LPA</option>
                    <option value="20_plus">₹20+ LPA</option>
                  </select>
                </div>

                {/* Date Posted */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Date Posted</label>
                  <select
                    value={datePosted}
                    onChange={(e) => setDatePosted(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold"
                  >
                    <option value="All">Anytime</option>
                    <option value="24h">Past 24 hours</option>
                    <option value="7d">Past 7 days</option>
                    <option value="30d">Past 30 days</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E4E7EC] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2.5 rounded-xl border border-[#D0D5DD] text-[#101828] text-xs font-bold hover:bg-[#F7F8FA] cursor-pointer"
                >
                  Reset All
                </button>
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#FF2B1A] hover:bg-[#e02213] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Show Results
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
