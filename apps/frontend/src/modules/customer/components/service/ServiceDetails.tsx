import { ServiceWithImage } from '@/modules/common/hooks/useService';
import { StrapiData, StrapiMedia } from '@/services/api';
import Markdown from 'react-markdown';
import { Search } from '../search/Search';
import Image from 'next/image';
import placeholderImage from '@public/image/placeholder.jpg';

interface Props {
  service: StrapiData<ServiceWithImage>;
}

export const ServiceDetails = ({ service }: Props) => {
  return (
    <>
      <ServicePicture image={service.attributes.image.data?.attributes} />
      <section className="field space article">
        <h1>{service.attributes.name}</h1>
        <Markdown>{service.attributes.description ?? ''}</Markdown>
      </section>
      {service.attributes.category && (
        <section className="field space article">
          <h2>{service.attributes.category.data.attributes.name}</h2>
          <Markdown>
            {service.attributes.category.data.attributes.description ?? ''}
          </Markdown>
        </section>
      )}

      <section className="mood-dark">
        <h1>Finde einen Helfer für: {service.attributes.name}</h1>

        <Search />
      </section>
    </>
  );
};

const ServicePicture = ({ image }: { image: StrapiMedia | undefined }) => {
  if (image) {
    return (
      <div className="image">
        <Image
          src={process.env.NEXT_PUBLIC_STRAPI_URL + image.url}
          alt={image.name}
          title={image.name}
        />
      </div>
    );
  }
  return (
    <div className="image">
      <Image src={placeholderImage} alt="placeholder" title="placeholder" />
    </div>
  );
};
