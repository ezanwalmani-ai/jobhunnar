import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, User, Mail, ShieldCheck, Lock, Bell, Check, ArrowRight } from 'lucide-react';

interface EmployerAccountPageProps {
  navigate: (route: string) => void;
}

export const EmployerAccountPage: React.FC<EmployerAccountPageProps> = ({ navigate }) => {
  const { currentUser, currentEmployer, showToast, logout } = useApp();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold mb-2">
              <Building2 className="w-3.5 h-3.5 text-slate-700" />
              <span>Employer Journey</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Recruiter account preferences, security credentials, and role management.
            </p>
          </div>

          <button
            onClick={() => navigate('/employer/dashboard')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF2B1A] hover:bg-[#e02213] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Account Details Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xl border border-purple-200">
                {(currentUser?.name || 'E')[0]}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{currentUser?.name}</h2>
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  Employer
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{currentUser?.email}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Organization: {currentEmployer?.companyName || currentEmployer?.name || 'Configured Organization'}
              </p>
            </div>
          </div>

          {/* Role Status and Security */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#004D40]" />
                Active Role: Verified Employer
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Employer privileges are active. To switch to a job seeker profile, sign out and authenticate with your job seeker account.
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-red-400 text-slate-700 hover:text-red-600 text-xs font-semibold shadow-2xs transition-colors cursor-pointer shrink-0"
            >
              Sign Out
            </button>
          </div>

          {/* Preferences */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-slate-900">Notification Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-slate-800">New Applicant Alerts</span>
                  <p className="text-[11px] text-slate-500">Receive instant notifications when candidates apply to your openings.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="rounded text-[#004D40] focus:ring-[#004D40] h-4 w-4"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-slate-800">Interview Confirmation Digest</span>
                  <p className="text-[11px] text-slate-500">Receive calendar reminders and updates for upcoming scheduled interviews.</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="rounded text-[#004D40] focus:ring-[#004D40] h-4 w-4"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
