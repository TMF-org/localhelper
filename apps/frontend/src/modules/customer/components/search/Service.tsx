import { Icon } from '@/modules/common/components/Icon';
import { useIsHydrated } from '@/modules/common/hooks/useIsHydrated';
import { useServiceCategories } from '@/modules/common/hooks/useServiceCategories';
import { Service, useServices } from '@/modules/common/hooks/useServices';
import { StrapiData } from '@/services/api';
import { useEffect, useState } from 'react';
import { useScreenStore } from '../../stores/screen';
import { useSearchStore } from '../../stores/search';
import { Screen } from '../screen/Screen';

/**
 * set default service if no service was selected
 * default service is the first service in the list
 */
const useSetDefaultService = () => {
  const currentService = useSearchStore((store) => store.search.service);
  const update = useSearchStore((store) => store.update);

  const { data, isFetchedAfterMount } = useServices({
    enabled: !currentService,
  });

  useEffect(() => {
    const defaultService = data?.data[0];
    if (!isFetchedAfterMount || !defaultService || currentService) return;
    update({ service: defaultService });
  }, [isFetchedAfterMount]);
};

export const ServiceSelector = () => {
  const [activeCategory, setActiveCategory] = useState<number>();

  const hideScreen = useScreenStore((store) => store.hideScreen);
  useSetDefaultService();

  const deactivate = () => {
    hideScreen('services', { delay: 400 });
  };

  return (
    <section className="service">
      <ServiceInput />

      <Screen
        headline="Wobei suchst du Hilfe?"
        name="services"
        className="white"
        onClose={deactivate}
      >
        <ServiceCategories
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="search-selection-wrapper">
          <ServiceInput isOpen />
          <ServiceSearchList category={activeCategory} />
        </div>
      </Screen>
    </section>
  );
};

const ServiceInput = ({ isOpen }: { isOpen?: boolean }) => {
  const isHydrated = useIsHydrated();
  const service = useSearchStore((store) => store.search.service);
  const toggleScreen = useScreenStore((store) => store.toggleScreen);

  let icon = isOpen ? 'arrow-up' : 'arrow-down';
  const active = isOpen ? 'active' : '';

  let serviceInputName = !service
    ? 'Bitte Service wählen'
    : service.attributes.name;

  return (
    <div
      className={`service-input ${active}`}
      onClick={() => toggleScreen('services')}
    >
      <span>{isHydrated && serviceInputName}</span>
      <small>
        <Icon name={icon} size="small" />
      </small>
    </div>
  );
};

const ServiceCategories = ({
  activeCategory,
  onChange,
}: {
  activeCategory?: number;
  onChange: (category: number | undefined) => void;
}) => {
  const { data } = useServiceCategories();
  const categories = data?.data ?? [];

  let defaultActiveClass = !activeCategory ? 'active' : undefined;

  return (
    <div className="service-categories">
      <ul>
        <li className={defaultActiveClass} onClick={() => onChange(undefined)}>
          <Icon name="global" />
          <span>All</span>
        </li>
        {categories.map((category) => (
          <li
            key={category.id}
            className={category.id === activeCategory ? 'active' : undefined}
            onClick={() => onChange(category.id)}
          >
            <Icon name={category.attributes.name.toLowerCase()} />
            <span>{category.attributes.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ServiceSearchList = ({ category }: { category?: number }) => {
  const { search, update } = useSearchStore();
  const hideScreen = useScreenStore((store) => store.hideScreen);
  const { data } = useServices();

  const setService = (service: StrapiData<Service>) => {
    update({ service });
    hideScreen('services', { delay: 400 });
  };

  let services = data?.data ?? [];
  if (category) {
    services = services.filter(
      (service) => service.attributes.category.data.id === category,
    );
  }

  let serviceInputName = !search.service
    ? 'Bitte Service wählen'
    : search.service.attributes.name;

  return (
    <div className="list">
      <Icon name="arrow-up" size="small" />
      <ul>
        {services.map((service) => {
          const className =
            service.attributes.name === serviceInputName ? 'active' : undefined;

          return (
            <li
              key={service.id}
              className={className}
              onClick={() => setService(service)}
            >
              <span>{service.attributes.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
