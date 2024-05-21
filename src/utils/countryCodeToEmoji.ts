export function countryCodeToEmoji(countryCode: string) {
  // Ensure the country code is in uppercase
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
