import React, { useState } from 'react';
import { Job } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  CheckCircle2,
  FileText,
  Upload,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
} from 'lucide-react';

interface ApplyModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  navigate?: (route: string) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ job, isOpen, onClose, navigate }) => {
  const { currentCandidate, currentRole, loginAs, applyToJob } = useApp();
  const [coverNote, setCoverNote] = useState('');
  const [selectedResume, setSelectedResume] = useState(
    currentCandidate?.resumeName || 'Aarav_Sharma_FullStack_Resume.pdf'
  );
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !job) return null;

  const candidate = currentCandidate;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) return;
    setSubmitting(true);
    const success = await applyToJob(job.id, coverNote, selectedResume);
    setSubmitting(false);
    if (success) {
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setCoverNote('');
    setAgreedToTerms(false);
    onClose();
  };

  const handleOpenLegal = (route: string) => {
    handleClose();
    if (navigate) {
      navigate(route);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-scaleUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
            />
            <div>
              <div className="text-xs font-semibold text-slate-500">Apply to {job.companyName}</div>
              <h3 className="font-bold text-slate-900 text-base leading-tight">{job.title}</h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900">Application Submitted!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                Your verified HUNAR profile and credentials have been forwarded to {job.companyName}’s talent acquisition team.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Position:</span>
                <span className="font-semibold text-slate-800">{job.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Resume Attached:</span>
                <span className="font-semibold text-slate-800">{selectedResume}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-semibold text-emerald-700">Applied &bull; Under Review</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-[#062e22] text-white text-xs font-bold hover:bg-[#0b3b2c] transition-colors cursor-pointer"
              >
                Return to Jobs
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Role Check */}
            {!candidate ? (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                <p className="font-bold">You are currently browsing as an Employer or Admin.</p>
                <p>Switch to your job seeker profile to apply using your saved profile credentials.</p>
                <button
                  type="button"
                  onClick={() => loginAs('candidate')}
                  className="px-3 py-1.5 rounded-lg bg-amber-800 text-white font-semibold cursor-pointer"
                >
                  Continue with My Profile
                </button>
              </div>
            ) : (
              <>
                {/* Step 1: Pre-filled Profile Card */}
                <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/70 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{candidate.name}</span>
                      <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Profile
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 truncate mt-0.5">{candidate.headline}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(candidate?.skills || []).slice(0, 5).map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded-md bg-white border border-emerald-200 text-[10px] text-emerald-900 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 2: Resume Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Resume Selection</label>
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-5 h-5 text-emerald-700 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{selectedResume}</div>
                        <div className="text-[10px] text-slate-500">Verified HUNAR Profile PDF &bull; Updated recently</div>
                      </div>
                    </div>
                    <label className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 cursor-pointer flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Change</span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setSelectedResume(e.target.files[0].name);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Step 3: Optional Cover Note */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                    <span>Quick Cover Message (Optional)</span>
                    <span className="text-[11px] text-slate-400 font-normal">Max 250 characters</span>
                  </label>
                  <textarea
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Briefly state why you are an ideal fit for this role and your availability..."
                    rows={3}
                    maxLength={250}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                {/* Step 4: Terms & Conditions and Privacy Policy Consent */}
                <div className="pt-1 pb-1">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 select-none">
                    <input
                      type="checkbox"
                      id="apply-consent-checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      required
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-800 focus:ring-emerald-700 cursor-pointer accent-emerald-800 shrink-0"
                    />
                    <span className="leading-snug">
                      I agree to HUNAR&apos;s{' '}
                      <button
                        type="button"
                        onClick={() => handleOpenLegal('/terms-and-conditions')}
                        className="text-emerald-800 font-semibold underline hover:text-emerald-950 cursor-pointer inline"
                      >
                        Terms &amp; Conditions
                      </button>{' '}
                      and{' '}
                      <button
                        type="button"
                        onClick={() => handleOpenLegal('/privacy')}
                        className="text-emerald-800 font-semibold underline hover:text-emerald-950 cursor-pointer inline"
                      >
                        Privacy Policy
                      </button>
                      .
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !agreedToTerms}
                    className="px-5 py-2.5 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit 1-Click Application</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
