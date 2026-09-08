import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobCard } from '../../components/JobCard';
import { ApplyModal } from '../../components/ApplyModal';
import { Job } from '../../types';
import { Bookmark, Sparkles, ArrowRight, Briefcase } from 'lucide-react';

interface JobSeekerSavedJobsPageProps {
  navigate: (route: string) => void;
}

export const JobSeekerSavedJobsPage: React.FC<JobSeekerSavedJobsPageProps> = ({ navigate }) => {
  const { jobs, savedJobIds } = useApp();
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);

  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

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
              Saved Jobs
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Review and apply to the openings you have bookmarked for later.
            </p>
          </div>

          <button
            onClick={() => navigate('/jobs')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Explore More Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Jobs Grid */}
        {savedJobs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">No saved jobs yet</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                While browsing opportunities, click the bookmark icon on any job card to save it here for quick access.
              </p>
            </div>
            <button
              onClick={() => navigate('/jobs')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>Find Verified Jobs</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={(j) => setSelectedJobForApply(j)}
                onViewDetails={(jobId) => navigate(`/jobs/${jobId}`)}
              />
            ))}
          </div>
        )}

        {/* Apply Modal */}
        <ApplyModal
          job={selectedJobForApply}
          isOpen={Boolean(selectedJobForApply)}
          onClose={() => setSelectedJobForApply(null)}
          navigate={navigate}
        />
      </div>
    </div>
  );
};
