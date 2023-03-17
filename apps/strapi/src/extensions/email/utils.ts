export const getFrontendUrl = (path: string) => {
  const frontendUrl = process.env.NEXT_PUBLIC_URL;
  return `${frontendUrl}/${path}`;
};
