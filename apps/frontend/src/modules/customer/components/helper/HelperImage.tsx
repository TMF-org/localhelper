import { StrapiData, StrapiMedia } from '@/services/api';
import Link from 'next/link';

export const HelperImage = ({
  storeLink,
  media = [],
}: {
  storeLink?: string;
  media?: StrapiData<StrapiMedia>[];
}) => {
  let url = '/image/placeholder.jpg';
  let title = 'lokalhelfer';

  if (media?.[0]) {
    title = media[0].attributes.name;
    url = process.env.NEXT_PUBLIC_STRAPI_URL + media[0].attributes.url;
  }

  const image = <img src={url} alt={title} title={title} />;

  if (!storeLink) {
    return <a className="image">{image}</a>;
  }
  return (
    <Link href={storeLink} className="image">
      {image}
    </Link>
  );
};
