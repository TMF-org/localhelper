export function vibrate(rythm: Iterable<number>) {
  if (!!navigator && navigator.hasOwnProperty('vibrate')) {
    navigator.vibrate(rythm);
  }
}
