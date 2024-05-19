import { useState } from 'react';

interface Position {
  lat: number;
  lng: number;
}

export function useGeolocation(defaultPosition: Partial<Position>) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<Partial<Position>>(defaultPosition);
  const [error, setError] = useState('');

  function getPosition() {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation');

    setIsLoading(true);

    function showPosition(position: GeolocationPosition) {
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setError('');
      setIsLoading(false);
    }

    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }

  function showError(error: GeolocationPositionError) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        setError('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        setError('The request to get user location timed out.');
        break;
      default:
        setError('An unknown error occurred.');
        break;
    }
  }

  return { isLoading, position, error, getPosition };
}
