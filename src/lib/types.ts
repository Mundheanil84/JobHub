export type Job = {
  id: string;
  jobTitle: string;
  company: string;
  locations: string[];
  description: string;
  shortDescription: string;
  skills: string[];
  salaryRangeMin: number;
  salaryRangeMax: number;
  experienceMin: number;
  experienceMax: number;
};

export interface ProvidersProps {
  children: React.ReactNode;
}

export interface SavedJobCardProps {
  jobTitle: string;
  company: string;
  shortDescription: string;
  id: string;
}

export interface Candidate {
  id: number;
  name: string;
  title: string;
  location: string;
  email: string;
  skills: string[];
  experience: number;
  isAvailable: boolean;
}