import { Button } from '@/modules/common/components/Button';
import { vibrate } from '@/modules/common/lib/vibrate';
import { readGeoData } from '@/modules/api/geo/geo';
import Script from 'next/script';
import { useScreenStore } from '../../stores/screen';
import { useSearchStore } from '../../stores/search';
import { Screen } from '../screen/Screen';
import { Location } from './Location';

export const ZipCode = () => {
  const showScreen = useScreenStore((store) => store.showScreen);
  const toggleScreen = useScreenStore((store) => store.toggleScreen);
  const searchStore = useSearchStore();

  const className = `zipcode ${
    searchStore.search.city ? 'active' : 'inactive'
  }`;

  const getLink = () => {
    if (searchStore.search.city) {
      // TODO: location check
      return (
        <Location
          showOnSuccess
          search={searchStore.search}
          onClick={() => toggleScreen('zipcode')}
        />
      );
    }

    return (
      <span className="action" onClick={() => toggleScreen('zipcode')}>
        Standort per Straße und Ort
      </span>
    );
  };

  const initAutocomplete = () => {
    const autocomplete = new (window as any).google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      {
        types: ['geocode'],
        componentRestrictions: { country: 'de' },
      },
    );
    autocomplete.setFields(['address_components', 'geometry']);
    autocomplete.addListener('place_changed', function (this: any) {
      let place = this.getPlace();
      if (place) {
        let search = readGeoData(place, 'auto');
        if (!search) return;
        vibrate([100, 200, 100]);
        searchStore.update(search);
      }
    });
  };

  return (
    <section className={className}>
      {getLink()}

      <Screen headline="Straße & Ort" name="zipcode" className="dark">
        <div className="search-selection-wrapper">
          <h2>
            Bitte gib deine Straße sowie den Ort ein und wähle einen Vorschlag
            aus der Liste
          </h2>

          <div className="field dark">
            <Script
              src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}&libraries=places&v=weekly`}
              onLoad={initAutocomplete}
            />
            <input type="text" id="autocomplete" placeholder="Straße und Ort" />
          </div>

          <Location search={searchStore.search} />

          <Button
            type="primary-dark"
            rounded={true}
            size="default"
            onClick={() => showScreen('geo')}
          >
            <strong>Helfer*innen finden</strong>
          </Button>
        </div>
      </Screen>
    </section>
  );
};
