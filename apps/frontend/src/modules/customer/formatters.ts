export function formatDistance(value: number) {
  let unit = 'm';
  let convertedValue = value;

  if (value > 999) {
    convertedValue = parseFloat((value / 1000).toFixed(1));
    unit = 'km';
  }

  return `${convertedValue} ${unit}`;
}
