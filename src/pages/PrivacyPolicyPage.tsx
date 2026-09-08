import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Lock, Eye, CheckCircle2, Mail } from 'lucide-react';

interface PrivacyPolicyPageProps {
  navigate: (route: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ navigate }) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Privacy Policy | HUNAR';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Hero Header */}
      <header className="bg-[#062e22] text-white border-b border-emerald-900/50 pt-10 pb-12 sm:pt-14 sm:pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-200 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/80 px-3.5 py-2 rounded-xl border border-emerald-800/60 transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/70 border border-emerald-700/60 text-emerald-300 text-xs font-semibold mb-3">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Data Protection &amp; Confidentiality</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
              Learn how HUNAR collects, safeguards, and uses candidate and employer information.
            </p>
            <div className="pt-2 text-xs text-emerald-200/80">
              Last Updated: September 5, 2026 &bull; HUNAR Platform Technologies
            </div>
          </div>
        </div>
      </header>

      {/* Content Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-700" />
              <span>1. Overview &amp; Scope</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              At HUNAR (&ldquo;HUNAR&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), we take your privacy and professional confidentiality seriously. This Privacy Policy outlines our practices concerning the collection, storage, use, and disclosure of personal information when you use the HUNAR website, job marketplace, training programs, and talent portals.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-700" />
              <span>2. Information We Collect</span>
            </h2>
            <ul className="space-y-2 text-sm sm:text-base text-slate-700 list-disc list-outside pl-5 leading-relaxed">
              <li><strong>Candidate Profile Information:</strong> Name, email address, telephone number, city/location, current headline, work experience history, educational credentials, certifications, and uploaded resume documents.</li>
              <li><strong>Employer &amp; Recruiter Information:</strong> Company name, verified business domain, official email address, hiring role requirements, and recruiter contact details.</li>
              <li><strong>Application &amp; Placement Data:</strong> Records of jobs applied to, interview schedules, match score calculations, and communication notes between candidates and employers.</li>
              <li><strong>Platform Usage Data:</strong> Technical logs, device type, browser information, and interaction history for security monitoring and feature optimization.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>3. How We Use Your Information</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              We process personal information strictly for legitimate recruitment and career-advancement purposes:
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-slate-700 list-disc list-outside pl-5 leading-relaxed">
              <li>Connecting qualified job seekers with genuine employment vacancies.</li>
              <li>Verifying candidate qualifications, skills, and background credentials.</li>
              <li>Providing career upskilling recommendations, interview scheduling, and job alerts.</li>
              <li>Protecting the community against fraudulent listings, spam, and security compromises.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-700" />
              <span>4. Data Security &amp; Sharing</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              HUNAR does not sell or rent personal information to third-party data brokers or marketing agencies. Your resume and application documents are only shared with authorized recruiters when you explicitly apply for an active job vacancy or enable public profile visibility.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-emerald-700" />
              <span>5. Contact Privacy Officer</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              If you have any questions, requests to update or delete your information, or inquiries regarding this Privacy Policy, please reach out to our privacy compliance desk:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800">
              <p className="font-bold text-slate-900">HUNAR Data Privacy Office</p>
              <p>Email: <a href="mailto:privacy@hunarjobs.in" className="text-emerald-700 hover:underline">privacy@hunarjobs.in</a></p>
              <p>Platform: HUNAR Platform Technologies</p>
            </div>
          </section>

          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={() => navigate('/terms-and-conditions')}
              className="px-4 py-2.5 rounded-xl bg-[#062e22] text-white text-xs font-bold hover:bg-[#0b3b2c] transition-colors cursor-pointer"
            >
              View Terms &amp; Conditions
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
