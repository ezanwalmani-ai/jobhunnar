import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JobCard } from '../components/JobCard';
import { ApplyModal } from '../components/ApplyModal';
import { HunarLogo } from '../components/HunarLogo';
import { Job } from '../types';
import {
  Search,
  MapPin,
  Briefcase,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building2,
  TrendingUp,
  Award,
  GraduationCap,
  Clock,
  Star,
  ChevronRight,
} from 'lucide-react';

interface HomePageProps {
  navigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { jobs, candidates, companies, loginAs } = useApp();

  // Hero Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('All');

  // Role journey handlers
  const handleStartJobSeeker = () => {
    loginAs('job_seeker');
    navigate('/jobs');
  };

  const handleStartEmployer = () => {
    loginAs('employer');
    navigate('/employer/dashboard');
  };

  // How it works active tab
  const [worksTab, setWorksTab] = useState<'job_seekers' | 'employers'>('job_seekers');

  // Category filter for featured jobs
  const [activeCategory, setActiveCategory] = useState('All');

  // Apply modal
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs?query=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(searchLocation)}`);
  };

  const featuredJobs = jobs.filter((j) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Tech') return j.department === 'Engineering' || j.department === 'AI Research' || j.department === 'Infrastructure';
    if (activeCategory === 'Finance') return j.department === 'Risk & Analytics' || j.department === 'Finance & Accounts';
    if (activeCategory === 'Operations') return j.department === 'Supply Chain Operations' || j.department === 'Operations';
    if (activeCategory === 'Design') return j.department === 'Design';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#062e22] via-[#093527] to-[#0d4131] text-white pt-12 pb-20 sm:pt-16 sm:pb-28">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Skill-First Talent Marketplace &amp; Consultancy</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Where Skills Meet{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">
                Opportunity.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 leading-relaxed font-normal max-w-2xl mx-auto pt-1">
              Build your verified skills. Discover real career pathways. Connect directly with employers who value what you bring to the table.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigate('/register/job-seeker')}
                className="px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-sm font-bold shadow-lg shadow-emerald-950/40 hover:shadow-emerald-950/60 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-900" />
                <span>Create Job Seeker Account</span>
              </button>
              <button
                onClick={handleStartJobSeeker}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-bold backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>Find Jobs</span>
              </button>
              <button
                onClick={handleStartEmployer}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-bold backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Hire Talent</span>
              </button>
            </div>
          </div>

          {/* Job Search Component inside Hero */}
          <div className="mt-10 sm:mt-14 max-w-4xl mx-auto">
            <form
              onSubmit={handleHeroSearch}
              className="bg-white rounded-2xl p-2.5 sm:p-3 shadow-2xl border border-slate-200 flex flex-col md:flex-row items-stretch gap-2"
            >
              <div className="flex-1 flex items-center gap-2.5 px-3 py-2 border-b md:border-b-0 md:border-r border-slate-100">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title, skill, or keyword (e.g. React, Logistics, Risk)..."
                  className="w-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
                />
              </div>

              <div className="flex-1 flex items-center gap-2.5 px-3 py-2 border-b md:border-b-0 md:border-r border-slate-100">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Location or 'Remote'..."
                  className="w-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-2 px-3 py-1">
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="text-xs sm:text-sm text-slate-600 focus:outline-hidden bg-transparent cursor-pointer"
                >
                  <option value="All">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>Search Jobs</span>
              </button>
            </form>

            {/* Quick Skill Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-emerald-200/80">
              <span className="font-semibold text-emerald-100">Popular Skills:</span>
              {['React', 'TypeScript', 'Risk Analysis', 'Logistics & Dispatch', 'Excel', 'UI/UX', 'Python', 'DevOps'].map(
                (skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => navigate(`/jobs?query=${encodeURIComponent(skill)}`)}
                    className="px-2.5 py-1 rounded-full bg-emerald-950/60 hover:bg-emerald-800/80 border border-emerald-500/20 text-emerald-200 text-xs transition-colors cursor-pointer"
                  >
                    {skill}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. ROLE-AWARE LANDING SECTION: TWO PRIMARY JOURNEYS */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700">Choose Your Pathway</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Two Tailored Experiences in One Platform</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Whether you are discovering career opportunities or hiring skilled candidates, HUNAR provides dedicated tools for your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Find a Job */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#062e22] to-[#0a3a2b] text-white flex flex-col justify-between shadow-md border border-emerald-800/40 relative overflow-hidden group">
              <div className="space-y-3 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">Find a Job</h3>
                <p className="text-sm text-emerald-100/90 leading-relaxed">
                  Discover jobs, build your skills, and take the next step in your career.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs text-emerald-200/80">
                  <span className="px-2.5 py-1 rounded-lg bg-white/10">1-Click Verified Applications</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10">Skill Benchmarking</span>
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <button
                  onClick={handleStartJobSeeker}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Find a Job</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Hire Talent */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col justify-between shadow-md border border-slate-700/60 relative overflow-hidden group">
              <div className="space-y-3 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 text-slate-200 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">Hire Talent</h3>
                <p className="text-sm text-slate-200/90 leading-relaxed">
                  Find skilled people and build your next team with HUNAR.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-300/80">
                  <span className="px-2.5 py-1 rounded-lg bg-white/10">Pre-Vetted Skill Scores</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10">Direct Interview Scheduling</span>
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <button
                  onClick={handleStartEmployer}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Hire Talent</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW HUNAR WORKS (Interactive Section) */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700">Simple &amp; Structured Process</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">How HUNAR Works</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Whether you are advancing your career or hiring qualified team members, HUNAR streamlines the journey.
            </p>

            {/* Tabs for Job Seekers vs Employers */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 mt-6">
              <button
                onClick={() => setWorksTab('job_seekers')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  worksTab === 'job_seekers'
                    ? 'bg-[#062e22] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Job Seekers
              </button>
              <button
                onClick={() => setWorksTab('employers')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  worksTab === 'employers'
                    ? 'bg-[#062e22] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Employers
              </button>
            </div>
          </div>

          {/* Steps Grid */}
          {worksTab === 'job_seekers' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { step: '01', title: 'Create Profile', desc: 'Build your verified HUNAR credentials, skills, and portfolio.', icon: Users },
                { step: '02', title: 'Build Skills', desc: 'Participate in HUNAR training modules and skill certifications.', icon: GraduationCap },
                { step: '03', title: 'Discover Jobs', desc: 'Access curated opportunities matched to your skill proficiency.', icon: Search },
                { step: '04', title: '1-Click Apply', desc: 'Submit applications directly with your verified profile credentials.', icon: ArrowRight },
                { step: '05', title: 'Get Hired', desc: 'Interview directly with vetted recruiters and receive formal offers.', icon: CheckCircle2 },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500/40 hover:bg-emerald-50/20 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-extrabold text-emerald-800 font-mono">{item.step}</span>
                      <item.icon className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { step: '01', title: 'Company Profile', desc: 'Register company details and obtain verified employer status.', icon: Building2 },
                { step: '02', title: 'Post Openings', desc: 'Publish detailed job descriptions with skill-focused criteria.', icon: Briefcase },
                { step: '03', title: 'Discover Talent', desc: 'Filter the active talent pool by validated skills and availability.', icon: Search },
                { step: '04', title: 'Shortlist', desc: 'Review pre-vetted candidate scores and 1-click resumes.', icon: Award },
                { step: '05', title: 'Hire Directly', desc: 'Schedule video interviews and extend verified employment offers.', icon: CheckCircle2 },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500/40 hover:bg-emerald-50/20 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-extrabold text-emerald-800 font-mono">{item.step}</span>
                      <item.icon className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. FEATURED JOBS SECTION */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700">Verified Opportunities</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Featured Job Openings</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Direct listings from actively hiring verified employers</p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
            {['All', 'Tech', 'Finance', 'Operations', 'Design'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#062e22] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.slice(0, 6).map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={(j) => setSelectedJobForApply(j)}
              onViewDetails={(jobId) => navigate(`/jobs/${jobId}`)}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/jobs')}
            className="px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-emerald-600 text-slate-800 text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore All {jobs.length}+ Active Jobs</span>
            <ArrowRight className="w-4 h-4 text-emerald-700" />
          </button>
        </div>
      </section>

      {/* 4. WHY HUNAR SECTION */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700">The HUNAR Advantage</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Why Choose HUNAR</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              We bridge the gap between candidate qualifications and enterprise requirements through structured training and verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Verified Opportunities',
                desc: 'Every company profile and job opening is manually reviewed and accredited by HUNAR recruiters.',
                icon: ShieldCheck,
              },
              {
                title: 'Skill-Focused Profiles',
                desc: 'Move beyond buzzwords. Candidates are evaluated on demonstrated technical skills and practical training.',
                icon: Award,
              },
              {
                title: 'Smarter Candidate Matching',
                desc: 'Match score calculations compare requirements with candidate skills, years of experience, and preferences.',
                icon: Sparkles,
              },
              {
                title: 'Career Support & Mentorship',
                desc: 'Access resume feedback, interview rehearsal sessions, and continuous upskilling workshops.',
                icon: GraduationCap,
              },
              {
                title: 'Employer Talent Discovery',
                desc: 'Recruiters can search directly across the pre-screened talent directory and invite candidates to apply.',
                icon: Users,
              },
              {
                title: 'Seamless 1-Click Application',
                desc: 'No repetitive form filling. Candidates apply with their verified HUNAR credentials in seconds.',
                icon: CheckCircle2,
              },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TWO COLUMNS: FOR EMPLOYERS & FOR CANDIDATES */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* For Employers */}
          <div className="rounded-3xl bg-gradient-to-br from-[#062e22] to-[#0d4131] text-white p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                For Employers &amp; Recruiters
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Find people with the skills your business needs.
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Skip sorting through hundreds of irrelevant resumes. Access pre-screened candidates evaluated on real skills, schedule video interviews, and track your recruitment pipeline.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/90 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Access verified talent pool across Tech, Operations, &amp; Finance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Direct candidate invites &amp; automated application filtering</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Receive official Verified Employer accreditation badge</span>
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <button
                onClick={() => navigate('/employer/post-job')}
                className="px-6 py-3 rounded-xl bg-white text-[#062e22] hover:bg-emerald-50 text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Start Hiring Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* For Candidates */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                For Candidates &amp; Job Seekers
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Your skills deserve the right opportunity.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether you are a fresher taking your first professional step or an experienced specialist looking for career growth, HUNAR certifies your capabilities and connects you with verified employers.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Interactive LinkedIn-style profile with 1-click application</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>HUNAR skill certification and training programs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Real-time application status tracking and interview reminders</span>
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <button
                onClick={() => navigate('/candidate/profile')}
                className="px-6 py-3 rounded-xl bg-[#062e22] text-white hover:bg-[#0b3b2c] text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Create Your Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STATISTICS METRICS */}
      <section className="py-14 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-5xl font-extrabold text-emerald-400 font-mono">10,000+</div>
              <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">Verified Candidates</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-extrabold text-emerald-400 font-mono">500+</div>
              <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">Accredited Employers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-extrabold text-emerald-400 font-mono">2,400+</div>
              <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">Active Career Openings</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-extrabold text-emerald-400 font-mono">95%</div>
              <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">Profile Completion Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700">Real Success Stories</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">What Our Community Says</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'HUNAR certified my full-stack skills and connected me directly with Apex Cloud. Within 2 weeks of completing my profile, I had scheduled 2 technical interviews.',
                author: 'Aarav Sharma',
                role: 'Senior Full Stack Engineer',
                company: 'Apex Cloud Technologies',
                rating: 5,
              },
              {
                quote: 'As an employer hiring across risk and financial operations, HUNAR cut our screening time in half. The candidates come with validated competencies rather than generic claims.',
                author: 'Sarah Jenkins',
                role: 'Head of Talent Acquisition',
                company: 'Apex Cloud Technologies',
                rating: 5,
              },
              {
                quote: 'As a fresher, finding employers willing to evaluate raw aptitude was tough. HUNAR’s logistics certification gave me credibility, and I landed my dispatch coordinator role.',
                author: 'Kavya Verma',
                role: 'Operations Executive',
                company: 'LogiCore Logistics',
                rating: 5,
              },
            ].map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200">
                  <div className="font-bold text-slate-900 text-sm">{t.author}</div>
                  <div className="text-xs text-emerald-800 font-medium">{t.role}</div>
                  <div className="text-[11px] text-slate-500">{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL BIG CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#062e22] via-[#09392b] to-[#062e22] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <HunarLogo variant="mark" theme="light" size="lg" className="mx-auto" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Your next opportunity starts here.
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl mx-auto leading-relaxed">
            Join thousands of skilled professionals and forward-thinking companies connecting on HUNAR every day.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleStartJobSeeker}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg transition-all cursor-pointer"
            >
              Find a Job
            </button>
            <button
              onClick={handleStartEmployer}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              Hire Talent
            </button>
          </div>
        </div>
      </section>

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
