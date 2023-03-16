import {
  api,
  StrapiData,
  StrapiMedia,
  StrapiPaginatedResponse,
} from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Service } from './useServices';

export async function fetchService(serviceUrl: string) {
  const services = await api
    .get(`services`, {
      searchParams: {
        'filters[url]': serviceUrl,
        populate: 'category,image',
      },
    })
    .json<StrapiPaginatedResponse<ServiceWithImage>>();
  return services.data[0];
}

export function useService(serviceUrl: string) {
  return useQuery({
    queryKey: ['service', serviceUrl],
    queryFn: () => fetchService(serviceUrl),
  });
}

export interface ServiceWithImage extends Service {
  image: {
    data?: StrapiData<StrapiMedia>;
  };
}
