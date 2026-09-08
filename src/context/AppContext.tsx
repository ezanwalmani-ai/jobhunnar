import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  CandidateProfile,
  EmployerProfile,
  Job,
  Course,
  Application,
  ApplicationStatus,
  Interview,
  NotificationItem,
  SupportTicket,
  AnalyticsEvent,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_CANDIDATES,
  INITIAL_COMPANIES,
  INITIAL_JOBS,
  INITIAL_COURSES,
  INITIAL_APPLICATIONS,
  INITIAL_INTERVIEWS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SUPPORT_TICKETS,
  INITIAL_ANALYTICS,
} from '../data/mockData';
import confetti from 'canvas-confetti';

interface ToastInfo {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface AppContextType {
  currentUser: User | null;
  currentRole: UserRole;
  currentCandidate: CandidateProfile | null;
  currentEmployer: EmployerProfile | null;
  users: User[];
  candidates: CandidateProfile[];
  companies: EmployerProfile[];
  jobs: Job[];
  courses: Course[];
  applications: Application[];
  interviews: Interview[];
  notifications: NotificationItem[];
  supportTickets: SupportTicket[];
  analyticsEvents: AnalyticsEvent[];
  savedJobIds: string[];
  toasts: ToastInfo[];

  // Auth & Role
  loginAs: (role: UserRole) => void;
  loginWithEmail: (email: string, password?: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  registerJobSeeker: (data: {
    name: string;
    email: string;
    phone?: string;
    password?: string;
    workStatus?: string;
    experienceLevel?: string;
    experienceType?: 'fresher' | 'experienced';
    city?: string;
    state?: string;
    marketingConsent?: boolean;
    avatar?: string;
    isGoogle?: boolean;
  }) => Promise<{ success: boolean; error?: string; user?: User; candidate?: CandidateProfile }>;
  registerEmployer: (data: {
    name: string;
    email: string;
    companyName: string;
    phone?: string;
    password?: string;
    industry?: string;
    location?: string;
    website?: string;
    companySize?: string;
  }) => Promise<{ success: boolean; error?: string; user?: User; employer?: EmployerProfile }>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateUserStatus: (userId: string, status: 'active' | 'suspended') => void;

  // Candidate Actions
  updateCandidateProfile: (updated: Partial<CandidateProfile>) => void;
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  applyToJob: (jobId: string, coverNote?: string, selectedResume?: string) => Promise<boolean>;

  // Employer / Job Actions
  createJob: (newJob: Omit<Job, 'id' | 'postedDate' | 'applicantsCount' | 'viewsCount' | 'isVerifiedCompany'>) => Job;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
  deleteJob: (jobId: string) => void;
  updateJobStatus: (jobId: string, status: Job['status']) => void;
  updateEmployerProfile: (updates: Partial<EmployerProfile>) => void;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus, note?: string) => void;
  scheduleInterview: (interviewData: Omit<Interview, 'id'>) => Interview;
  inviteCandidateToApply: (candidateId: string, jobId: string) => void;

  // Course / Learning Actions (Admin Managed)
  createCourse: (data: Omit<Course, 'id' | 'createdAt'>) => Course;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
  updateCourseStatus: (courseId: string, status: Course['status']) => void;

  // Admin Actions
  verifyEmployer: (employerId: string, status: 'verified' | 'rejected') => void;
  moderateJob: (jobId: string, action: 'approve' | 'pause' | 'delete') => void;
  sendCandidateReminder: (candidateId: string) => void;
  submitSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt'>) => void;
  updateSupportTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;
  exportCsvReport: (type: 'candidates' | 'employers' | 'jobs' | 'applications') => void;

