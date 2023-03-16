import { ReactNode, useRef } from 'react';
import { BaseLayout } from '../common/BaseLayout';
import { Header } from './components/Header';

interface Props {
  children: ReactNode;
}

export const OnboardingLayout = ({ children }: Props) => {
  return (
    <BaseLayout className="onboarding">
      <Header />
      <section className="canvas">
        {children}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </section>
    </BaseLayout>
  );
};
