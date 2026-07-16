export type Level = {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  icon: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  summary: string;
  durationMin: number;
  xp: number;
  content: string;
  practice?: string;
  quiz: QuizQuestion[];
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
};

export type Tool = {
  id: string;
  name: string;
  category: "IDE" | "Builder" | "Assistant";
  description: string;
  pricing: string;
  url: string;
  tags: string[];
  bestFor: string;
};

export type Module = {
  id: string;
  title: string;
  subtitle: string;
  lessons: Lesson[];
};

export type Project = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  stack: string[];
  link?: string;
  repo?: string;
  earned: number;
  created_at: string;
};

export type Profile = {
  id: string;
  email: string;
  username: string;
  xp: number;
  level: number;
  streak: number;
  completedLessons: string[];
  achievements: string[];
  createdAt: string;
};
