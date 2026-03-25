export function getTintFromHex(hex: string) {
  const normalizedHex = hex.replace('#', '');

  if (normalizedHex.length !== 6) return '#ffffff';

  const red = Number.parseInt(normalizedHex.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHex.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHex.slice(4, 6), 16);

  const mix = (channel: number) =>
    Math.round(channel + (255 - channel) * 0.88)
      .toString(16)
      .padStart(2, '0');

  if ([red, green, blue].some(Number.isNaN)) return '#ffffff';

  return `#${mix(red)}${mix(green)}${mix(blue)}`;
}
