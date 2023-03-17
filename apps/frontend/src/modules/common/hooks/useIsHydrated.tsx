import { useEffect, useState } from 'react';

export const useIsHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  //Wait till NextJS rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
};
