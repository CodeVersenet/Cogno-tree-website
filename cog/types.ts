export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum Section {
  HERO = 'HERO',
  MISSION = 'MISSION',
  PROJECTS = 'PROJECTS',
  MENTORSHIP = 'MENTORSHIP',
  CONTACT = 'CONTACT'
}

export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  tech: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}