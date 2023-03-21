import { useHelpersForMap } from '@/modules/api/helper/queries';
import { GMap, useMapLoader } from '@/modules/common/components/GMap';
import { MarkerF } from '@react-google-maps/api';
import { useRouter } from 'next/router';

export const HelpersMap = () => {
  const router = useRouter();
  const { data } = useHelpersForMap();
  const { mapDefaultProps } = useMapLoader();

  const helpers = data?.data ?? [];

  return (
    <GMap
      {...mapDefaultProps}
      options={mapOptions}
      mapContainerStyle={mapContainerStyle}
    >
      {helpers.map((helper) => {
        return (
          <MarkerF
            key={helper.id}
            position={{
              lat: parseFloat(helper.attributes.geo.lat),
              lng: parseFloat(helper.attributes.geo.lng),
            }}
            icon={{ url: '/image/map-marker.png' }}
            title={helper.attributes.name}
            onClick={() => {
              router.push(`/helper/${helper.attributes.url}`);
            }}
          />
        );
      })}
    </GMap>
  );
};

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const mapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  styles: [
    {
      featureType: 'all',
      elementType: 'geometry.fill',
      stylers: [{ weight: '2.00' }],
    },
    {
      featureType: 'all',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#9c9c9c' }],
    },
    {
      featureType: 'all',
      elementType: 'labels.text',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [{ color: '#f2f2f2' }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ffffff' }],
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ffffff' }],
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [{ saturation: -100 }, { lightness: 45 }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [{ color: '#eeeeee' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#7b7b7b' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#ffffff' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [{ visibility: 'simplified' }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [{ color: '#7b7b7b' }, { visibility: 'on' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{ color: '#7b7b7b' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#070707' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#ffffff' }],
    },
  ],
};
