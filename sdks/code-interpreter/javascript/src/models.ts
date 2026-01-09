export const SupportedLanguage = {
  PYTHON: "python",
  JAVA: "java",
  GO: "go",
  TYPESCRIPT: "typescript",
  JAVASCRIPT: "javascript",
  BASH: "bash",
} as const;

export type SupportedLanguage =
  (typeof SupportedLanguage)[keyof typeof SupportedLanguage];

export type CodeContext = {
  id?: string;
  language: string;
};

export type RunCodeRequest = {
  code: string;
  context: CodeContext;
};
