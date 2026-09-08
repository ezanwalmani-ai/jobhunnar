import React, { useEffect } from 'react';
import { HunarLogo } from '../components/HunarLogo';
import {
  Calendar,
  Briefcase,
  Users,
  GraduationCap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Target,
  HeartHandshake,
  Lightbulb,
  TrendingUp,
  Compass,
  Building2,
  FileCheck,
  Search,
  MessageSquare,
  Award,
  Layers,
} from 'lucide-react';

interface AboutPageProps {
  navigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  // Set SEO Page Title and Meta Description
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'About HUNAR | Skills, Opportunities & Career Growth';

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Learn about HUNAR, a career platform connecting job seekers with employers and helping individuals build skills for their career growth. Founded in January 2026.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* 1. HERO SECTION */}
      <header className="bg-[#062e22] text-white pt-12 pb-16 sm:pt-16 sm:pb-20 relative overflow-hidden border-b border-emerald-900/50">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          {/* Founding Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 text-xs sm:text-sm font-semibold shadow-xs">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Founded in January 2026</span>
          </div>

          {/* Large Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Helping People Find Opportunities.{' '}
            <span className="text-emerald-400">Helping Talent Get Discovered.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal max-w-2xl mx-auto">
            HUNAR is a career platform that connects job seekers with employers and helps individuals build the skills they need to move forward in their careers.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => navigate('/jobs')}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2 group"
            >
              <span>Explore Jobs</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => navigate('/employer/post-job')}
              className="px-6 py-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-white font-bold text-sm border border-emerald-700/60 transition-all cursor-pointer shadow-xs"
            >
              Hire Talent
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-16 sm:space-y-20">

        {/* 2. WHAT IS HUNAR? */}
        <section aria-labelledby="what-is-hunar-title" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              <span>Overview</span>
            </div>
            <h2 id="what-is-hunar-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              What is HUNAR?
            </h2>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <p className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              HUNAR brings job seekers, employers, and learning opportunities together in one place.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-emerald-800" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">For Job Seekers</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  HUNAR helps them discover jobs, present their skills, apply for opportunities, and improve their career readiness.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center mb-3">
                  <Building2 className="w-5 h-5 text-blue-800" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">For Employers</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  HUNAR provides a way to discover candidates and connect with people who may be a good fit for their roles.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center mb-3">
                  <GraduationCap className="w-5 h-5 text-purple-800" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">For Lifelong Learners</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  For individuals who want to improve themselves, HUNAR provides access to upskilling and career-development opportunities.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 font-medium text-sm sm:text-base leading-relaxed flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                The goal is simple: <strong>Make it easier for people to move forward in their careers and make it easier for employers to find talent.</strong>
              </span>
            </div>
          </div>
        </section>

        {/* 3. THREE CORE AREAS */}
        <section aria-labelledby="three-core-areas-title" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 id="three-core-areas-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Three Core Areas
            </h2>
            <p className="text-sm text-slate-600">
              How HUNAR supports every participant in the career ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: FIND OPPORTUNITIES */}
            <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6 hover:border-emerald-300 transition-colors">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>For Job Seekers</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">FIND OPPORTUNITIES</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Discover job opportunities, create your professional profile, showcase your skills, and connect with employers.
                </p>
              </div>
              <button
                onClick={() => navigate('/jobs')}
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 group cursor-pointer pt-2"
              >
                <span>Find Jobs</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </article>

            {/* Card 2: FIND TALENT */}
            <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6 hover:border-emerald-300 transition-colors">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  <Users className="w-3.5 h-3.5" />
                  <span>For Employers</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">FIND TALENT</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Connect with candidates, discover relevant talent, and build your hiring pipeline.
                </p>
              </div>
              <button
                onClick={() => navigate('/employer/post-job')}
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 group cursor-pointer pt-2"
              >
                <span>Hire Talent</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </article>

            {/* Card 3: BUILD SKILLS */}
            <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6 hover:border-emerald-300 transition-colors">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>For Everyone</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">BUILD SKILLS</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Develop practical skills, improve your career readiness, and prepare yourself for new opportunities.
                </p>
              </div>
              <button
                onClick={() => navigate('/jobs')}
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 group cursor-pointer pt-2"
              >
                <span>Explore Upskilling</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </article>
          </div>
        </section>

        {/* 4. WHY HUNAR EXISTS */}
        <section aria-labelledby="why-hunar-exists-title" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" />
              <span>Our Purpose</span>
            </div>
            <h2 id="why-hunar-exists-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why We Built HUNAR
            </h2>
          </div>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p className="text-base sm:text-lg font-semibold text-slate-900">
              Finding a job can be difficult. Finding the right person to hire can be difficult too.
            </p>
            <p>
              People often have skills but struggle to find the right opportunity.
            </p>
            <p>
              Employers often have opportunities but struggle to find the right people.
            </p>
            <p>
              HUNAR was created to help bring these two sides closer together.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900">
              We believe that better opportunities start with better connections &mdash; and better careers are built through continuous learning.
            </div>
          </div>
        </section>

        {/* 5. OUR MISSION */}
        <section aria-labelledby="our-mission-title" className="bg-[#062e22] text-white rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden space-y-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>Vision &amp; Ambition</span>
            </div>
            <h2 id="our-mission-title" className="text-xs uppercase tracking-wider font-bold text-emerald-300">
              Our Mission
            </h2>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              To make career opportunities easier to discover, skills easier to build, and talent easier to connect.
            </p>
          </div>

          <div className="max-w-2xl text-emerald-100/90 text-sm sm:text-base leading-relaxed space-y-3 pt-2">
            <p>
              HUNAR aims to create a career platform where people can continuously learn, discover opportunities, connect with employers, and take the next step in their professional journey.
            </p>
            <p>
              We are building HUNAR with a long-term vision of making career development and talent discovery simpler and more accessible.
            </p>
          </div>
        </section>

        {/* 6. HOW HUNAR WORKS (4-Step Visual Process) */}
        <section aria-labelledby="how-it-works-title" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>Platform Journey</span>
            </div>
            <h2 id="how-it-works-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How HUNAR Works
            </h2>
            <p className="text-sm text-slate-600">
              A simple 4-step path from creating a profile to connecting with employers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: '01',
                title: 'CREATE',
                desc: 'Create your HUNAR profile and tell us about your skills, education, experience, and career interests.',
                icon: FileCheck,
              },
              {
                step: '02',
                title: 'BUILD',
                desc: 'Improve your skills through learning, training, and career-development opportunities.',
                icon: Lightbulb,
              },
              {
                step: '03',
                title: 'DISCOVER',
                desc: 'Explore job opportunities that match your interests, skills, and career goals.',
                icon: Search,
              },
              {
                step: '04',
                title: 'CONNECT',
                desc: 'Connect with employers and take the next step in your career journey.',
                icon: MessageSquare,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      STEP {item.step}
                    </span>
                    <item.icon className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-slate-500 max-w-xl mx-auto pt-1">
            Note: Completing these steps connects you with opportunities but does not imply or guarantee an employment offer.
          </div>
        </section>

        {/* 7. FOR JOB SEEKERS */}
        <section aria-labelledby="for-job-seekers-title" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              <span>For Job Seekers</span>
            </div>
            <h2 id="for-job-seekers-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              For People Looking for Their Next Opportunity
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Whether you are a student looking for your first opportunity, a professional looking for a change, or someone trying to build new skills, HUNAR is designed to help you move forward.
          </p>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">You can:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
              {[
                'Discover job opportunities',
                'Build your professional profile',
                'Showcase your skills',
                'Apply for jobs',
                'Explore upskilling opportunities',
                'Improve your career readiness',
              ].map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-800">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/jobs')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <span>Start Your Career Journey</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </section>

        {/* 8. FOR EMPLOYERS */}
        <section aria-labelledby="for-employers-title" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <Building2 className="w-3.5 h-3.5 text-blue-700" />
              <span>For Employers</span>
            </div>
            <h2 id="for-employers-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              For Employers Looking for Talent
            </h2>
          </div>

          <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
            <p className="font-semibold text-slate-900">Finding the right people matters.</p>
            <p>
              HUNAR helps employers connect with candidates and discover talent for their hiring needs.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Employers can:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
              {[
                'Post job opportunities',
                'Discover candidates',
                'Review candidate profiles',
                'Connect with potential talent',
                'Build their hiring pipeline',
              ].map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-800">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/employer/post-job')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <span>Start Hiring</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </section>

        {/* 9. UPSKILLING */}
        <section aria-labelledby="upskilling-title" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              <GraduationCap className="w-3.5 h-3.5 text-purple-700" />
              <span>Continuous Learning</span>
            </div>
            <h2 id="upskilling-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Your Career Doesn&apos;t Stop at Getting a Job
            </h2>
          </div>

          <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
            <p className="text-base sm:text-lg font-bold text-slate-900">
              Skills can open new doors.
            </p>
            <p>
              HUNAR helps individuals discover opportunities to learn, improve their skills, and become better prepared for the changing world of work.
            </p>
            <p>
              Whether someone wants to learn a new skill, improve an existing one, or prepare for a new career path, upskilling is an important part of the HUNAR ecosystem.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/jobs')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <span>Explore Learning</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </section>

        {/* 10. OUR STORY */}
        <section aria-labelledby="our-story-title" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>Genesis</span>
            </div>
            <h2 id="our-story-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Our Story
            </h2>
          </div>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p className="text-base sm:text-lg font-bold text-slate-900">
              HUNAR was founded in January 2026 with a simple idea: make the journey between skills and opportunities easier.
            </p>
            <p>
              We started HUNAR to bring together three important parts of career growth:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-xs sm:text-sm text-slate-800">
                People looking for opportunities.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-xs sm:text-sm text-slate-800">
                Employers looking for talent.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-xs sm:text-sm text-slate-800">
                Individuals looking to build better skills.
              </div>
            </div>
            <p className="pt-2 text-slate-600">
              As a new platform, we are focused on building a trusted and useful career ecosystem that can grow with our users and the changing world of work.
            </p>
          </div>
        </section>

        {/* 11. WHAT WE BELIEVE */}
        <section aria-labelledby="what-we-believe-title" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" />
              <span>Core Values</span>
            </div>
            <h2 id="what-we-believe-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              What We Believe
            </h2>
            <p className="text-sm text-slate-600">
              The four foundational principles guiding our product and community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                title: 'Skills Matter',
                desc: 'Your skills can create new possibilities.',
                icon: Award,
              },
              {
                title: 'Opportunities Matter',
                desc: 'Everyone should have access to opportunities that can help them move forward.',
                icon: Target,
              },
              {
                title: 'Connections Matter',
                desc: 'The right connection can create the beginning of something valuable.',
                icon: Users,
              },
              {
                title: 'Growth Never Stops',
                desc: 'Learning and improving should continue throughout your career.',
                icon: TrendingUp,
              },
            ].map((belief, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center shrink-0">
                  <belief.icon className="w-5 h-5 text-emerald-700" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">{belief.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{belief.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 12. IMPORTANT TRANSPARENCY SECTION */}
        <section aria-labelledby="transparency-title" className="bg-white rounded-3xl border-2 border-emerald-600/30 p-6 sm:p-10 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-800">
            <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
            <h2 id="transparency-title" className="text-xl sm:text-2xl font-extrabold text-slate-900">
              A Clear Promise
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 font-bold text-sm sm:text-base leading-snug">
            HUNAR connects people with opportunities. We do not guarantee placement.
          </div>

          <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <p>
              HUNAR is a platform that facilitates connections between job seekers and employers.
            </p>
            <p>
              Joining HUNAR, creating a profile, applying for a job, completing training, or using any HUNAR service does not guarantee an interview, job offer, salary, or employment.
            </p>
            <p>
              Hiring decisions are made by employers, and users should evaluate opportunities independently.
            </p>
          </div>
        </section>

        {/* 13. FOUNDING TIMELINE */}
        <section aria-labelledby="timeline-title" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>Platform Milestones</span>
            </div>
            <h2 id="timeline-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Founding Timeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Our ongoing journey as we build a helpful career ecosystem.
            </p>
          </div>

          <div className="relative border-l-2 border-emerald-200 pl-6 sm:pl-8 ml-3 space-y-8">
            {/* January 2026 Milestone */}
            <div className="relative">
              <span className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#062e22] border-4 border-emerald-200" />
              <div className="space-y-1">
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200">
                  January 2026
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">HUNAR Founded</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                  HUNAR begins with the vision of connecting skills, people, and career opportunities.
                </p>
              </div>
            </div>

            {/* Future Milestones Slot */}
            <div className="relative opacity-60">
              <span className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-slate-300 border-4 border-slate-100" />
              <div className="space-y-1">
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
                  Upcoming Milestones
                </div>
                <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                  Expanding skill tracks, candidate mentoring programs, and direct employer collaboration features.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 14. FINAL CTA */}
        <section aria-labelledby="final-cta-title" className="bg-[#062e22] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-md relative overflow-hidden">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 id="final-cta-title" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Your Next Opportunity Starts With a Step.
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Build your skills. Discover opportunities. Connect with people. Keep growing.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => navigate('/jobs')}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Find a Job
            </button>
            <button
              onClick={() => navigate('/employer/post-job')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              Hire Talent
            </button>
            <button
              onClick={() => navigate('/jobs')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              Explore Upskilling
            </button>
          </div>
        </section>

      </main>
    </div>
  );
};
