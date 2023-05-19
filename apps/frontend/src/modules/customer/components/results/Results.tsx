import { Helper } from '@/modules/api/helper/types';
import { Icon } from '@/modules/common/components/Icon';
import { StrapiData } from '@/services/api';
import Link from 'next/link';
import { Breadcrumbs } from '../../Breadcrumbs';
import { useSearchStore } from '../../stores/search';
import { HelperCard } from '../helper/HelperCard';
import { NoResults } from './NoResults';

interface Props {
  helpers: StrapiData<Helper>[];
}

export const Results = ({ helpers }: Props) => {
  return (
    <section className="results">
      <Breadcrumbs page="Umkreissuche" />

      <Actions />

      {helpers.length === 0 ? (
        <NoResults />
      ) : (
        <div className="stores">
          {helpers.map((helper) => (
            <HelperCard key={helper.id} helper={helper} />
          ))}
        </div>
      )}
    </section>
  );
};

const Actions = () => {
  const search = useSearchStore((store) => store.search);

  const location = search.location;
  const service = search.service?.attributes.name;

  return (
    <section className="actions">
      <h2>
        <strong>in {location}</strong>
        <small>{service ?? 'Alle Services'}</small>
      </h2>

      <Link href="/" className="edit">
        <small>anpassen</small>
        <Icon name="edit" size="default" />
      </Link>
    </section>
  );
};
