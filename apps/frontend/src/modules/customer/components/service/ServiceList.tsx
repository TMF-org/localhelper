import { Icon } from '@/modules/common/components/Icon';
import { Service } from '@/modules/common/hooks/useServices';
import { StrapiData } from '@/services/api';
import Link from 'next/link';

interface Props {
  services: StrapiData<Service>[];

  showOnlyPopular?: boolean;
  headline?: string;
  headlineSize?: string;
  subHeadline?: string;
}

export const ServiceList = ({
  services,
  headline,
  headlineSize,
  subHeadline,
  showOnlyPopular,
}: Props) => {
  if (services.length === 0) return null;

  let headlineClassName = 'section-headline ' + headlineSize;

  let filteredServices = services;
  if (showOnlyPopular) {
    filteredServices = services.filter((service) =>
      Boolean(service.attributes.isPopular),
    );
  }

  return (
    <section className="section popular-services">
      <h2 className={headlineClassName}>
        <Icon name="betreuung" size="big" />

        <strong>{headline}</strong>
        {subHeadline && <small>{subHeadline}</small>}
      </h2>

      <ul className="box-primary-arrow-up-max-round link-list">
        {filteredServices.map((service) => {
          const url = `/service/${service.attributes.url}`;
          return (
            <li key={service.id}>
              <Link href={url}>
                <span>{service.attributes.name}</span>
                <Icon name="go" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
