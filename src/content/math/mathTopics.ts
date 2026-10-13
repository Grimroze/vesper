export type MathTopic = {
  id: string;
  title: string;
  category: string;
  file: string; // The base name of the markdown file without extension
};

export const mathTopics: MathTopic[] = [
  {
    id: 'ch1_basic_math_calculus',
    title: 'Chapter 1: Basic Math & Calculus',
    category: 'Essential Math for Data Science',
    file: 'chapter1_basic_math_calculus'
  },
  {
    id: 'ch2_probability',
    title: 'Chapter 2: Probability',
    category: 'Essential Math for Data Science',
    file: 'chapter2_probability_placeholder'
  },
  {
    id: 'ch3_statistics',
    title: 'Chapter 3: Statistics',
    category: 'Essential Math for Data Science',
    file: 'chapter3_statistics_placeholder'
  },
  {
    id: 'ch4_linear_algebra',
    title: 'Chapter 4: Linear Algebra',
    category: 'Essential Math for Data Science',
    file: 'chapter4_linear_algebra_placeholder'
  }
];
