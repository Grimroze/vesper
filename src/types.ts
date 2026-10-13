export interface Problem {
  id: string;
  title: string;
  code: string;
  difficulty: string;
  timeComplexity: string;
  spaceComplexity: string;
  intuition: string;
  traps: string;
}

export interface Section {
  id: string;
  title: string;
  problems: Problem[];
}
