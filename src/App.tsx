import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { RouteProtectionNotice } from './components/RouteProtectionNotice';

// Public & Shared Pages
import { HomePage } from './pages/HomePage';
import { JobsPage } from './pages/JobsPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

// Job Seeker Portal Pages
import { JobSeekerDashboard } from './pages/jobSeeker/JobSeekerDashboard';
import { JobSeekerApplicationsPage } from './pages/jobSeeker/JobSeekerApplicationsPage';
import { JobSeekerSavedJobsPage } from './pages/jobSeeker/JobSeekerSavedJobsPage';
import { JobSeekerProfilePage } from './pages/jobSeeker/JobSeekerProfilePage';
import { JobSeekerUpskillPage } from './pages/jobSeeker/JobSeekerUpskillPage';
import { JobSeekerRegisterPage } from './pages/jobSeeker/JobSeekerRegisterPage';
import { JobSeekerOnboardingPage } from './pages/jobSeeker/JobSeekerOnboardingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { PasswordCheckerDemoPage } from './pages/PasswordCheckerDemoPage';

// Employer Portal Pages
import { EmployerDashboard } from './pages/employer/EmployerDashboard';
import { EmployerJobsPage } from './pages/employer/EmployerJobsPage';
import { EmployerApplicationsPage } from './pages/employer/EmployerApplicationsPage';
import { EmployerCompanyProfilePage } from './pages/employer/EmployerCompanyProfilePage';
import { EmployerAccountPage } from './pages/employer/EmployerAccountPage';
import { PostJobPage } from './pages/employer/PostJobPage';

// Admin Portal
import { AdminDashboard } from './pages/admin/AdminDashboard';

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [routeParams, setRouteParams] = useState<{ id?: string; query?: string; location?: string }>({});
  const { currentRole, switchRole } = useApp();

  // Parse route string with parameters
  const navigate = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (path.startsWith('/jobs/') && path !== '/jobs/') {
      const id = path.replace('/jobs/', '');
      setRouteParams({ id });
      setCurrentRoute('/jobs/:id');
      return;
    }

    if (path.startsWith('/jobs?')) {
      const urlParams = new URLSearchParams(path.split('?')[1]);
      setRouteParams({
        query: urlParams.get('query') || '',
        location: urlParams.get('location') || '',
      });
      setCurrentRoute('/jobs');
      return;
    }

    setRouteParams({});
    setCurrentRoute(path);
  };

  const isJobSeeker = currentRole === 'job_seeker' || (currentRole as any) === 'candidate';
  const isEmployer = currentRole === 'employer';
  const isAdmin = currentRole === 'admin';

  // Role Protection Interceptor
  // 1. Employer-only routes
  if (currentRoute.startsWith('/employer') && isJobSeeker) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar currentRoute={currentRoute} navigate={navigate} />
        <main className="flex-1">
          <RouteProtectionNotice
            attemptedRoute={currentRoute}
            requiredRole="employer"
            currentRole="job_seeker"
            onRedirectToAllowed={() => navigate('/job-seeker/dashboard')}
            onSwitchRole={() => {
              switchRole('employer');
              navigate(currentRoute);
            }}
          />
        </main>
        <Footer navigate={navigate} />
        <ToastContainer />
      </div>
    );
  }

  // 2. Job Seeker-only routes
  if (
    (currentRoute.startsWith('/job-seeker') || currentRoute.startsWith('/candidate')) &&
    currentRoute !== '/job-seeker/onboarding' &&
    isEmployer
  ) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar currentRoute={currentRoute} navigate={navigate} />
        <main className="flex-1">
          <RouteProtectionNotice
            attemptedRoute={currentRoute}
            requiredRole="job_seeker"
            currentRole="employer"
            onRedirectToAllowed={() => navigate('/employer/dashboard')}
            onSwitchRole={() => {
              switchRole('job_seeker');
              navigate(currentRoute);
            }}
          />
        </main>
        <Footer navigate={navigate} />
        <ToastContainer />
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/':
        return <HomePage navigate={navigate} />;

      case '/jobs':
        return (
          <JobsPage
            navigate={navigate}
            initialQuery={routeParams.query}
            initialLocation={routeParams.location}
          />
        );

      case '/jobs/:id':
        return (
          <JobDetailPage
            jobId={routeParams.id || 'job-1'}
            navigate={navigate}
          />
        );

      case '/candidates':
        return <CandidatesPage navigate={navigate} />;

      case '/companies':
        return <CompaniesPage navigate={navigate} />;

      case '/about':
        return <AboutPage navigate={navigate} />;

      case '/contact':
        return <ContactPage navigate={navigate} />;

      // Legal & Compliance
      case '/terms-and-conditions':
      case '/terms':
        return <TermsPage navigate={navigate} />;

      case '/privacy':
      case '/privacy-policy':
        return <PrivacyPolicyPage navigate={navigate} />;

      // Auth & Job Seeker Onboarding
      case '/register/job-seeker':
      case '/register':
        return <JobSeekerRegisterPage navigate={navigate} />;

      case '/password-checker':
      case '/security/password-checker':
        return <PasswordCheckerDemoPage navigate={navigate} />;

      case '/job-seeker/onboarding':
        return <JobSeekerOnboardingPage navigate={navigate} />;

      case '/login':
      case '/signin':
        return <LoginPage navigate={navigate} />;

      // Job Seeker Portal Routes
      case '/job-seeker/dashboard':
      case '/candidate/dashboard':
      case '/candidate/interviews':
        return <JobSeekerDashboard navigate={navigate} defaultTab="overview" />;

      case '/job-seeker/applications':
        return <JobSeekerDashboard navigate={navigate} defaultTab="applications" />;

      case '/job-seeker/saved-jobs':
        return <JobSeekerDashboard navigate={navigate} defaultTab="saved_jobs" />;

      case '/job-seeker/profile':
      case '/candidate/profile':
        return <JobSeekerDashboard navigate={navigate} defaultTab="profile" />;

      case '/job-seeker/upskill':
        return <JobSeekerUpskillPage navigate={navigate} />;

      // Employer Portal Routes
      case '/employer/dashboard':
        return <EmployerDashboard navigate={navigate} />;

      case '/employer/jobs':
        return <EmployerJobsPage navigate={navigate} />;

      case '/employer/post-job':
        return <PostJobPage navigate={navigate} />;

      case '/employer/applications':
        return <EmployerApplicationsPage navigate={navigate} />;

      case '/employer/company-profile':
        return <EmployerCompanyProfilePage navigate={navigate} />;

      case '/employer/account':
        return <EmployerAccountPage navigate={navigate} />;

      case '/employer/candidates':
        return <CandidatesPage navigate={navigate} />;

      // Admin Portal
      case '/admin':
        return <AdminDashboard navigate={navigate} />;

      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Navbar */}
      <Navbar currentRoute={currentRoute} navigate={navigate} />

      {/* Dynamic Page Content */}
      <main className="flex-1">{renderCurrentPage()}</main>

      {/* Bottom Footer */}
      <Footer navigate={navigate} />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
