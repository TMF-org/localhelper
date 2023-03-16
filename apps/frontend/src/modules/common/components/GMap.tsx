import {
  GoogleMap,
  GoogleMapProps,
  StandaloneSearchBox,
  useJsApiLoader,
} from '@react-google-maps/api';
import { ChangeEvent, KeyboardEvent, ReactNode, useRef } from 'react';
import { FieldError } from 'react-hook-form';
import { FormFieldError } from './form/Error';

interface Props extends GoogleMapProps {
  isLoaded: boolean;
}

const containerStyle = {
  width: '100%',
  minHeight: '300px',
};

const defaultCenter = {
  lat: 50.7915077,
  lng: 8.0991558,
};

export const useMapLoader = (libraries: any[] = []) => {
  const librariesConst = useRef(libraries);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY ?? '',
    libraries: librariesConst.current,
  });

  const mapDefaultProps: Omit<Props, 'center'> & {
    center: NonNullable<Props['center']>;
  } = {
    mapContainerStyle: containerStyle,
    center: defaultCenter,
    zoom: 6,
    isLoaded,
    options: {
      streetViewControl: false,
    },
  };

  return { isLoaded, mapDefaultProps };
};

export const GMap = (props: Props) => {
  const { isLoaded, ...gmapProps } = props;
  return (
    <div className="map">
      {isLoaded ? <GoogleMap {...gmapProps} /> : <div>Loading...</div>}
    </div>
  );
};

interface MapSearchInputProps {
  isLoaded: boolean;
  label?: string;
  defaultValue?: string;
  error?: FieldError;
  onUpdatePlace: (
    place?: google.maps.places.PlaceResult,
    label?: string,
  ) => void;
}

export const MapSearchInput = ({
  onUpdatePlace,
  error,
  isLoaded,
  label,
  defaultValue,
}: MapSearchInputProps) => {
  const searchBox = useRef<google.maps.places.SearchBox>();

  const onLoad = (ref: google.maps.places.SearchBox) => {
    searchBox.current = ref;
  };

  const onPlaceChanged = () => {
    if (!searchBox.current) return;
    const places = searchBox.current.getPlaces();
    if (!places?.[0]) return;
    const place = places[0];

    const label = place.formatted_address ?? '';
    onUpdatePlace(place, label);
  };

  // do not submit form on enter in search field
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  // report empty input (mark null)
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.value !== '') return;
    onUpdatePlace(undefined, '');
  };

  if (!isLoaded)
    return (
      <div className="field space">
        <label>Address:</label>
        <input
          type="text"
          autoComplete="address"
          placeholder="Type your address (...loading)"
          disabled
        />
      </div>
    );

  return (
    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlaceChanged}>
      <div className="field space">
        {label && <label>{label}</label>}
        <input
          type="text"
          autoComplete="address"
          placeholder="z.B. Maxstr. 3, Köln"
          defaultValue={defaultValue}
          onKeyDown={onKeyDown}
          onChange={onChange}
        />
        <FormFieldError error={error} />
      </div>
    </StandaloneSearchBox>
  );
};
