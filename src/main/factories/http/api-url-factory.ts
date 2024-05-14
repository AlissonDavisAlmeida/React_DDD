export const makeUrl = (endpoint: string): string => {
  return `${process.env.API_URL}${endpoint}`;
};
