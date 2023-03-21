import {
  Helper,
  HelperForMap,
  HelperWithDetails,
  MeHelper,
} from '@/modules/api/helper/types';
import { api, StrapiPaginatedResponse, StrapiResponse } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

export async function fetchHelper(helperUrl: string) {
  return await api
    .get(`helpers/${helperUrl}`)
    .json<StrapiResponse<HelperWithDetails>>();
}

export function useHelper(helperUrl: string) {
  return useQuery({
    queryKey: ['helper', helperUrl],
    queryFn: () => fetchHelper(helperUrl),
  });
}

interface Options {
  lat: string;
  lng: string;
  service?: string;
}

export async function fetchHelpersByDistance(options: Options) {
  return await api
    .get('helpers/by-distance', {
      searchParams: {
        ...options,
      },
    })
    .json<StrapiPaginatedResponse<Helper>>();
}

export function useHelpersByDistance(options: Options) {
  return useQuery({
    queryKey: ['helpersByDistance', options.lat, options.lng, options.service],
    queryFn: () => fetchHelpersByDistance(options),
  });
}

export async function fetchHelpersForMap() {
  return await api
    .get('helpers/for-map')
    .json<StrapiPaginatedResponse<HelperForMap>>();
}

export function useHelpersForMap() {
  return useQuery({
    queryKey: ['helpersForMap'],
    queryFn: () => fetchHelpersForMap(),
  });
}

export function fetchMeHelper(session: Session | null) {
  if (!session) return;
  return api
    .get('helpers/me', {
      headers: { Authorization: `Bearer ${session.jwt}` },
    })
    .json<StrapiResponse<MeHelper>>();
}

export function useMeHelper() {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ['helper', 'me'],
    queryFn: () => fetchMeHelper(session),
  });
}
