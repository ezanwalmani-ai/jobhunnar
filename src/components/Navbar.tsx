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
  CheckCheck,
  User,
  Bookmark,
  GraduationCap,
  LayoutDashboard,
  PlusCircle,
  CheckCircle2,
  ChevronDown,
  LogOut,
  Home,
  Sparkles,
  LogIn,
  UserPlus,
} from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, navigate }) => {
  const {
    currentRole,
    currentUser,
    currentCandidate,
    currentEmployer,
    logout,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useApp();

  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const isAuthenticated = Boolean(currentUser);
  const isJobSeeker = isAuthenticated && (currentRole === 'job_seeker' || (currentRole as any) === 'candidate');
  const isEmployer = isAuthenticated && currentRole === 'employer';
  const isAdmin = isAuthenticated && currentRole === 'admin';

  // Navigation action handlers
  const handleHomeClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (currentRoute === '/' || currentRoute === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleAboutClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigate('/about');
  };

  const handleSignOut = () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    logout();
    navigate('/login');
  };

  // Filter unread notifications strictly for current role
  const unreadCount = notifications.filter(
    (n) =>
      !n.read &&
      (n.targetRole === currentRole ||
        (n.targetRole === 'candidate' && isJobSeeker) ||
        (n.targetRole === 'job_seeker' && isJobSeeker) ||
        n.targetRole === 'all')
  ).length;

  // JOB SEEKER LINKS
  // Home | About | Find Jobs | My Applications | Saved Jobs | My Learning / Upskill | My Dashboard
  const jobSeekerLinks = [
    { label: 'Home', action: handleHomeClick, isActive: currentRoute === '/', icon: Home },
    { label: 'About', action: handleAboutClick, isActive: currentRoute === '/about', icon: Sparkles },
    {
      label: 'Find Jobs',
      action: () => navigate('/jobs'),
      isActive: currentRoute === '/jobs' || currentRoute.startsWith('/jobs/'),
      icon: Briefcase,
    },
    {
      label: 'My Applications',
      action: () => navigate('/job-seeker/applications'),
      isActive: currentRoute === '/job-seeker/applications' || currentRoute === '/applications',
      icon: CheckCircle2,
    },
    {
      label: 'Saved Jobs',
      action: () => navigate('/job-seeker/saved-jobs'),
      isActive: currentRoute === '/job-seeker/saved-jobs' || currentRoute === '/saved-jobs',
      icon: Bookmark,
    },
    {
      label: 'My Learning',
      action: () => navigate('/job-seeker/upskill'),
      isActive: currentRoute === '/job-seeker/upskill' || currentRoute === '/learning',
      icon: GraduationCap,
    },
    {
      label: 'Dashboard',
      action: () => navigate('/job-seeker/dashboard'),
      isActive: currentRoute === '/job-seeker/dashboard' || currentRoute === '/dashboard',
      icon: LayoutDashboard,
    },
  ];

  // EMPLOYER LINKS
  // Home | About | Post a Job | Manage Jobs | Applications | Candidates | Employer Dashboard
  const employerLinks = [
    { label: 'Home', action: handleHomeClick, isActive: currentRoute === '/', icon: Home },
    { label: 'About', action: handleAboutClick, isActive: currentRoute === '/about', icon: Sparkles },
    {
      label: 'Post a Job',
      action: () => navigate('/employer/post-job'),
      isActive: currentRoute === '/employer/post-job',
      icon: PlusCircle,
    },
    {
      label: 'Manage Jobs',
      action: () => navigate('/employer/jobs'),
      isActive: currentRoute === '/employer/jobs',
      icon: Briefcase,
    },
    {
      label: 'Applications',
      action: () => navigate('/employer/applications'),
      isActive: currentRoute === '/employer/applications',
      icon: CheckCircle2,
    },
    {
      label: 'Candidates',
      action: () => navigate('/candidates'),
      isActive: currentRoute === '/candidates',
      icon: Users,
    },
    {
      label: 'Dashboard',
      action: () => navigate('/employer/dashboard'),
      isActive: currentRoute === '/employer/dashboard',
      icon: LayoutDashboard,
    },
  ];

  // PUBLIC GUEST LINKS
  const guestLinks = [
    { label: 'Home', action: handleHomeClick, isActive: currentRoute === '/', icon: Home },
    { label: 'About', action: handleAboutClick, isActive: currentRoute === '/about', icon: Sparkles },
    {
      label: 'Find Jobs',
      action: () => navigate('/jobs'),
      isActive: currentRoute === '/jobs' || currentRoute.startsWith('/jobs/'),
      icon: Briefcase,
    },
  ];

  // ADMIN LINKS
  const adminLinks = [
    { label: 'Home', action: handleHomeClick, isActive: currentRoute === '/', icon: Home },
    { label: 'About', action: handleAboutClick, isActive: currentRoute === '/about', icon: Sparkles },
    {
      label: 'Admin Console',
      action: () => navigate('/admin'),
      isActive: currentRoute === '/admin',
      icon: LayoutDashboard,
    },
    {
      label: 'Jobs Registry',
      action: () => navigate('/jobs'),
      isActive: currentRoute === '/jobs',
      icon: Briefcase,
    },
    {
      label: 'Talent Directory',
      action: () => navigate('/candidates'),
      isActive: currentRoute === '/candidates',
      icon: Users,
    },
  ];

  const activeLinks = isJobSeeker
    ? jobSeekerLinks
    : isEmployer
    ? employerLinks
    : isAdmin
    ? adminLinks
    : guestLinks;

  const displayName = isJobSeeker
    ? currentCandidate?.name || currentUser?.name || 'Job Seeker'
    : isEmployer
    ? currentEmployer?.name || currentUser?.name || 'Employer'
    : currentUser?.name || 'User';

  const userInitials = displayName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'H';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Container with responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">
          
          {/* Left: Official HUNAR Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
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
                taglineClassName="hidden sm:inline-block"
                className="shrink-0"
              />
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-1 justify-center max-w-3xl px-2">
            {activeLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.isActive;

              return (
                <button
                  key={link.label}
                  onClick={link.action}
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

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {isAuthenticated ? (
              <>
                {/* Notifications Flyout */}
                <div className="relative shrink-0" ref={notifRef}>
                  <button
                    onClick={() => {
                      setNotifOpen(!notifOpen);
                      setUserMenuOpen(false);
                    }}
                    className="relative p-2 sm:p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center focus:outline-hidden"
                    aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
                  >
                    <div className="relative flex items-center justify-center">
                      <Bell className="w-5 h-5 shrink-0" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 min-w-[17px] h-[17px] px-1 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white shadow-xs pointer-events-none leading-none">
                          {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                      )}
                    </div>
                  </button>

                  {notifOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fadeIn">
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

                {/* Authenticated User Menu Dropdown */}
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
                      {userInitials}
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
                            <div className="text-xs text-slate-500 truncate">{currentUser?.email}</div>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              {isJobSeeker ? 'Job Seeker' : isEmployer ? 'Employer' : 'Administrator'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Job Seeker User Links */}
                      {isJobSeeker && (
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
                        </div>
                      )}

                      {/* Employer User Links */}
                      {isEmployer && (
                        <div className="p-1.5 space-y-0.5">
                          <button
                            onClick={() => {
                              navigate('/employer/dashboard');
                              setUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                          >
                            <LayoutDashboard className="w-4 h-4 text-emerald-700" />
                            <span>Employer Dashboard</span>
                          </button>
                          <button
                            onClick={() => {
                              navigate('/employer/profile');
                              setUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                          >
                            <Building2 className="w-4 h-4 text-emerald-700" />
                            <span>Company Profile</span>
                          </button>
                          <button
                            onClick={() => {
                              navigate('/employer/post-job');
                              setUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                          >
                            <PlusCircle className="w-4 h-4 text-emerald-700" />
                            <span>Post a Job</span>
                          </button>
                          <button
                            onClick={() => {
                              navigate('/employer/jobs');
                              setUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                          >
                            <Briefcase className="w-4 h-4 text-emerald-700" />
                            <span>Manage Jobs</span>
                          </button>
                        </div>
                      )}

                      {/* Sign Out */}
                      <div className="p-1.5">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Public / Guest Controls */
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sign In</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/register/job-seeker')}
                  className="px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#062e22] hover:bg-[#0b3b2c] text-white text-xs font-bold transition-all shadow-xs active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full max-w-full overflow-hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {/* Mobile Navigation Links */}
          <div className="space-y-1">
            {activeLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.isActive;
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    link.action();
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

          {/* Quick links inside drawer if authenticated */}
          {isAuthenticated ? (
            <div className="pt-3 border-t border-slate-100 space-y-1">
              <div className="px-3 text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                {isJobSeeker ? 'My Job Seeker Account' : isEmployer ? 'My Employer Account' : 'Account'}
              </div>
              {isJobSeeker && (
                <button
                  onClick={() => {
                    navigate('/job-seeker/profile');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>My Profile</span>
                </button>
              )}
              {isEmployer && (
                <button
                  onClick={() => {
                    navigate('/employer/profile');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Company Profile</span>
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700"
              >
                <LogOut className="w-3.5 h-3.5 text-red-500" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 text-center"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  navigate('/register/job-seeker');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-[#062e22] text-white text-xs font-bold text-center"
              >
                Register as Job Seeker
              </button>
              <button
                onClick={() => {
                  navigate('/register/employer');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold text-center hover:bg-slate-200"
              >
                Register as Employer
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
