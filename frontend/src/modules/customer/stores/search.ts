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
      // TODO: cookie storage & dsgvo check
      storage: createJSONStorage(() => ({
        removeItem(name) {
          return sessionStorage.removeItem(name);
        },
        setItem(name, value) {
          return sessionStorage.setItem(name, value);
        },
        getItem(name) {
          if (typeof window === 'undefined') return null;

          // restore from storage with delay => workaround for SSR issues
          // TODO: find better solution then arbitrary delay...
          return new Promise((resolve) =>
            setTimeout(() => resolve(sessionStorage.getItem(name)), 400),
          );
        },
      })),
    },
  ),
);
