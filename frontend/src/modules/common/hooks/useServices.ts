import { api, StrapiPaginatedResponse, StrapiResponse } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { ServiceCategory } from './useServiceCategories';

export async function fetchServices() {
  return await api
    .get('services', {
      searchParams: { populate: 'category' },
    })
    .json<StrapiPaginatedResponse<Service>>();
}

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  });
}

export interface Service {
  name: string;
  summary: string;
  description?: string;
  isPopular: boolean;
  isBookable: boolean;
  url: string;
  createdAt: string;
  updatedAt: string;

  category: StrapiResponse<ServiceCategory>;
}
