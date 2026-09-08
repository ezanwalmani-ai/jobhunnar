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
  ChevronDown,
  BookOpen,
  Target,
  Compass,
  Layers,
  Check,
  Lightbulb,
  FileCheck,
  Send,
  Lock,
} from 'lucide-react';

interface HomePageProps {
  navigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { jobs, currentUser, currentRole } = useApp();

  // Search input state for optional hero search bar
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // Selected job for apply modal
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  // Real published jobs from backend context
  const publishedJobs = (jobs || []).filter((j) => j.status === 'published');
  const previewJobs = publishedJobs.slice(0, 3);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParam = searchQuery.trim() ? `query=${encodeURIComponent(searchQuery.trim())}` : '';
    const locParam = searchLocation.trim() ? `location=${encodeURIComponent(searchLocation.trim())}` : '';
    const params = [queryParam, locParam].filter(Boolean).join('&');
    navigate(params ? `/jobs?${params}` : '/jobs');
  };

  const handleStartJobSeekerJourney = () => {
    if (currentUser && (currentRole === 'job_seeker' || (currentRole as any) === 'candidate')) {
      navigate('/jobs');
    } else {
      navigate('/register/job-seeker');
    }
  };

  const handleStartEmployerJourney = () => {
    if (currentUser && currentRole === 'employer') {
      navigate('/employer/dashboard');
    } else {
      navigate('/register/employer');
    }
  };

  const faqItems = [
    {
      question: 'What is HUNAR?',
      answer:
        'HUNAR is a dedicated career platform and skills-first marketplace. We connect skilled individuals with verified employment opportunities while offering pathways to build, certify, and strengthen career-ready competencies.',
    },
    {
      question: 'Who can use HUNAR?',
      answer:
        'HUNAR serves two primary communities: Job Seekers (students, fresh graduates, and experienced professionals looking to build skills and secure employment) and Employers (companies, hiring managers, and recruiters seeking verified, qualified talent).',
    },
    {
      question: 'How does HUNAR help Job Seekers?',
      answer:
        'HUNAR shifts the focus from static text resumes to verified skills. We provide curated job discovery, skill benchmarking, continuous upskilling pathways, centralized application management, and direct communication with verified employers.',
    },
    {
      question: 'Can I improve my skills through HUNAR?',
      answer:
        'Yes. Through our learning ecosystem, you can identify in-demand skill requirements, access career preparation resources, participate in upskilling programs, and enhance your overall employability.',
    },
    {
      question: 'How do I find jobs?',
      answer:
        'Visit the Find Jobs section to search and filter positions by department, location, work mode, and experience level. You can review detailed job requirements, responsibilities, and benefits before applying.',
    },
    {
      question: 'How do I apply for a job?',
      answer:
        'Once you build your profile as a Job Seeker, you can apply directly to open positions. You can attach your verified profile details, upload customized resumes, and track your submission status from your applications dashboard.',
    },
    {
      question: 'How can employers use HUNAR?',
      answer:
        'Employers can create a verified company account, publish open positions, review structured candidate applications with verified skill matches, schedule interviews, and build high-performing teams.',
    },
    {
      question: 'Are jobs added directly to the platform?',
      answer:
        'Yes. Every opportunity on HUNAR is published directly by verified employers or platform moderators. We do not aggregate unvetted external postings or generate simulated job ads.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#062e22] via-[#093527] to-[#0d4131] text-white pt-14 pb-20 sm:pt-20 sm:pb-28">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Skills-First Career Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Where Skills Meet{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">
                Opportunity.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 leading-relaxed font-normal max-w-2xl mx-auto">
              HUNAR connects skilled individuals with meaningful career opportunities while helping people build relevant skills for the future of work.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigate('/jobs')}
                className="px-6 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-sm font-bold shadow-lg shadow-emerald-950/40 hover:shadow-emerald-950/60 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-emerald-950" />
                <span>Find Jobs</span>
              </button>
              <button
                onClick={() => navigate('/about')}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-bold backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore HUNAR</span>
                <ArrowRight className="w-4 h-4 text-emerald-300" />
              </button>
            </div>
          </div>

          {/* Integrated Quick Search Bar */}
          <div className="mt-10 sm:mt-12 max-w-3xl mx-auto">
            <form
              onSubmit={handleHeroSearch}
              className="bg-white rounded-2xl p-2.5 sm:p-3 shadow-2xl border border-slate-200/80 flex flex-col sm:flex-row items-stretch gap-2"
            >
              <div className="flex-1 flex items-center gap-2.5 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-100">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title, skill, or department..."
                  className="w-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
                />
              </div>

              <div className="flex-1 flex items-center gap-2.5 px-3 py-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="City or 'Remote'..."
                  className="w-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. HUNAR VALUE PROPOSITION */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold">
              The HUNAR Model
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              A Complete Career Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
              HUNAR is designed around more than simply listing vacancies. We bridge the critical gap between demonstrated capability and employment through a unified continuum.
            </p>
          </div>

          {/* Continuum: SKILLS -> LEARNING -> OPPORTUNITY -> CAREER */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs relative">
              <div className="text-emerald-700 font-extrabold text-xs tracking-wider mb-2">STAGE 01</div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                <span>Skills</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Benchmark demonstrated ability rather than relying solely on traditional resume keywords.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs relative">
              <div className="text-emerald-700 font-extrabold text-xs tracking-wider mb-2">STAGE 02</div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <span>Learning</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Close competency gaps through guided career preparation, upskilling, and skill certifications.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs relative">
              <div className="text-emerald-700 font-extrabold text-xs tracking-wider mb-2">STAGE 03</div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-600" />
                <span>Opportunity</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with verified employers looking for precisely what you know and can deliver.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs relative">
              <div className="text-emerald-700 font-extrabold text-xs tracking-wider mb-2">STAGE 04</div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span>Career</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Progress forward with transparent hiring stages, continuous evaluation, and sustainable growth.
              </p>
            </div>
          </div>

          {/* Pillars Overview */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 text-center sm:text-left">
              The Platform Brings Together
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Job Discovery</div>
                  <div className="text-slate-500">Transparent role expectations</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Skills Development</div>
                  <div className="text-slate-500">Continuous competency growth</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Career Readiness</div>
                  <div className="text-slate-500">Interview and role preparation</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Talent Discovery</div>
                  <div className="text-slate-500">Pre-vetted skill evaluations</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Employer Opportunities</div>
                  <div className="text-slate-500">Accredited recruitment pipeline</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FOR JOB SEEKERS */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
            {/* Left Header & CTA */}
            <div className="lg:max-w-md space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold">
                For Job Seekers
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Empowering your career at every stage.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether taking your first professional step or advancing to senior leadership, HUNAR equips you with the tools, clarity, and connections to succeed.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleStartJobSeekerJourney}
                  className="px-6 py-3.5 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-4 h-4 text-emerald-300" />
                </button>
              </div>
            </div>

            {/* Right Feature Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Discover Opportunities</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Find relevant jobs based on your skills, experience, and career goals across verified companies.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Build Your Skills</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Improve your employability through targeted learning, workshops, and verified skill certifications.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <FileCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Create Your Profile</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Build a structured, professional profile that highlights your verified competencies and portfolio.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <Send className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Apply With Confidence</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Apply with verified credentials and manage every submission status from one centralized dashboard.
                </p>
              </div>

              <div className="sm:col-span-2 p-5 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-0.5">Grow Your Career Continuously</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Continue learning, benchmarking new abilities, and unlocking higher-tier roles as your career progresses.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/learning')}
                  className="px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-950 text-xs font-bold hover:bg-emerald-100/60 transition-colors shrink-0 cursor-pointer"
                >
                  Explore Learning
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FOR EMPLOYERS */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#062e22] via-[#08382a] to-[#0d4131] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            {/* Left Header */}
            <div className="lg:max-w-lg space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                For Employers &amp; Hiring Teams
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Hire based on verified capability, not guesswork.
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Connect with candidates whose competencies have been structured and verified against real industry needs. Shorten time-to-hire with transparent candidate profiles.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleStartEmployerJourney}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-[#062e22] text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-emerald-800" />
                  <span>Find Talent</span>
                </button>
              </div>
            </div>

            {/* Right Capabilities Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1.5">
                <div className="text-emerald-300 font-bold text-xs uppercase tracking-wider">01</div>
                <h3 className="text-sm font-bold text-white">Discover Skilled Talent</h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Search through a pre-screened talent directory with clear skill tags, experience, and availability.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1.5">
                <div className="text-emerald-300 font-bold text-xs uppercase tracking-wider">02</div>
                <h3 className="text-sm font-bold text-white">Publish Opportunities</h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Post structured job listings with exact skill requirements, department parameters, and compensation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1.5">
                <div className="text-emerald-300 font-bold text-xs uppercase tracking-wider">03</div>
                <h3 className="text-sm font-bold text-white">Search for Suitable Candidates</h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Filter applicants using precise skill match calculations instead of keyword-stuffed resumes.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1.5">
                <div className="text-emerald-300 font-bold text-xs uppercase tracking-wider">04</div>
                <h3 className="text-sm font-bold text-white">Evaluate Skills &amp; Build Teams</h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Manage stages, schedule interviews directly, and make confident hiring decisions with your team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HOW HUNAR WORKS */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How HUNAR Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
              From onboarding to your next professional milestone, the platform is streamlined for clarity and momentum.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-extrabold flex items-center justify-center text-sm">
                  01
                </div>
                <h3 className="text-base font-bold text-slate-900">Create Your Profile</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Build your professional identity and showcase your verified competencies, credentials, and achievements.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-700">
                Setup your credentials
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-extrabold flex items-center justify-center text-sm">
                  02
                </div>
                <h3 className="text-base font-bold text-slate-900">Build Your Skills</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Learn, improve, and strengthen your career readiness with targeted upskilling pathways.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-700">
                Close competency gaps
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-extrabold flex items-center justify-center text-sm">
                  03
                </div>
                <h3 className="text-base font-bold text-slate-900">Discover Opportunities</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Explore curated jobs that match your skills, preferences, and long-term career aspirations.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-700">
                Transparent matching
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-extrabold flex items-center justify-center text-sm">
                  04
                </div>
                <h3 className="text-base font-bold text-slate-900">Take the Next Step</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Apply with confidence, track updates in real-time, and move forward in your career journey.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-700">
                Real-time tracking
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SKILLS-FIRST APPROACH */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-900 via-[#062e22] to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/15 text-xs font-bold">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Our Core Philosophy</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                A person's potential should not be judged only by a traditional resume.
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed pt-1">
                Static CVs often fail to capture demonstrated capability, practical problem-solving, and continuous learning. At HUNAR, skills, verified competencies, hands-on experience, and willingness to grow all contribute to how talent is discovered.
              </p>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                HUNAR aims to make opportunity more connected to what people can actually do and what they can become, creating fair, merit-driven pathways across industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. LEARNING & UPSKILLING */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="lg:max-w-md space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold">
                Learning &amp; Upskilling
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Don't just look for your next job. Prepare for it.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Continuous improvement is the foundation of long-term career resilience. HUNAR's learning ecosystem prepares you for changing market demands through structured, role-relevant preparation.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/learning')}
                  className="px-6 py-3.5 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-emerald-300" />
                  <span>Explore Learning</span>
                </button>
              </div>
            </div>

            {/* Benefit Items */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Close Skill Gaps</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Identify specific competencies sought by top employers and systematically address gaps.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Improve Employability</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Strengthen your candidate profile with verified skills that recruiters actively search for.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Prepare for Interviews</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Practice technical and domain-specific challenges to build confidence before live recruiter rounds.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Develop Job-Relevant Skills</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Focus on practical, contemporary workflows that match current business needs.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Stay Competitive</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Keep up with fast-evolving technologies and methodologies across key industry sectors.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Progress Professionally</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Unlock promotions and higher-impact roles with documented proof of your continuous growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. OPPORTUNITIES SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
                Live Openings
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Latest Opportunities
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Explore real, verified positions currently published by accredited employers.
              </p>
            </div>

            <button
              onClick={() => navigate('/jobs')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#062e22] hover:text-[#0b3b2c] transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>Browse Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {previewJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {previewJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={(selected) => setSelectedJobForApply(selected)}
                  onViewDetails={(jobId) => navigate(`/jobs/${jobId}`)}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">New opportunities are coming soon.</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Check Find Jobs regularly for the latest opportunities published by verified employers.
              </p>
              <button
                onClick={() => navigate('/jobs')}
                className="mt-2 px-4 py-2 rounded-xl bg-[#062e22] text-white text-xs font-bold hover:bg-[#0b3b2c] transition-colors cursor-pointer"
              >
                Browse Jobs
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. WHY HUNAR */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold">
              The Clear Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Choose HUNAR
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
              Delivering authentic alignment between individual capabilities and organizational objectives.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For Job Seekers */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Built for</span>
                  <h3 className="text-lg font-extrabold text-slate-900">Job Seekers &amp; Professionals</h3>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Skills-focused opportunities:</strong> Connect with jobs mapped directly to your verified strengths.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Career development:</strong> Access structured guidance to reach the next tier in your industry.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Learning and upskilling:</strong> Continuously improve through career readiness programs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Centralized applications:</strong> Manage status stages, interviews, and feedback in one place.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Professional profile:</strong> Present a verified credential package trusted by employers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Sustainable career growth:</strong> Step into positions that offer real upward trajectory.</span>
                </li>
              </ul>
            </div>

            {/* For Employers */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Built for</span>
                  <h3 className="text-lg font-extrabold text-slate-900">Employers &amp; Recruiters</h3>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Access to skilled talent:</strong> Browse candidates evaluated on proven competencies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Skills-focused discovery:</strong> Find applicants that precisely match required capabilities.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Streamlined job posting:</strong> Publish clear, standardized requirements in minutes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Talent pipeline management:</strong> Track hiring stages and schedule interviews directly.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Better alignment:</strong> Higher retention and productivity through accurate role fitting.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. TRUST & TRANSPARENCY */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
              Accountability
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Trust &amp; Transparency
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
              Our marketplace is built upon verifiable processes and factual standards rather than fabricated metrics or unsupported guarantees.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-900">Verified Credentials</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Candidate competencies and employer identities are reviewed to prevent misleading representations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <Layers className="w-6 h-6 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-900">Single Source of Truth</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every published vacancy reflects genuine hiring needs with specified parameters, responsibilities, and terms.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <Users className="w-6 h-6 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-900">Direct Communication</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applicants connect directly with employers without unauthorized third-party brokers or commission agents.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <Lock className="w-6 h-6 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-900">Privacy &amp; Control</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Job seekers maintain full ownership of their personal documentation, resume uploads, and contact visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FAQ SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Everything you need to know about the HUNAR skills-first platform and hiring process.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={item.question}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-emerald-700' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. FINAL CTA */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-[#062e22] via-[#08382a] to-[#062e22] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <HunarLogo variant="mark" theme="light" size="lg" className="mx-auto" />
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Your next opportunity starts with your skills.
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-emerald-100/90 max-w-xl mx-auto leading-relaxed">
            Build your skills. Discover opportunities. Take the next step in your career with HUNAR.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/jobs')}
              className="px-6 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-emerald-950" />
              <span>Find Jobs</span>
            </button>
            <button
              onClick={handleStartJobSeekerJourney}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Join HUNAR</span>
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
