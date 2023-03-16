import '@/styles/sass/app.scss';

import { RequireAuth } from '@/modules/auth/components/RequireAuth';
import { defaultErrorMap } from '@/modules/common/validationErrors';
import { useSyncHistoryWithScreenStore } from '@/modules/customer/stores/screen';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode, useState } from 'react';
import { z } from 'zod';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  requireAuth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

z.setErrorMap(defaultErrorMap);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  useSyncHistoryWithScreenStore();
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {Component.requireAuth ? (
            <RequireAuth>{getLayout(<Component {...pageProps} />)}</RequireAuth>
          ) : (
            getLayout(<Component {...pageProps} />)
          )}
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}
