export interface ExtractedFigure {
  id: string;
  figureNumber: string; // e.g. "Figure 1"
  title: string;
  caption: string;
  imageUrl: string;
  type: 'architecture' | 'benchmark' | 'formula' | 'ablation';
  beginnerExplanation: string; // Plain english explanation of what's happening
  keyElements: { label: string; description: string }[];
}

export interface SimplifiedFormula {
  id: string;
  name: string;
  latex: string;
  steps?: { label: string; latex: string; description: string }[];
  plainEnglish: string;
  variableBreakdown: { symbol: string; latexSymbol?: string; meaning: string; intuition: string }[];
  whyItMatters: string;
}

export interface Paper {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  authors: string[];
  affiliations?: string;
  year: number;
  conferenceOrArxiv: string;
  arxivUrl: string;
  category: 'Foundational Architecture' | 'Fine-Tuning & Adaptation' | 'Inference & Efficiency' | 'Reasoning & Alignment';
  tags: string[];
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  
  // Beginner Friendly Breakdown
  eli5Summary: string; // 2-3 sentence ELI5
  realWorldAnalogy: {
    title: string;
    analogyText: string;
    takeaway: string;
  };
  theProblem: {
    beforeState: string;
    bottleneck: string;
    whyExistingMethodsFailed: string;
  };
  coreBreakthrough: {
    overview: string;
    keyPoints: string[];
  };
  
  // Visual Figures & Extracted Diagrams
  figures: ExtractedFigure[];
  
  // Math in Plain English
  formulas: SimplifiedFormula[];
  
  // Minimal Implementation
  codeSnippet: {
    language: string;
    title: string;
    description?: string;
    explanation?: string;
    filename?: string;
    code: string;
  };
  
  // Interview Q&A
  interviewQuestions: {
    question: string;
    answer: string;
    proTip?: string;
  }[];
}
