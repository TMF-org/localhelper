import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { BaseLayout } from '../common/BaseLayout';
import { DashboardHeader } from './components/Header';

const ToasterDynamic = dynamic({
  ssr: false,
  loader: () => import('react-hot-toast').then((mod) => mod.Toaster),
});

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
      <ToasterDynamic
        position="bottom-right"
        toastOptions={{ className: 'toast' }}
      />
    </BaseLayout>
  );
};
