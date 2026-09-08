import React from 'react';
import { HunarLogo } from './HunarLogo';
import { ShieldCheck, HeartHandshake, Award, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-[#062e22] text-white pt-16 pb-12 border-t border-emerald-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => navigate('/')}
              className="text-left cursor-pointer focus:outline-hidden"
              aria-label="HUNAR Home"
            >
              <HunarLogo
                variant="full"
                theme="light"
                size="md"
                showTagline={true}
              />
            </button>
            <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed max-w-sm pt-2">
              HUNAR is a professional talent marketplace and recruitment consultancy dedicated to training, mentoring, and connecting skilled individuals with top employers worldwide.
            </p>
          </div>

          {/* Job Seekers Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">For Job Seekers</h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <button onClick={() => navigate('/jobs')} className="hover:text-white transition-colors cursor-pointer">
                  Browse All Jobs
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/candidate/profile')} className="hover:text-white transition-colors cursor-pointer">
                  My Profile
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/candidate/dashboard')} className="hover:text-white transition-colors cursor-pointer">
                  My Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors cursor-pointer">
                  Skill Training Programs
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/candidate/interviews')} className="hover:text-white transition-colors cursor-pointer">
                  Interview Preparation
                </button>
              </li>
            </ul>
          </div>

          {/* Employers Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">For Employers</h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <button onClick={() => navigate('/employer/post-job')} className="hover:text-white transition-colors cursor-pointer">
                  Post a Job Opening
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/candidates')} className="hover:text-white transition-colors cursor-pointer">
                  Discover Qualified Talent
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/employer/dashboard')} className="hover:text-white transition-colors cursor-pointer">
                  Recruiter Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/companies')} className="hover:text-white transition-colors cursor-pointer">
                  Verified Employers Directory
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors cursor-pointer">
                  Enterprise Recruitment
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">Platform &amp; Legal</h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors cursor-pointer">
                  About HUNAR
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/support')} className="hover:text-white transition-colors cursor-pointer">
                  Helpdesk &amp; Tickets
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms-and-conditions')} className="hover:text-white transition-colors cursor-pointer">
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-200">HUNAR</span>
            <span>&bull;</span>
            <span>&ldquo;Where Skills Meet Opportunity&rdquo;</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} HUNAR Platform Technologies. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
