import { useEffect, useState } from 'react';

interface Props {
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;

  children: React.ReactNode;
}

export const Responsive = ({ mobile, tablet, desktop, children }: Props) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  if (mobile && isMobile) return <>{children}</>;
  else if (tablet && isTablet) return <>{children}</>;
  else if (desktop && isDesktop) return <>{children}</>;

  return null;
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    setMatches(window.matchMedia(query).matches);
  }, []);

  useEffect(() => {
    const matchQueryList = window.matchMedia(query);
    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }
    matchQueryList.addEventListener('change', handleChange);
    return () => {
      matchQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);
  return matches;
}
