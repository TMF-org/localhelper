import clsx from 'clsx';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { CookieBanner } from './components/CookieBanner';
import { iconSprite } from './components/IconSprite';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  children: ReactNode;
  className?: string;
}

export const BaseLayout = ({ children, className }: Props) => {
  return (
    <>
      <main id="page" className={clsx(inter.className, className)}>
        {children}
        <CookieBanner />
      </main>
      <div hidden dangerouslySetInnerHTML={{ __html: iconSprite }} />
    </>
  );
};
