import React, { useState, useRef, useEffect } from 'react';
import { HunarLogo } from './HunarLogo';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Briefcase,
  Building2,
  Users,
  Menu,
  X,
  ExternalLink,
  CheckCheck,
  User,
  Bookmark,
  GraduationCap,
  LayoutDashboard,
  PlusCircle,
  CheckCircle2,
  RefreshCw,
  ChevronDown,
  LogOut,
  SlidersHorizontal,
} from 'lucide-react';
import { RoleSelectionModal } from './RoleSelectionModal';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, navigate }) => {
  const {
    currentRole,
    currentUser,
    currentCandidate,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useApp();

  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isJobSeeker = currentRole === 'job_seeker' || (currentRole as any) === 'candidate';
  const isEmployer = currentRole === 'employer';
  const isAdmin = currentRole === 'admin';

  // Unread notifications count
  const unreadCount = notifications.filter(
    (n) =>
      !n.read &&
      (n.targetRole === currentRole ||
        (n.targetRole === 'candidate' && isJobSeeker) ||
        (n.targetRole === 'job_seeker' && isJobSeeker) ||
        n.targetRole === 'all')
  ).length;

  // Strict Job Seeker navigation: Find Jobs, My Dashboard, My Learning / Upskill Job Seeker
  const jobSeekerLinks = [
    { label: 'Find Jobs', route: '/jobs', icon: Briefcase },
    { label: 'My Dashboard', route: '/job-seeker/dashboard', icon: LayoutDashboard },
    { label: 'My Learning / Upskill Job Seeker', route: '/job-seeker/upskill', icon: GraduationCap },
  ];

  // Employer navigation
  const employerLinks = [
    { label: 'Dashboard', route: '/employer/dashboard', icon: LayoutDashboard },
    { label: 'Find Talent', route: '/candidates', icon: Users },
    { label: 'Post a Job', route: '/employer/post-job', icon: PlusCircle },
    { label: 'Manage Jobs', route: '/employer/jobs', icon: Briefcase },
    { label: 'Applications', route: '/employer/applications', icon: CheckCircle2 },
  ];

  // Admin navigation
  const adminLinks = [
    { label: 'Admin Console', route: '/admin', icon: LayoutDashboard },
    { label: 'Find Jobs', route: '/jobs', icon: Briefcase },
    { label: 'Talent Directory', route: '/candidates', icon: Users },
    { label: 'Companies', route: '/companies', icon: Building2 },
  ];

  const activeLinks = isJobSeeker ? jobSeekerLinks : isEmployer ? employerLinks : adminLinks;

  const displayName = isJobSeeker
    ? currentCandidate?.name || currentUser?.name || 'Job Seeker'
    : currentUser?.name || 'Recruiter';
  const userInitials = displayName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        {/* Maximum container width with responsive horizontal padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">
            
            {/* Left: Official HUNAR Brand Logo */}
            <div className="flex items-center gap-3 sm:gap-6 shrink-0">
              <button
                onClick={() => navigate('/')}
                className="flex items-center group text-left cursor-pointer focus:outline-hidden"
                aria-label="HUNAR Home"
              >
                <HunarLogo
                  variant="horizontal"
                  theme="dark"
                  size="md"
                  showTagline={true}
                  className="max-w-[210px] sm:max-w-none"
                />
              </button>
            </div>

            {/* Center: Desktop Navigation Links (Only 3 clean items for Job Seeker!) */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-center max-w-2xl px-2">
              {activeLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  currentRoute === link.route ||
                  (link.route === '/job-seeker/dashboard' &&
                    (currentRoute.startsWith('/job-seeker/dashboard') ||
                      currentRoute === '/job-seeker/applications' ||
                      currentRoute === '/job-seeker/saved-jobs' ||
                      currentRoute === '/job-seeker/profile'));

                return (
                  <button
                    key={link.route}
                    onClick={() => navigate(link.route)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-emerald-50 text-[#062e22] font-bold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <Icon className="w-4 h-4 opacity-80 shrink-0" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right: Controls (Notifications, Role Pill, User Menu, Mobile Toggle) */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              
              {/* Register Button for Job Seekers */}
              <button
                type="button"
                onClick={() => navigate('/register/job-seeker')}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs font-bold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
              >
                <span>Register Free</span>
              </button>

              {/* Role Indicator Pill / Switcher */}
              <div className="hidden sm:flex items-center">
                <button
                  type="button"
                  onClick={() => setRoleModalOpen(true)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-2xs whitespace-nowrap ${
                    isJobSeeker
                      ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300/80'
                      : isEmployer
                      ? 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-300/80'
                      : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-300/80'
                  }`}
                  title="Click to switch role (Job Seeker / Employer)"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>{isJobSeeker ? 'Job Seeker' : isEmployer ? 'Employer' : 'Admin'}</span>
                  <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
                </button>
              </div>

              {/* Notifications Flyout */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => {
                    setNotifOpen(!notifOpen);
                    setUserMenuOpen(false);
                  }}
                  className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fadeIn">
                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">Notifications</span>
                        {unreadCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsAsRead}
                          className="text-xs text-emerald-700 hover:text-emerald-900 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                        </button>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-400">
                          No notifications yet.
                        </div>
                      ) : (
                        notifications.slice(0, 6).map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => {
                              markNotificationAsRead(notif.id);
                              if (notif.link) {
                                navigate(notif.link);
                                setNotifOpen(false);
                              }
                            }}
                            className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer text-left ${
                              !notif.read ? 'bg-emerald-50/40' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-semibold text-slate-900">{notif.title}</span>
                              <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu Dropdown (Contained inside viewport) */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    setNotifOpen(false);
                  }}
                  className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer focus:outline-hidden"
                  aria-label="User account menu"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#062e22] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    {userInitials || 'U'}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fadeIn divide-y divide-slate-100">
                    <div className="p-4 bg-slate-50/80">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#062e22] text-white flex items-center justify-center font-bold text-sm">
                          {userInitials}
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-sm font-bold text-slate-900 truncate">{displayName}</div>
                          <div className="text-xs text-slate-500 truncate">{currentUser?.email || 'user@hunar.careers'}</div>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {isJobSeeker ? 'Job Seeker' : isEmployer ? 'Employer' : 'Administrator'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isJobSeeker ? (
                      <div className="p-1.5 space-y-0.5">
                        <button
                          onClick={() => {
                            navigate('/job-seeker/dashboard');
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                        >
                          <LayoutDashboard className="w-4 h-4 text-emerald-700" />
                          <span>My Dashboard</span>
                        </button>
                        <button
                          onClick={() => {
                            navigate('/job-seeker/applications');
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          <span>My Applications</span>
                        </button>
                        <button
                          onClick={() => {
                            navigate('/job-seeker/saved-jobs');
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                        >
                          <Bookmark className="w-4 h-4 text-emerald-700" />
                          <span>Saved Jobs</span>
                        </button>
                        <button
                          onClick={() => {
                            navigate('/job-seeker/profile');
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                        >
                          <User className="w-4 h-4 text-emerald-700" />
                          <span>My Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            navigate('/job-seeker/onboarding');
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                        >
                          <GraduationCap className="w-4 h-4 text-emerald-700" />
                          <span>Complete Onboarding Flow</span>
                        </button>
                      </div>
                    ) : (
                      <div className="p-1.5 space-y-0.5">
                        <button
                          onClick={() => {
                            navigate('/employer/dashboard');
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                        >
                          <LayoutDashboard className="w-4 h-4 text-blue-700" />
                          <span>Employer Dashboard</span>
                        </button>
                        <button
                          onClick={() => {
                            navigate('/employer/post-job');
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                        >
                          <PlusCircle className="w-4 h-4 text-blue-700" />
                          <span>Post a New Job</span>
                        </button>
                      </div>
                    )}

                    <div className="p-1.5">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          setRoleModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-800 hover:bg-emerald-50 cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Switch User Role</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Hamburger Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer focus:outline-hidden"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer (Strictly contained within viewport width) */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full max-w-full overflow-hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
            {/* Mobile Role Switcher banner */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Role:</span>
                <span className="text-xs font-bold text-slate-900">
                  {isJobSeeker ? 'Job Seeker' : isEmployer ? 'Employer' : 'Administrator'}
                </span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setRoleModalOpen(true);
                }}
                className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Switch</span>
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              {activeLinks.map((link) => {
                const Icon = link.icon;
                const isActive = currentRoute === link.route;
                return (
                  <button
                    key={link.route}
                    onClick={() => {
                      navigate(link.route);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${
                      isActive
                        ? 'bg-emerald-50 text-[#062e22] font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* If Job Seeker, quick links to dashboard areas */}
            {isJobSeeker && (
              <div className="pt-2 border-t border-slate-100 space-y-1">
                <div className="px-3 text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                  Inside My Dashboard
                </div>
                <button
                  onClick={() => {
                    navigate('/job-seeker/applications');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>My Applications</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/job-seeker/saved-jobs');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                  <span>Saved Jobs</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/job-seeker/profile');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/job-seeker/onboarding');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>Complete Onboarding Flow</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/register/job-seeker');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-emerald-800 hover:text-emerald-950"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Create Job Seeker Account</span>
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Role Selection Modal */}
      <RoleSelectionModal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        navigate={navigate}
      />
    </>
  );
};
