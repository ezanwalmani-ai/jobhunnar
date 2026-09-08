import { 
  Job, 
  EmployerProfile, 
  CandidateProfile, 
  Application, 
  Interview, 
  NotificationItem, 
  User, 
  SupportTicket, 
  AnalyticsEvent,
  Course
} from '../types';

// HUNAR Marketplace: Single Source of Truth is the Admin Backend.
// All initial marketplace collections are empty arrays. No fake, demo, sample, or placeholder marketplace records.
export const INITIAL_COMPANIES: EmployerProfile[] = [];
export const INITIAL_JOBS: Job[] = [];
export const INITIAL_COURSES: Course[] = [];
export const INITIAL_CANDIDATES: CandidateProfile[] = [];
export const INITIAL_APPLICATIONS: Application[] = [];
export const INITIAL_INTERVIEWS: Interview[] = [];
export const INITIAL_NOTIFICATIONS: NotificationItem[] = [];
export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [];
export const INITIAL_ANALYTICS: AnalyticsEvent[] = [];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'HUNAR Administrator',
    email: 'admin@hunar.work',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    createdAt: '2026-01-01',
    lastActive: '2026-09-04 20:00',
  },
  {
    id: 'user-js-demo',
    name: 'Aarav Sharma',
    email: 'jobseeker@hunar.careers',
    role: 'job_seeker',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    createdAt: '2026-02-01',
    lastActive: 'Just now',
  },
  {
    id: 'user-emp-demo',
    name: 'Priya Mehta',
    email: 'employer@hunar.careers',
    role: 'employer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    createdAt: '2026-02-01',
    lastActive: 'Just now',
  }
];
