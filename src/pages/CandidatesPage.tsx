import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CandidateCard } from '../components/CandidateCard';
import { CandidateProfileModal } from '../components/CandidateProfileModal';
import { CandidateProfile } from '../types';
import {
  Search,
  MapPin,
  Briefcase,
  Users,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

interface CandidatesPageProps {
  navigate: (route: string) => void;
}

export const CandidatesPage: React.FC<CandidatesPageProps> = ({ navigate }) => {
  const { candidates, inviteCandidateToApply, jobs } = useApp();

  // Filters
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [expLevel, setExpLevel] = useState('All');
  const [availability, setAvailability] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');

  // Selected candidate modal
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile | null>(null);

  // Skill pool
  const allSkills = useMemo(() => {
    const set = new Set<string>();
    candidates.forEach((c) => c.skills.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [candidates]);

  // Filtered Candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      // Search text
      if (search) {
        const q = search.toLowerCase();
        const matchName = (c.name || '').toLowerCase().includes(q);
        const matchHeadline = (c.headline || '').toLowerCase().includes(q);
        const matchSkills = (c.skills || []).some((s) => typeof s === 'string' && s.toLowerCase().includes(q));
        if (!matchName && !matchHeadline && !matchSkills) return false;
      }

      // Location
      if (location && !(c.location || '').toLowerCase().includes(location.toLowerCase())) {
        return false;
      }

      // Exp Level
      if (expLevel !== 'All' && c.experienceLevel !== expLevel) {
        return false;
      }

      // Availability
      if (availability !== 'All' && !(c.availability || '').toLowerCase().includes(availability.toLowerCase())) {
        return false;
      }

      // Skill
      if (selectedSkill !== 'All' && !c.skills.includes(selectedSkill)) {
        return false;
      }

      return true;
    });
  }, [candidates, search, location, expLevel, availability, selectedSkill]);

  const handleReset = () => {
    setSearch('');
    setLocation('');
    setExpLevel('All');
    setAvailability('All');
    setSelectedSkill('All');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/70 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>HUNAR Skill-Certified Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Talent &amp; Candidate Directory</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse {filteredCandidates.length} pre-screened professionals ready for hiring and contract opportunities
            </p>
          </div>

          <button
            onClick={() => navigate('/employer/post-job')}
            className="px-4 py-2 rounded-xl bg-[#062e22] text-white text-xs font-bold hover:bg-[#0b3b2c] transition-colors self-start sm:self-auto cursor-pointer"
          >
            Post Job to Invite Talent
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Candidate name, role, or skill..."
                className="w-full text-xs text-slate-900 bg-transparent focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or Region..."
                className="w-full text-xs text-slate-900 bg-transparent focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50">
              <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={expLevel}
                onChange={(e) => setExpLevel(e.target.value)}
                className="w-full text-xs text-slate-700 bg-transparent focus:outline-hidden cursor-pointer"
              >
                <option value="All">All Experience Levels</option>
                <option value="Fresher">Fresher (0 yrs)</option>
                <option value="Junior">Junior (1-2 yrs)</option>
                <option value="Mid">Mid (3-5 yrs)</option>
                <option value="Senior">Senior (5+ yrs)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50">
              <Users className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full text-xs text-slate-700 bg-transparent focus:outline-hidden cursor-pointer"
              >
                <option value="All">All Availabilities</option>
                <option value="Immediate">Immediate Joining</option>
                <option value="15 Days">Within 15 Days</option>
                <option value="1 Month">1 Month Notice</option>
              </select>
            </div>
          </div>

          {/* Skill pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Skills:</span>
              <button
                onClick={() => setSelectedSkill('All')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedSkill === 'All' ? 'bg-[#062e22] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {allSkills.slice(0, 10).map((skill) => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(skill)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedSkill === skill ? 'bg-emerald-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>

            {(search || location || expLevel !== 'All' || availability !== 'All' || selectedSkill !== 'All') && (
              <button
                onClick={handleReset}
                className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Candidates Grid */}
        {filteredCandidates.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No candidates match this search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Try adjusting your skill filters or location to discover more qualified talent on HUNAR.
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-[#062e22] text-white text-xs font-bold hover:bg-[#0b3b2c] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onViewProfile={(c) => setSelectedCandidate(c)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Candidate Profile Modal */}
      <CandidateProfileModal
        candidate={selectedCandidate}
        isOpen={Boolean(selectedCandidate)}
        onClose={() => setSelectedCandidate(null)}
        onInvite={(candId) => {
          const firstJob = jobs.find((j) => j.status === 'published');
          if (firstJob) {
            inviteCandidateToApply(candId, firstJob.id);
          }
        }}
      />
    </div>
  );
};
