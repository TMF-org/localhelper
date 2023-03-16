export const handleStrapiError = async (e: any) => {
  if (e.name !== 'HTTPError') return;
  const errorJson = await e.response.json();
  // throw new HTTPError
  throw new Error(errorJson?.error.message, {
    cause: errorJson?.error,
  });
};
