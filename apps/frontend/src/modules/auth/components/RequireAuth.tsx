import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { LoadingSkeleton } from './LoadingSkeleton';

interface Props {
  children: ReactNode;
}

export const RequireAuth = ({ children }: Props) => {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <LoadingSkeleton />;
  }

  return <>{children}</>;
};
