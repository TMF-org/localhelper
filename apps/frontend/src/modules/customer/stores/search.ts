import { Service } from '@/modules/common/hooks/useServices';
import { StrapiData } from '@/services/api';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Search {
  geo?: {
    latitude?: number;
    longitude?: number;
  };
  detectType?: string;
  city?: string;
  location?: any;
  district?: any;
  zipcode?: string;
  service?: StrapiData<Service>;
}

interface SearchState {
  services: Service[];
  search: Search;

  setServices: (services: Service[]) => void;
  update: (search: Partial<Search>) => void;
  getResultUrl: () => string;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      services: [],
      search: {
        geo: {},
        zipcode: '',
      },

      setServices(services) {
        set(() => ({ services }));
      },

      update(searchPatch) {
        set(({ search }) => {
          const newSearch = { ...search, ...searchPatch };
          return { search: newSearch };
        });
      },

      getResultUrl() {
        const { search } = get();
        return `/helpers/area/${search.city?.toLowerCase()}/${
          search.service?.attributes.url
        }@${search.geo?.latitude},${search.geo?.longitude}`;
      },
    }),
    {
      name: 'search-storage',
      // Note: session storage is only persisted on client
      // this is causing hydration errors. To avoid those, every page using data from this store
      // needs to be either client only, or actively check `useIsHydrated()` hook before rendering
      // data from this store
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
