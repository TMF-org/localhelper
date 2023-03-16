import { api, StrapiResponse } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { FAQ } from './types';

export function fetchFAQ() {
  return api.get('faqs').json<StrapiResponse<FAQ[]>>();
}

export function useFAQ() {
  return useQuery({
    queryKey: ['faq'],
    queryFn: fetchFAQ,
  });
}
