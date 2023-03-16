import { Inter } from 'next/font/google';
import clsx from 'clsx';
import Head from 'next/head';
import { ReactNode } from 'react';
import { CookieBanner } from './components/CookieBanner';
import { iconSprite } from './components/IconSprite';

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION;

interface Props {
  children: ReactNode;
  className?: string;
}

export const BaseLayout = ({ children, className }: Props) => {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id="page" className={clsx(inter.className, className)}>
        {children}
        <CookieBanner />
      </main>
      <div hidden dangerouslySetInnerHTML={{ __html: iconSprite }} />
    </>
  );
};
