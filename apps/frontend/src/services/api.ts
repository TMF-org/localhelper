import { authOptions } from '@/pages/api/auth/[...nextauth]';
import {
  dehydrate,
  FetchQueryOptions,
  QueryClient,
} from '@tanstack/react-query';
import ky from 'ky';
import type { GetServerSidePropsContext } from 'next';
import { getServerSession, Session } from 'next-auth';

let strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
const isServer = typeof window === 'undefined';
if (isServer && process.env.NEXT_INTERNAL_STRAPI_URL) {
  strapiUrl = process.env.NEXT_INTERNAL_STRAPI_URL;
}

const api = ky.create({
  prefixUrl: `${strapiUrl}/api`,
});

export async function prefetchQueries(
  queries: FetchQueryOptions<any, any, any, any>[],
) {
  const queryClient = new QueryClient();

  const queryPromises = queries.map((query) =>
    queryClient.prefetchQuery(query),
  );
  await Promise.all(queryPromises);

  return {
    queryClient,
    dehydratedState: dehydrate(queryClient),
  };
}

export async function prefetchSession(context: GetServerSidePropsContext) {
  const session: Session | null = await getServerSession(
    context.req,
    context.res,
    authOptions,
  );
  let redirect;
  if (!session) {
    redirect = { destination: '/auth/signin', permanent: false };
  }
  return { session, redirect };
}

export type StrapiPaginatedResponse<T> = StrapiResponse<
  T[],
  {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  }
>;

export interface StrapiResponse<T, Meta = {}> {
  data: T extends any[] ? StrapiData<T[0]>[] : StrapiData<T>;
  meta: Meta;
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiMedia {
  name: string;
  formats: any;
  url: string;
}

export { api };
