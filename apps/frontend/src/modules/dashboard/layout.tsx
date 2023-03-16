import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { BaseLayout } from '../common/BaseLayout';
import { DashboardHeader } from './components/Header';

interface Props {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: Props) => {
  return (
    <BaseLayout className="dashboard">
      <section className="layout-base">
        <DashboardHeader />
        {children}
      </section>
      <Toaster position="bottom-right" toastOptions={{ className: 'toast' }} />
    </BaseLayout>
  );
};
