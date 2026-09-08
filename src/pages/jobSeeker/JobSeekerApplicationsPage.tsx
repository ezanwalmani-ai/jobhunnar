import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Application, ApplicationStatus } from '../../types';
import { Briefcase, Building2, Calendar, Clock, CheckCircle2, ChevronRight, Sparkles, Filter, Search, ArrowRight } from 'lucide-react';

interface JobSeekerApplicationsPageProps {
  navigate: (route: string) => void;
}

export const JobSeekerApplicationsPage: React.FC<JobSeekerApplicationsPageProps> = ({ navigate }) => {
  const { currentCandidate, applications, jobs } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const myApps = applications.filter((app) => app.candidateId === currentCandidate?.id);

  const filteredApps = myApps.filter((app) => {
    if (filterStatus !== 'All' && app.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return app.jobTitle.toLowerCase().includes(q) || app.companyName.toLowerCase().includes(q);
    }
    return true;
  });

  const statusBadge: Record<string, { bg: string; text: string; label: string }> = {
    applied: { bg: 'bg-blue-50 text-blue-700 border-blue-200', text: 'text-blue-700', label: 'Applied' },
    under_review: { bg: 'bg-amber-50 text-amber-700 border-amber-200', text: 'text-amber-700', label: 'Under Review' },
    shortlisted: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: 'text-emerald-700', label: 'Shortlisted' },
    interview_scheduled: { bg: 'bg-purple-50 text-purple-700 border-purple-200', text: 'text-purple-700', label: 'Interview Scheduled' },
    hired: { bg: 'bg-emerald-600 text-white border-emerald-600', text: 'text-white', label: 'Hired' },
    rejected: { bg: 'bg-slate-100 text-slate-600 border-slate-200', text: 'text-slate-600', label: 'Archived' },
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Job Seeker Journey</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Applications
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Track the live progress of your job applications and recruiter interview invitations.
            </p>
          </div>

          <button
            onClick={() => navigate('/jobs')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Explore Open Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stats summary banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Total Submitted</span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{myApps.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Under Review</span>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">
              {myApps.filter((a) => a.status === 'under_review').length}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Shortlisted</span>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">
              {myApps.filter((a) => a.status === 'shortlisted').length}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Interviews</span>
            <p className="text-2xl font-extrabold text-purple-600 mt-1">
              {myApps.filter((a) => a.status === 'interview_scheduled' || (a as any).status === 'Interview').length}
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title or company..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 text-slate-700 focus:outline-hidden focus:border-emerald-600 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="applied">Applied</option>
              <option value="under_review">Under Review</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview_scheduled">Interview Scheduled</option>
              <option value="hired">Hired</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {filteredApps.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No applications found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {searchQuery || filterStatus !== 'All'
                  ? 'Try clearing your search or status filters.'
                  : 'You have not submitted any applications yet. Browse verified openings to get started.'}
              </p>
              <button
                onClick={() => navigate('/jobs')}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors cursor-pointer"
              >
                Browse Open Jobs
              </button>
            </div>
          ) : (
            filteredApps.map((app) => {
              const statusCfg = statusBadge[app.status] || {
                bg: 'bg-slate-100 text-slate-700 border-slate-200',
                label: app.status,
              };

              return (
                <div
                  key={app.id}
                  className="p-5 sm:p-6 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-slate-900 text-base">{app.jobTitle}</span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusCfg.bg}`}
                      >
                        {statusCfg.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {app.companyName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Applied on {app.appliedDate}
                      </span>
                      <span className="text-emerald-700 font-semibold">
                        Score: {app.matchScore}% skill match
                      </span>
                    </div>

                    {/* Latest timeline note */}
                    {app.timeline && app.timeline.length > 0 && (
                      <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>
                          <strong>{app.timeline[app.timeline.length - 1].status}:</strong>{' '}
                          {app.timeline[app.timeline.length - 1].note || 'Application updated'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      onClick={() => navigate(`/jobs/${app.jobId}`)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Job</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
