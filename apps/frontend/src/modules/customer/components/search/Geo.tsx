import { Button } from '@/modules/common/components/Button';
import { Icon } from '@/modules/common/components/Icon';
import { getCityByGeo } from '@/modules/api/geo/geo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useScreenStore } from '../../stores/screen';
import { useSearchStore } from '../../stores/search';
import { Location } from './Location';

export const Geo = () => {
  const [error, setError] = useState<GeolocationPositionError>();

  const isActive = useScreenStore((store) => store.isActive);
  const switchScreen = useScreenStore((store) => store.switchScreen);
  const [search, update, getResultUrl] = useSearchStore((store) => [
    store.search,
    store.update,
    store.getResultUrl,
  ]);

  const router = useRouter();
  const redirectToResults = search.geo?.latitude && search.geo?.longitude;

  // get position from browser via geolocation API
  useEffect(() => {
    if (redirectToResults) return;

    try {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          let geo = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };

          getCityByGeo(geo)
            .then((search) => {
              if (!search) return;
              update(search);
            })
            .catch((error) => {
              console.error(error);
            });
        },
        (error) => {
          console.error(error);
          setError(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    } catch (e) {
      console.error('navigator.geolocation not supported');
    }
  }, [redirectToResults]);

  // redirect to results
  useEffect(() => {
    if (!redirectToResults) return;
    if (!isActive('geo')) return;
    router.replace(getResultUrl());
  }, [redirectToResults]);

  if (redirectToResults) {
    // get results
    return (
      <div className="search-selection-wrapper">
        <h2>Helfer in der Nähe werden gesucht</h2>

        <div className="loading">
          <Icon name="lokalhelfer" />
          <p>Kurz einmal durchatmen, bevor wir Deinen Helfer gefunden haben.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-selection-wrapper">
      <h2>Akzeptiere die Standort-Ermittlung</h2>

      <Location search={search} />

      <Button
        type="primary-dark"
        size="default"
        onClick={() => switchScreen('geo', 'zipcode')}
      >
        <strong>Alternativ per Adresse</strong>
      </Button>
    </div>
  );
};
