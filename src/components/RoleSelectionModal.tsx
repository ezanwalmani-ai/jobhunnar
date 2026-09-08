import React from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, Building2, Check, ArrowRight, X, Sparkles } from 'lucide-react';
import { HunarLogo } from './HunarLogo';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose?: () => void;
  navigate: (route: string) => void;
  onRoleSelected?: (role: 'job_seeker' | 'employer') => void;
  title?: string;
  subtitle?: string;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen,
  onClose,
  navigate,
  onRoleSelected,
  title = 'How will you use HUNAR?',
  subtitle = 'Choose your path to get a personalized experience tailored to your goals.',
}) => {
  const { currentRole, loginAs, showToast } = useApp();

  if (!isOpen) return null;

  const handleSelect = (role: 'job_seeker' | 'employer') => {
    loginAs(role);
    if (onRoleSelected) {
      onRoleSelected(role);
    } else {
      if (role === 'job_seeker') {
        navigate('/jobs');
      } else {
        navigate('/employer/dashboard');
      }
    }
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="role-selection-heading"
      >
        {/* Close Button if dismissible */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer z-10"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Top Header Banner */}
        <div className="bg-gradient-to-b from-[#062e22] to-[#0a3a2b] text-white px-6 pt-8 pb-7 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
          
          <div className="relative z-10 max-w-lg mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Skill-First Career Platform</span>
            </div>

            <h2 id="role-selection-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-2 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* The Two Roles Grid */}
        <div className="p-6 sm:p-8 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Option 1: Job Seeker */}
            <div
              className={`rounded-2xl border-2 transition-all p-6 flex flex-col justify-between bg-white ${
                currentRole === 'job_seeker'
                  ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-md'
                  : 'border-slate-200 hover:border-emerald-400 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  {currentRole === 'job_seeker' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Check className="w-3 h-3" /> Current Role
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900">Find a Job</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  For students, professionals, freshers, and anyone looking for their next career opportunity.
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>Search and discover available opportunities</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>Build your profile, resume, and track applications</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>Access upskilling &amp; learning opportunities</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4">
                <button
                  type="button"
                  onClick={() => handleSelect('job_seeker')}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue as Job Seeker</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Option 2: Employer */}
            <div
              className={`rounded-2xl border-2 transition-all p-6 flex flex-col justify-between bg-white ${
                currentRole === 'employer'
                  ? 'border-emerald-700 ring-2 ring-emerald-700/20 shadow-md'
                  : 'border-slate-200 hover:border-emerald-600 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  {currentRole === 'employer' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Check className="w-3 h-3" /> Current Role
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900">Hire Talent</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  For companies, recruiters, and organizations looking to find and hire skilled people.
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    <span>Post jobs and specify required skills</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    <span>Search talent with validated capabilities</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    <span>Review applicants and schedule interviews</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4">
                <button
                  type="button"
                  onClick={() => handleSelect('employer')}
                  className="w-full py-3 px-4 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue as Employer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            You can always switch between roles anytime from the navigation header.
          </div>
        </div>
      </div>
    </div>
  );
};
