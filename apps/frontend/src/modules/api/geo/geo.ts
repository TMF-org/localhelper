import { Search } from '@/modules/customer/stores/search';
import ky from 'ky';

const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}`;

export async function getGeoByZipcode(zipcode: string) {
  const data = await ky
    .get(`${geocodeUrl}&components=country:DE&address=${zipcode}`)
    .json();
  return readGeoData((data as any).results, 'zipcode');
}

export async function getCityByGeo(geo: NonNullable<Search['geo']>) {
  const data = await ky
    .get(`${geocodeUrl}&latlng=${geo.latitude},${geo.longitude}&sensor=false`)
    .json();

  return readGeoData((data as any).results, 'geo');
}

export function readGeoData(result: any, detectType: string) {
  let search: Search = { detectType };

  if (result.length === 0) {
    return console.error('invalid postal');
  }

  if (detectType !== 'auto') {
    result = result[0];
  }

  for (let i = 0; i < result.address_components?.length ?? 0; i++) {
    let address = result.address_components[i];

    for (let a = 0; a < address.types.length; a++) {
      if (address.types[a] === 'locality') {
        search.city = address.long_name;
      }
      if (address.types[a] === 'postal_code') {
        search.zipcode = address.long_name;
      }
    }
  }

  search.geo = {
    latitude:
      detectType === 'auto'
        ? result.geometry.location.lat()
        : result.geometry.location.lat,
    longitude:
      detectType === 'auto'
        ? result.geometry.location.lng()
        : result.geometry.location.lng,
  };

  return search;
}
