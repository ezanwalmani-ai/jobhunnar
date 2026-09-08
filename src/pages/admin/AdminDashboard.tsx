import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Users,
  Building2,
  TrendingUp,
  Sparkles,
  Search,
  Award,
  Check,
  X,
  ExternalLink,
} from 'lucide-react';

interface AdminDashboardProps {
  navigate: (route: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ navigate }) => {
  const { jobs, candidates, companies, applications, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'verifications' | 'jobs' | 'analytics'>('verifications');

  const handleApproveCandidate = (candId: string) => {
    showToast('success', 'Candidate Accredited', 'Verified talent badge issued successfully.');
  };

  const handleApproveCompany = (compId: string) => {
    showToast('success', 'Employer Verified', 'Company accreditation badge active on jobs board.');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-[#062e22] rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-purple-900/80 border border-purple-500/40 text-[11px] font-bold text-purple-300">
                <Shield className="w-3.5 h-3.5" />
                HUNAR HQ &bull; Administrator Operations
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mt-2">Platform Moderation &amp; Verification Center</h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Review credential submissions, accredit employers, and monitor talent placement metrics.
            </p>
          </div>
        </div>

        {/* Analytics row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-semibold text-slate-500">Total Registered Talent</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">{candidates.length}</div>
            <div className="text-[11px] text-emerald-700 font-medium">100% skill evaluated</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-semibold text-slate-500">Partner Companies</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">{companies.length}</div>
            <div className="text-[11px] text-purple-700 font-medium">All KYC verified</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-semibold text-slate-500">Live Opportunities</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">{jobs.length}</div>
            <div className="text-[11px] text-blue-700 font-medium">Published on feed</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-semibold text-slate-500">Application Throughput</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">{applications.length}</div>
            <div className="text-[11px] text-amber-700 font-medium">Avg. response 48 hrs</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'verifications' ? 'bg-[#062e22] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Pending Verifications
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'jobs' ? 'bg-[#062e22] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Moderate Job Postings
          </button>
        </div>

        {/* Tab 1: Verifications */}
        {activeTab === 'verifications' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Candidate Verification Queue */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-700" />
                  <span>Candidate Skill Certifications</span>
                </h3>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Queue Active
                </span>
              </div>

              <div className="space-y-3">
                {candidates.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{c.name}</h4>
                        <p className="text-xs text-slate-500">{c.headline}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                        Verified
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {(c.skills || []).slice(0, 4).map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] text-slate-700 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        onClick={() => handleApproveCandidate(c.id)}
                        className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3 h-3" /> Re-Accredit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Employer Verification Queue */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-700" />
                  <span>Employer Partner Accreditations</span>
                </h3>
                <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md">
                  Queue Active
                </span>
              </div>

              <div className="space-y-3">
                {companies.map((comp) => (
                  <div key={comp.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={comp.logo} alt={comp.companyName || comp.name || 'Company'} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{comp.companyName || comp.name}</h4>
                          <p className="text-[11px] text-slate-500">{comp.industry}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                        Accredited
                      </span>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        onClick={() => handleApproveCompany(comp.id)}
                        className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3 h-3" /> Audit Documents
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Moderate Jobs */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Moderate Active Job Listings</h3>
            <div className="space-y-3">
              {jobs.map((job) => (
                <div key={job.id} className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{job.title}</h4>
                    <p className="text-xs text-slate-500">{job.companyName} &bull; {job.location} &bull; {job.applicantsCount} applicants</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50 text-slate-700 cursor-pointer"
                    >
                      View Job
                    </button>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                      Approved
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
