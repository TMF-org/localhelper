import { api, StrapiPaginatedResponse } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export async function fetchServiceCategories() {
  return await api
    .get('service-categories')
    .json<StrapiPaginatedResponse<ServiceCategory>>();
}

export function useServiceCategories() {
  return useQuery({
    queryKey: ['service-categories'],
    queryFn: fetchServiceCategories,
  });
}

export interface ServiceCategory {
  name: string;
  description?: string;

  createdAt: string;
  updatedAt: string;
}
