import Link from 'next/link';
import { ReactNode } from 'react';
import { BaseLayout } from '../common/BaseLayout';
import { Header } from './components/Header';

interface Props {
  children: ReactNode;
}

export const CustomerLayout = ({ children }: Props) => {
  return (
    <BaseLayout>
      <div id="main">
        <Header />
        <div id="content">
          <div className="content-wrapper">
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

const Footer = () => {
  return (
    <footer className="footer-primary">
      <div className="links center">
        <Link href="/imprint">Impressum</Link>
        <Link href="/privacy">Datenschutz</Link>
        <Link href="/terms">Terms of Use</Link>
      </div>
    </footer>
  );
};
