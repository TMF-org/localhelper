import { Service } from '@/modules/common/hooks/useServices';
import { StrapiData, StrapiMedia } from '@/services/api';

export interface HelperForMap {
  name: string;
  url: string;
  geo: {
    id: string;
    lat: string;
    lng: string;
  };
}

export interface Helper {
  name: string;
  summary: string;
  about?: string;
  url: string;
  bookable: boolean;
  distance?: number;
  media: { data?: StrapiData<StrapiMedia>[] };
}

export interface HelperWithDetails extends Helper {
  services: {
    data: StrapiData<Service>[];
  };
}

export interface MeHelper extends HelperWithDetails {
  phone?: string;
  address: string;
  geo: {
    lat: string;
    lng: string;
  };
}
