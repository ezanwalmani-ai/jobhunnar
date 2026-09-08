import React from 'react';
import { JobSeekerDashboard } from './JobSeekerDashboard';

interface JobSeekerProfilePageProps {
  navigate: (route: string) => void;
}

export const JobSeekerProfilePage: React.FC<JobSeekerProfilePageProps> = ({ navigate }) => {
  return <JobSeekerDashboard navigate={navigate} defaultTab="profile" />;
};
