export const formatZodError = (message: string): string[] => {
  const parsed = JSON.parse(message);

  return parsed.map(
    (error: { path: string[]; message: string }) =>
      `${error.path.join('.')}: ${error.message}`
  );
};