  // General Actions
  trackEvent: (eventName: string, metadata?: Record<string, any>, targetId?: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  showToast: (type: ToastInfo['type'], title: string, message?: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initial State from localStorage or default mocks (No fake marketplace data)
  const [currentUser, setCurrentUser] = useState<User>(() => {
    try {
      const stored = localStorage.getItem('hunar_currentUser');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.role === 'candidate') parsed.role = 'job_seeker';
        return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_USERS[0]; // default to Admin
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    if (currentUser?.role === 'candidate') return 'job_seeker';
    return currentUser ? currentUser.role : 'job_seeker';
  });

  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem('hunar_users');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((u: any) => (u.role === 'candidate' ? { ...u, role: 'job_seeker' } : u));
      }
    } catch {
      // fallback
    }
    return INITIAL_USERS;
  });

  const [candidates, setCandidates] = useState<CandidateProfile[]>(() => {
    try {
      const stored = localStorage.getItem('hunar_candidates');
      if (stored) {
        const list: CandidateProfile[] = JSON.parse(stored);
        return list.filter((c) => !['cand-1', 'cand-2', 'cand-3', 'cand-4', 'cand-5', 'cand-aarav'].includes(c.id));
      }
    } catch {
      // fallback
    }
    return INITIAL_CANDIDATES;
  });

  const [companies, setCompanies] = useState<EmployerProfile[]>(() => {
    try {
      const stored = localStorage.getItem('hunar_companies');
      if (stored) {
        const list = JSON.parse(stored);
        const filtered = list.filter((c: any) => !['emp-1', 'emp-2', 'emp-3', 'emp-4', 'emp-5'].includes(c.id));
        return filtered.map((c: any) => ({
          ...c,
          name: c.companyName || c.name || '',
          companyName: c.companyName || c.name || '',
          size: c.companySize || c.size || '',
          companySize: c.companySize || c.size || '',
          description: c.about || c.description || '',
          about: c.about || c.description || '',
          verified: c.verificationStatus === 'verified' || c.verified,
        }));
      }
    } catch {
      // fallback
    }
    return INITIAL_COMPANIES;
  });

  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const stored = localStorage.getItem('hunar_jobs');
      if (stored) {
        const list: Job[] = JSON.parse(stored);
        return list.filter((j) => !['job-1', 'job-2', 'job-3', 'job-4', 'job-5'].includes(j.id));
      }
    } catch {
      // fallback
    }
    return INITIAL_JOBS;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const stored = localStorage.getItem('hunar_courses');
      return stored ? JSON.parse(stored) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const stored = localStorage.getItem('hunar_applications');
      if (stored) {
        const list: Application[] = JSON.parse(stored);
        return list.filter((a) => !['app-1', 'app-2', 'app-3', 'app-4'].includes(a.id));
      }
    } catch {
      // fallback
    }
    return INITIAL_APPLICATIONS;
  });

  const [interviews, setInterviews] = useState<Interview[]>(() => {
    try {
      const stored = localStorage.getItem('hunar_interviews');
      if (stored) {
        const list: Interview[] = JSON.parse(stored);
        return list.filter((i) => !['int-1', 'int-2', 'int-3'].includes(i.id));
      }
    } catch {
      // fallback
    }
    return INITIAL_INTERVIEWS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const stored = localStorage.getItem('hunar_notifications');
      return stored ? JSON.parse(stored) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    try {
      const stored = localStorage.getItem('hunar_supportTickets');
      return stored ? JSON.parse(stored) : INITIAL_SUPPORT_TICKETS;
    } catch {
      return INITIAL_SUPPORT_TICKETS;
    }
  });

  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>(() => {
    try {
      const stored = localStorage.getItem('hunar_analytics');
      return stored ? JSON.parse(stored) : INITIAL_ANALYTICS;
    } catch {
      return INITIAL_ANALYTICS;
    }
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('hunar_savedJobs');
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed.filter((id) => !['job-1', 'job-2', 'job-3', 'job-4', 'job-5'].includes(id)) : [];
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('hunar_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('hunar_candidates', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem('hunar_companies', JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('hunar_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('hunar_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('hunar_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('hunar_interviews', JSON.stringify(interviews));
  }, [interviews]);

  useEffect(() => {
    localStorage.setItem('hunar_savedJobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem('hunar_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('hunar_users', JSON.stringify(users));
  }, [users]);

  // Derived current profiles
  const currentCandidate =
    (currentUser
      ? candidates.find((c) => c.userId === currentUser.id || c.email.toLowerCase() === currentUser.email.toLowerCase())
      : null) || null;

  const currentEmployer =
    (currentUser
      ? companies.find((e) => e.userId === currentUser.id || (e.recruiterEmail && e.recruiterEmail.toLowerCase() === currentUser.email.toLowerCase()))
      : null) || null;

  // Toast System
  const showToast = (type: ToastInfo['type'], title: string, message?: string) => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Analytics event tracker
  const trackEvent = (eventName: string, metadata?: Record<string, any>, targetId?: string) => {
    const newEvent: AnalyticsEvent = {
      id: 'ev-' + Date.now(),
      eventName,
      userId: currentUser?.id,
      userRole: currentRole,
      targetId,
      metadata,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setAnalyticsEvents((prev) => [newEvent, ...prev]);
  };

  // Auth & Roles
  const loginAs = (role: UserRole) => {
    const normalizedRole = role === 'candidate' ? 'job_seeker' : role;
    const match = users.find(
      (u) => u.role === normalizedRole || (normalizedRole === 'job_seeker' && u.role === 'candidate')
    );
    if (match) {
      const updatedUser = { ...match, role: normalizedRole };
      setCurrentUser(updatedUser);
      setCurrentRole(normalizedRole);
      const roleDisplayName =
        normalizedRole === 'job_seeker' ? 'Job Seeker' : normalizedRole === 'employer' ? 'Employer' : 'Administrator';
      showToast('success', `Active as ${roleDisplayName}`, `Welcome back, ${match.name}`);
      trackEvent('user_login', { role: normalizedRole });
    }
  };

  const loginWithEmail = async (
    email: string,
    password?: string
  ): Promise<{ success: boolean; error?: string; user?: User }> => {
    const trimmed = email.trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === trimmed);
    if (!user) {
      return {
        success: false,
        error: 'No account found with this email address. Please register for a free HUNAR account first.',
      };
    }
    const normalizedRole = user.role === 'candidate' ? 'job_seeker' : user.role;
    const updatedUser = { ...user, role: normalizedRole };
    setCurrentUser(updatedUser);
    setCurrentRole(normalizedRole);
    showToast('success', `Welcome back, ${user.name}!`, `Signed in as ${user.email}`);
    trackEvent('user_login', { method: 'email', role: normalizedRole });
    return { success: true, user: updatedUser };
  };

  const registerJobSeeker = async (data: {
    name: string;
    email: string;
    phone?: string;
    password?: string;
    workStatus?: string;
    experienceLevel?: string;
    experienceType?: 'fresher' | 'experienced';
    city?: string;
    state?: string;
    marketingConsent?: boolean;
    avatar?: string;
    isGoogle?: boolean;
  }): Promise<{ success: boolean; error?: string; user?: User; candidate?: CandidateProfile }> => {
    const trimmedEmail = data.email.trim().toLowerCase();
    const existingUser = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existingUser) {
      return {
        success: false,
        error: 'An account with this email address already exists. Please sign in instead.',
      };
    }

    if (data.phone) {
      const cleanPhone = data.phone.replace(/\D/g, '');
      if (cleanPhone.length >= 10) {
        const existingCandidateByPhone = candidates.find(
          (c) => c.phone && c.phone.replace(/\D/g, '').includes(cleanPhone.slice(-10))
        );
        if (existingCandidateByPhone) {
          return {
            success: false,
            error: 'An account with this mobile number already exists.',
          };
        }
      }
    }

    const newUserId = 'user-js-' + Date.now();
    const newUser: User = {
      id: newUserId,
      name: data.name.trim(),
      email: trimmedEmail,
      role: 'job_seeker',
      avatar:
        data.avatar ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}&backgroundColor=062e22`,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: 'Just now',
    };

    const newCandidateId = 'cand-' + Date.now();
    const locationStr = [data.city, data.state].filter(Boolean).join(', ') || 'India';
    const isFresher =
      data.experienceType === 'fresher' ||
      data.experienceLevel?.toLowerCase().includes('fresher');

    const newCandidate: CandidateProfile = {
      id: newCandidateId,
      userId: newUserId,
      name: data.name.trim(),
      email: trimmedEmail,
      phone: data.phone || '',
      location: locationStr,
      city: data.city || '',
      state: data.state || '',
      headline: isFresher ? 'Aspiring Professional | Open to Opportunities' : 'Job Seeker',
      about: '',
      currentRole: isFresher ? 'Fresher' : 'Job Seeker',
      desiredRole: isFresher ? 'Entry-Level Associate' : 'Open to Opportunities',
      experienceLevel: isFresher ? 'Fresher' : 'Junior',
      experienceType: isFresher ? 'fresher' : 'experienced',
      workStatus: data.workStatus || 'Looking for a job',
      yearsOfExperience: isFresher ? 0 : 1,
      preferredLocation: locationStr,
      workPreference: 'Hybrid',
      availability: 'Immediate',
      profileVisibility: 'employers_only',
      availableForOpportunities: true,
      skills: [],
      education: [],
      experiences: [],
      certifications: [],
      completionPercentage: 20, // Baseline for basic registration
      recommendations: [],
      avatar: newUser.avatar,
      marketingConsent: !!data.marketingConsent,
      lastActive: 'Just now',
    };

    setUsers((prev) => [newUser, ...prev]);
    setCandidates((prev) => [newCandidate, ...prev]);
    setCurrentUser(newUser);
    setCurrentRole('job_seeker');

    showToast(
      'success',
      'Account Created Successfully',
      `Welcome to HUNAR, ${data.name.split(' ')[0]}!`
    );
    trackEvent('user_registered', {
      method: data.isGoogle ? 'google' : 'email',
      experienceType: newCandidate.experienceType,
      marketingConsent: newCandidate.marketingConsent,
    });

    return { success: true, user: newUser, candidate: newCandidate };
  };

  const registerEmployer = async (data: {
    name: string;
    email: string;
    companyName: string;
    phone?: string;
    password?: string;
    industry?: string;
    location?: string;
    website?: string;
    companySize?: string;
  }): Promise<{ success: boolean; error?: string; user?: User; employer?: EmployerProfile }> => {
    const trimmedEmail = data.email.trim().toLowerCase();
    const existingUser = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existingUser) {
      return {
        success: false,
        error: 'An account with this email address already exists. Please sign in instead.',
      };
    }

    const newUserId = 'user-emp-' + Date.now();
    const newUser: User = {
      id: newUserId,
      name: data.name.trim(),
      email: trimmedEmail,
      role: 'employer',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.companyName)}&backgroundColor=062e22`,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: 'Just now',
    };

    const newEmployerId = 'emp-' + Date.now();
    const newEmployer: EmployerProfile = {
      id: newEmployerId,
      userId: newUserId,
      name: data.companyName.trim(),
      companyName: data.companyName.trim(),
      industry: data.industry || 'Technology & Services',
      location: data.location || 'India',
      website: data.website || '',
      companySize: data.companySize || '11-50',
      size: data.companySize || '11-50',
      recruiterName: data.name.trim(),
      recruiterRole: 'Hiring Manager',
      recruiterEmail: trimmedEmail,
      recruiterPhone: '',
      about: `Verified organization account for ${data.companyName.trim()}.`,
      description: `Verified organization account for ${data.companyName.trim()}.`,
      benefits: ['Competitive Compensation', 'Health Coverage', 'Growth Opportunities'],
      culture: 'Skill-driven, collaborative, and forward-thinking.',
      socialLinks: {},
      verified: true,
      verificationStatus: 'verified',
      activeJobsCount: 0,
      logo: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.companyName)}&backgroundColor=062e22`,
    };

    const updatedUsers = [...users, newUser];
    const updatedCompanies = [...companies, newEmployer];

    setUsers(updatedUsers);
    setCompanies(updatedCompanies);
    setCurrentUser(newUser);
    setCurrentRole('employer');

    try {
      localStorage.setItem('hunar_users', JSON.stringify(updatedUsers));
      localStorage.setItem('hunar_companies', JSON.stringify(updatedCompanies));
      localStorage.setItem('hunar_currentUser', JSON.stringify(newUser));
    } catch {
      // fallback
    }

    showToast('success', 'Employer Account Created', `Welcome to HUNAR Employer Hub, ${data.name}!`);
    trackEvent('employer_register', { email: trimmedEmail, company: data.companyName });

    return { success: true, user: newUser, employer: newEmployer };
  };

  const switchRole = (role: UserRole) => {
    loginAs(role);
  };

  const logout = () => {
    setCurrentUser(null as any);
    setCurrentRole('job_seeker');
    showToast('info', 'Signed Out', 'You have been signed out successfully.');
  };

  const updateUserStatus = (userId: string, status: 'active' | 'suspended') => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status } : u))
    );
    showToast('info', 'User Status Updated', `User is now marked as ${status}.`);
  };

  // Candidate Actions
  const updateCandidateProfile = (updates: Partial<CandidateProfile>) => {
    if (!currentCandidate) return;
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === currentCandidate.id) {
          const updated = { ...c, ...updates };
          // Progressive score calculation
          let score = 20; // 20% baseline from basic registration
          if (updated.headline && updated.headline.length > 5) score += 10;
          if (updated.about && updated.about.length > 15) score += 10;
          if (updated.education && updated.education.length > 0) score += 15;
          if (
            updated.experienceType === 'fresher' ||
            (updated.experiences && updated.experiences.length > 0)
          ) {
            score += 15;
          }
          if (updated.skills && updated.skills.length >= 3) score += 15;
          if (updated.desiredRole && updated.desiredRole.length > 3) score += 5;
          if (updated.resumeName || updated.resumeUrl) score += 10;
          
          if (typeof updates.completionPercentage === 'number') {
            updated.completionPercentage = updates.completionPercentage;
          } else {
            updated.completionPercentage = Math.min(100, Math.max(score, c.completionPercentage || 20));
          }
          return updated;
        }
        return c;
      })
    );
    showToast('success', 'Profile Updated', 'Your HUNAR profile changes have been saved.');
    trackEvent('profile_updated', { candidateId: currentCandidate.id });
  };

  const saveJob = (jobId: string) => {
    if (!savedJobIds.includes(jobId)) {
      setSavedJobIds((prev) => [...prev, jobId]);
      showToast('success', 'Job Saved', 'Added to your saved jobs portfolio.');
      trackEvent('job_saved', { jobId });
    }
  };

  const unsaveJob = (jobId: string) => {
    setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
    showToast('info', 'Job Removed', 'Removed from saved jobs.');
  };

  const applyToJob = async (jobId: string, coverNote?: string, selectedResume?: string): Promise<boolean> => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job || !currentCandidate) {
      showToast('error', 'Cannot apply', 'Please complete your profile first.');
      return false;
    }

    // Check if already applied
    const existing = applications.find(
      (a) => a.jobId === jobId && a.candidateId === currentCandidate.id
    );
    if (existing) {
      showToast('warning', 'Already Applied', 'You have already submitted an application for this role.');
      return false;
    }

    // Calculate match score based on skills
    const matchingSkills = (currentCandidate.skills || []).filter((skill) =>
      typeof skill === 'string' &&
      (job.preferredSkills || []).some((s) => typeof s === 'string' && s.toLowerCase().includes(skill.toLowerCase()))
    );
    const score = Math.round(
      Math.min(98, 70 + (matchingSkills.length / Math.max(1, (job.preferredSkills || []).length)) * 28)
    );

    const newApp: Application = {
      id: 'app-' + Date.now(),
      jobId,
      jobTitle: job.title,
      companyName: job.companyName,
      companyLogo: job.companyLogo,
      candidateId: currentCandidate.id,
      candidateName: currentCandidate.name,
      candidateEmail: currentCandidate.email,
      candidatePhone: currentCandidate.phone,
      candidateHeadline: currentCandidate.headline,
      candidateLocation: currentCandidate.location,
      candidateExperienceYears: currentCandidate.yearsOfExperience,
      candidateSkills: currentCandidate.skills,
      resumeName: selectedResume || currentCandidate.resumeName || 'HUNAR_Standard_Profile.pdf',
      coverNote: coverNote || 'Submitted with my verified HUNAR profile.',
      status: 'Applied',
      appliedDate: new Date().toISOString().substring(0, 10),
      timeline: [
        {
          status: 'Applied',
          date: new Date().toISOString().substring(0, 10),
          note: 'Application received by employer via HUNAR 1-Click Apply',
        },
      ],
      matchScore: score,
    };

    setApplications((prev) => [newApp, ...prev]);

    // Update job applicants count
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j))
    );

    // Notify Employer
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      userId: job.employerId,
      targetRole: 'employer',
      title: 'New Applicant on HUNAR',
      message: `${currentCandidate.name} applied for "${job.title}" (${score}% match score).`,
      type: 'application',
      timestamp: 'Just now',
      read: false,
      link: '/employer/applications',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Confetti effect!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#062e22', '#10b981', '#f59e0b', '#3b82f6'],
      });
    } catch {
      // fallback safe
    }

    showToast(
      'success',
      'Application Submitted!',
      `Successfully applied to ${job.companyName}. Track status in your dashboard.`
    );
    trackEvent('application_submitted', { jobId, score }, jobId);
    return true;
  };

  // Employer Actions
  const createJob = (newJobData: Omit<Job, 'id' | 'postedDate' | 'applicantsCount' | 'viewsCount' | 'isVerifiedCompany'>): Job => {
    const id = 'job-' + Date.now();
    const created: Job = {
      ...newJobData,
      id,
      postedDate: new Date().toISOString().substring(0, 10),
      applicantsCount: 0,
      viewsCount: 1,
      isVerifiedCompany: currentEmployer?.verificationStatus === 'verified',
    };

    setJobs((prev) => [created, ...prev]);
    showToast('success', 'Job Published!', `Your job opening "${created.title}" is now active.`);
    trackEvent('job_posted', { jobId: id, title: created.title }, id);
    return created;
  };

  const updateJob = (jobId: string, updates: Partial<Job>) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, ...updates } : j)));
    showToast('info', 'Job Updated', 'Job posting details have been refreshed.');
  };

  const deleteJob = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
    showToast('info', 'Job Deleted', 'The job opening has been removed.');
  };

  const updateJobStatus = (jobId: string, status: Job['status']) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status } : j)));
    showToast('info', 'Status Changed', `Job listing is now ${status}.`);
  };

  const createCourse = (newCourseData: Omit<Course, 'id' | 'createdAt'>): Course => {
    const newCourse: Course = {
      ...newCourseData,
      id: 'crs-' + Date.now(),
      createdAt: new Date().toISOString().substring(0, 10),
    };
    setCourses((prev) => [newCourse, ...prev]);
    showToast('success', 'Course Created', `Course "${newCourse.title}" created (${newCourse.status}).`);
    return newCourse;
  };

  const updateCourse = (courseId: string, updates: Partial<Course>) => {
    setCourses((prev) => prev.map((c) => (c.id === courseId ? { ...c, ...updates } : c)));
    showToast('info', 'Course Updated', 'Course information has been updated.');
  };

  const updateCourseStatus = (courseId: string, status: Course['status']) => {
    setCourses((prev) => prev.map((c) => (c.id === courseId ? { ...c, status } : c)));
    showToast('info', 'Course Status', `Course is now ${status}.`);
  };

  const deleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    showToast('info', 'Course Deleted', 'Course has been removed.');
  };

  const updateEmployerProfile = (updates: Partial<EmployerProfile>) => {
    if (!currentEmployer) return;
    setCompanies((prev) =>
      prev.map((c) => (c.id === currentEmployer.id ? { ...c, ...updates } : c))
    );
    showToast('success', 'Company Profile Saved', 'Your employer details have been updated.');
  };

  const updateApplicationStatus = (applicationId: string, status: ApplicationStatus, note?: string) => {
    const today = new Date().toISOString().substring(0, 10);
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === applicationId) {
          const newTimeline = [...app.timeline, { status, date: today, note: note || `Status changed to ${status}` }];
          return { ...app, status, timeline: newTimeline };
        }
        return app;
      })
    );

    // Notify Job Seeker
    const targetApp = applications.find((a) => a.id === applicationId);
    if (targetApp) {
      const notif: NotificationItem = {
        id: 'notif-' + Date.now(),
        userId: targetApp.candidateId,
        targetRole: 'job_seeker',
        title: `Application Update: ${status}`,
        message: `${targetApp.companyName} updated your application for "${targetApp.jobTitle}" to ${status}.`,
        type: 'application',
        timestamp: 'Just now',
        read: false,
        link: '/job-seeker/applications',
      };
      setNotifications((prev) => [notif, ...prev]);
    }

    showToast('success', 'Application Status Updated', `Application moved to "${status}".`);
    trackEvent('application_status_changed', { applicationId, status });
  };

  const scheduleInterview = (interviewData: Omit<Interview, 'id'>): Interview => {
    const newInterview: Interview = {
      ...interviewData,
      id: 'int-' + Date.now(),
    };

    setInterviews((prev) => [newInterview, ...prev]);

    // Also update application status to 'Interview'
    updateApplicationStatus(interviewData.applicationId, 'Interview', `Interview scheduled for ${interviewData.date} at ${interviewData.time}`);

    // Create Notification for job seeker
    const notif: NotificationItem = {
      id: 'notif-' + Date.now(),
      userId: interviewData.candidateId,
      targetRole: 'job_seeker',
      title: 'Interview Scheduled!',
      message: `${interviewData.companyName} scheduled a ${interviewData.type} interview on ${interviewData.date} at ${interviewData.time}.`,
      type: 'interview',
      timestamp: 'Just now',
      read: false,
      link: '/job-seeker/dashboard',
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast('success', 'Interview Confirmed', `Interview invitation sent to ${interviewData.candidateName}.`);
    trackEvent('interview_scheduled', { interviewId: newInterview.id });
    return newInterview;
  };

  const inviteCandidateToApply = (candidateId: string, jobId: string) => {
    const cand = candidates.find((c) => c.id === candidateId);
    const job = jobs.find((j) => j.id === jobId);
    if (cand && job) {
      const notif: NotificationItem = {
        id: 'notif-' + Date.now(),
        userId: cand.id,
        targetRole: 'candidate',
        title: 'Special Invitation to Apply!',
        message: `${job.companyName} reviewed your HUNAR profile and invited you to apply for "${job.title}".`,
        type: 'job',
        timestamp: 'Just now',
        read: false,
        link: `/jobs/${job.id}`,
      };
      setNotifications((prev) => [notif, ...prev]);
      showToast('success', 'Invitation Sent', `${cand.name} was notified of your opening.`);
      trackEvent('candidate_invited_to_apply', { candidateId, jobId });
    }
  };

  // Admin Actions
  const verifyEmployer = (employerId: string, status: 'verified' | 'rejected') => {
    const today = new Date().toISOString().substring(0, 10);
    setCompanies((prev) =>
      prev.map((c) => (c.id === employerId ? { ...c, verificationStatus: status, verifiedAt: status === 'verified' ? today : undefined } : c))
    );
    // Update jobs by this employer
    setJobs((prev) =>
      prev.map((j) => (j.employerId === employerId ? { ...j, isVerifiedCompany: status === 'verified' } : j))
    );
    showToast(status === 'verified' ? 'success' : 'info', `Company ${status.toUpperCase()}`, 'Employer credentials verified and badge issued.');
    trackEvent('employer_verification_action', { employerId, status });
  };

  const moderateJob = (jobId: string, action: 'approve' | 'pause' | 'delete') => {
    if (action === 'delete') {
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
      showToast('warning', 'Job Removed', 'Job listing removed by administrator.');
    } else {
      const status: Job['status'] = action === 'approve' ? 'published' : 'paused';
      setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status } : j)));
      showToast('info', 'Job Moderated', `Job status set to ${status}.`);
    }
    trackEvent('job_moderation', { jobId, action });
  };

  const sendCandidateReminder = (candidateId: string) => {
    const cand = candidates.find((c) => c.id === candidateId);
    if (cand) {
      const notif: NotificationItem = {
        id: 'notif-' + Date.now(),
        userId: cand.id,
        targetRole: 'candidate',
        title: 'Boost Your HUNAR Profile Completion',
        message: `Your profile is ${cand.completionPercentage}% complete. Complete your remaining steps to unlock 3x more recruiter views!`,
        type: 'system',
        timestamp: 'Just now',
        read: false,
        link: '/candidate/profile',
      };
      setNotifications((prev) => [notif, ...prev]);
      showToast('success', 'Reminder Sent', `Profile completion nudge sent to ${cand.name}.`);
      trackEvent('incomplete_profile_nudge', { candidateId });
    }
  };

  const submitSupportTicket = (ticket: Omit<SupportTicket, 'id' | 'createdAt'>) => {
    const newTicket: SupportTicket = {
      ...ticket,
      id: 'tkt-' + Date.now(),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    showToast('success', 'Ticket Submitted', 'Our recruiter support team will follow up within 24 business hours.');
  };

  const updateSupportTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setSupportTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status } : t))
    );
    showToast('info', 'Support Ticket Updated', `Ticket status set to ${status}.`);
  };

  const exportCsvReport = (type: 'candidates' | 'employers' | 'jobs' | 'applications') => {
    let headers: string[] = [];
    let rows: string[][] = [];
    let filename = `hunar_${type}_report_${new Date().toISOString().substring(0, 10)}.csv`;

    if (type === 'candidates') {
      headers = ['ID', 'Name', 'Email', 'Location', 'ExperienceLevel', 'YearsExp', 'Skills', 'CompletionRate', 'Availability'];
      rows = candidates.map((c) => [
        c.id,
        `"${c.name}"`,
        c.email,
        `"${c.location}"`,
        c.experienceLevel,
        String(c.yearsOfExperience),
        `"${c.skills.join(', ')}"`,
        `${c.completionPercentage}%`,
        c.availability,
      ]);
    } else if (type === 'employers') {
      headers = ['ID', 'Company', 'Industry', 'Location', 'Recruiter', 'Email', 'Status', 'ActiveJobs'];
      rows = companies.map((comp) => [
        comp.id,
        `"${comp.companyName}"`,
        `"${comp.industry}"`,
        `"${comp.location}"`,
        `"${comp.recruiterName}"`,
        comp.recruiterEmail,
        comp.verificationStatus,
        String(comp.activeJobsCount),
      ]);
    } else if (type === 'jobs') {
      headers = ['ID', 'Title', 'Company', 'Location', 'Type', 'WorkMode', 'SalaryMin', 'SalaryMax', 'Applicants', 'Status'];
      rows = jobs.map((j) => [
        j.id,
        `"${j.title}"`,
        `"${j.companyName}"`,
        `"${j.location}"`,
        j.employmentType,
        j.workMode,
        String(j.salary.min),
        String(j.salary.max),
        String(j.applicantsCount),
        j.status,
      ]);
    } else if (type === 'applications') {
      headers = ['ID', 'JobTitle', 'Company', 'Candidate', 'Email', 'Experience', 'Status', 'AppliedDate', 'MatchScore'];
      rows = applications.map((a) => [
        a.id,
        `"${a.jobTitle}"`,
        `"${a.companyName}"`,
        `"${a.candidateName}"`,
        a.candidateEmail,
        `${a.candidateExperienceYears} yrs`,
        a.status,
        a.appliedDate,
        `${a.matchScore || 85}%`,
      ]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('success', 'Report Exported', `Generated CSV report for ${type}.`);
    trackEvent('report_exported', { reportType: type });
  };

  // Notifications
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('info', 'Notifications Cleared', 'All notifications marked as read.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        currentCandidate,
        currentEmployer,
        users,
        candidates,
        companies,
        jobs,
        courses,
        applications,
        interviews,
        notifications,
        supportTickets,
        analyticsEvents,
        savedJobIds,
        toasts,
        loginAs,
        loginWithEmail,
        registerJobSeeker,
        registerEmployer,
        logout,
        switchRole,
        updateUserStatus,
        updateCandidateProfile,
        saveJob,
        unsaveJob,
        applyToJob,
        createJob,
        updateJob,
        deleteJob,
        updateJobStatus,
        createCourse,
        updateCourse,
        updateCourseStatus,
        deleteCourse,
        updateEmployerProfile,
        updateApplicationStatus,
        scheduleInterview,
        inviteCandidateToApply,
        verifyEmployer,
        moderateJob,
        sendCandidateReminder,
        submitSupportTicket,
        updateSupportTicketStatus,
        exportCsvReport,
        trackEvent,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
