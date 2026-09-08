import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Application } from '../types';
import {
  X,
  Calendar,
  Clock,
  Video,
  FileText,
  User,
  CheckCircle2,
} from 'lucide-react';

interface ScheduleInterviewModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({
  application,
  isOpen,
  onClose,
}) => {
  const { scheduleInterview, showToast } = useApp();

  const [date, setDate] = useState('2026-09-12');
  const [time, setTime] = useState('11:00 AM IST');
  const [type, setType] = useState<'video' | 'phone' | 'in-person'>('video');
  const [meetingLink, setMeetingLink] = useState('https://meet.google.com/hnr-apex-tech');
  const [notes, setNotes] = useState('Round 1: Technical discussion on system architecture and live coding.');

  if (!isOpen || !application) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleInterview(application.id, date, time, type, meetingLink, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-scaleUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Schedule Candidate Interview</h3>
              <p className="text-[11px] text-slate-500">{application.candidateName} &bull; {application.jobTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Interview Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 mt-1 focus:border-purple-600 focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">Time &amp; Timezone</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 2:00 PM IST"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 mt-1 focus:border-purple-600 focus:outline-hidden"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Interview Type</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {(['video', 'phone', 'in-person'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all cursor-pointer ${
                    type === t
                      ? 'bg-purple-50 border-purple-300 text-purple-900 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Meeting Link / Room Details</label>
            <input
              type="text"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              placeholder="e.g. https://meet.google.com/..."
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 mt-1 focus:border-purple-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Instructions &amp; Agenda</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Brief agenda or instructions for the candidate..."
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 mt-1 focus:border-purple-600 focus:outline-hidden"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-md transition-colors"
            >
              Confirm &amp; Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
