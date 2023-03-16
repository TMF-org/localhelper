import { ReactNode } from 'react';
import { BaseLayout } from '../common/BaseLayout';

interface Props {
  children: ReactNode;
}

export const AuthLayout = ({ children }: Props) => {
  return <BaseLayout className="dashboard">{children}</BaseLayout>;
};
