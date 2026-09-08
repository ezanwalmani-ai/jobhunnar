import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Download, Upload, CheckCircle2, ShieldCheck, ArrowRight, Eye, Sparkles } from 'lucide-react';

interface JobSeekerResumePageProps {
  navigate: (route: string) => void;
}

export const JobSeekerResumePage: React.FC<JobSeekerResumePageProps> = ({ navigate }) => {
  const { currentCandidate, showToast } = useApp();
  const [uploading, setUploading] = useState(false);

  const handleUploadResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      setTimeout(() => {
        setUploading(false);
        showToast('success', 'Resume Uploaded', `Successfully updated active resume to ${file.name}`);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Job Seeker Journey</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Resume
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your career documents, credentials, and active resume presented to employers.
            </p>
          </div>

          <button
            onClick={() => navigate('/job-seeker/profile')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-emerald-600 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Edit My Profile</span>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
          </button>
        </div>

        {/* Current Active Resume Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">
                    {currentCandidate?.resumeFileName || 'Aarav_Sharma_FullStack_2026.pdf'}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" /> Active
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Uploaded &bull; Verified format &bull; 245 KB PDF
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={currentCandidate?.resumeUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </a>
              <a
                href={currentCandidate?.resumeUrl || '#'}
                download
                className="px-3.5 py-2 rounded-lg bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
          </div>

          {/* Upload New Resume */}
          <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-xl p-6 text-center bg-slate-50/50 hover:bg-emerald-50/20 transition-all">
            <input
              type="file"
              id="resume-file-input"
              accept=".pdf,.doc,.docx"
              onChange={handleUploadResume}
              className="hidden"
            />
            <label
              htmlFor="resume-file-input"
              className="cursor-pointer flex flex-col items-center justify-center space-y-2"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                {uploading ? 'Processing Resume...' : 'Click to replace or upload updated resume'}
              </span>
              <span className="text-[11px] text-slate-500">
                PDF, DOCX up to 10MB &bull; Parsed directly into your verified skills
              </span>
            </label>
          </div>
        </div>

        {/* Verification & Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Resume Health &amp; Format
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Your resume matches HUNAR verified formatting standards. Employers can parse your work history and verified skill badges automatically.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Direct Employer Visibility
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Whenever you apply with 1-click on HUNAR, this verified resume is delivered directly to the recruiter with your skill verification score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
