import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BackIcon } from '@/modules/common/components/icons/back';
import { LocationIcon } from '@/modules/common/components/icons/location';
import { NextIcon } from '@/modules/common/components/icons/next';

import {
  GMap,
  MapSearchInput,
  useMapLoader,
} from '@/modules/common/components/GMap';
import { Marker } from '@react-google-maps/api';
import { StepProps } from '../Wizard';

const errorMessage = 'Bitte gib eine gültige Adresse ein';
export const locationSchema = z.object({
  geo: z.object({
    lat: z.number({
      required_error: errorMessage,
      invalid_type_error: errorMessage,
    }),
    lng: z.number({
      required_error: errorMessage,
      invalid_type_error: errorMessage,
    }),
  }),
  address: z
    .string({ invalid_type_error: errorMessage, required_error: errorMessage })
    .trim()
    .nonempty({ message: errorMessage }),
});

type FormValues = z.infer<typeof locationSchema>;

export const LocationStep = ({
  defaultValues,
  updateAndNext: updateAndNext,
  updateAndBack: updateAndBack,
}: StepProps) => {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues,
  });
  const geo = watch('geo');

  const { isLoaded, mapDefaultProps } = useMapLoader(['places']);

  const onUpdatePlace = (place?: google.maps.places.PlaceResult) => {
    setValue('geo', {
      lat: place?.geometry?.location?.lat() ?? 0,
      lng: place?.geometry?.location?.lng() ?? 0,
    });
    setValue('address', place?.formatted_address ?? '');
  };

  return (
    <form onSubmit={handleSubmit(updateAndNext)}>
      <div className="description-small not-on-mobile box-centered bgc-white pdg-25">
        <div className="info">
          <LocationIcon />
          <p>
            Auf unserer Webseite bieten wir eine Umkreissuche an, deshalb ist es
            wichtig, dass du uns deine Adresse nennst. So finden dich Menschen
            schneller, die in ihrer Umgebung Hilfe suchen.
          </p>
        </div>
      </div>

      <div className="frm box-centered pdg-top-20">
        <div className="frm location-on-mobile grd-1 bgc-white pdg-20">
          <h3 className="pdg-btm-35 fsi-26 not-on-mobile pdg-top-20">
            Wo befindest du dich?
          </h3>
          <fieldset className="grd-2 pdg-rgt-10 bgc-white-on-mobile">
            <MapSearchInput
              label="Adresse:"
              isLoaded={isLoaded}
              onUpdatePlace={onUpdatePlace}
              defaultValue={defaultValues.address}
              error={errors.address ?? errors.geo?.lat ?? errors.geo?.lng}
            />

            <p className="tip not-on-mobile pdg-10">
              Anhand der Adresse werden die Geokoordinaten deines Standortes
              ermittelt. Hierbei handelt es sich um die Angabe des Breiten- und
              Längengrades.
            </p>
          </fieldset>

          <fieldset className="grd-2">
            <GMap
              {...mapDefaultProps}
              center={{
                lat: geo?.lat ?? mapDefaultProps.center.lat,
                lng: geo?.lng ?? mapDefaultProps.center.lng,
              }}
            >
              {geo?.lat && geo?.lng && <Marker position={geo} />}
            </GMap>
          </fieldset>

          <h3 className="pdg-btm-35 fsi-26 only-on-mobile pdg-top-20">
            Wo befindest du dich?
          </h3>
        </div>
      </div>
      <div className="frm not-on-mobile box-centered pdg-top-20">
        <button
          type="button"
          className="flt-lft button secondary"
          onClick={handleSubmit(updateAndBack)}
        >
          <span>Vorheriger Schritt</span>
        </button>

        <button type="submit" className="flt-rgt button">
          <span>Nächster Schritt!</span>
          <NextIcon />
        </button>
      </div>

      <div className="frm box-centered only-on-mobile box-centered flx-btns">
        <button
          type="button"
          className="left-flx-btn button secondary"
          onClick={handleSubmit(updateAndBack)}
        >
          <BackIcon className="mobile-back" />
        </button>

        <button className="right-flx-btn button">
          <div>
            <span>Nächster Schritt!</span>
          </div>
        </button>
      </div>
    </form>
  );
};
