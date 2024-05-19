import { useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../../context/CitiesProvider';
import ChangeCenterPosition from './ChangeCenterPosition';
import DetectMapClick from './DetectMapClick';

function Map() {
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);

  const [error, setError] = useState('');

  useEffect(() => {
    function showPosition(position: GeolocationPosition) {
      setMapPosition([position.coords.latitude, position.coords.longitude]);
      setError('');
    }

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };
    getUserLocation();
  }, []);

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([+lat, +lng]);
    }
  }, [lat, lng]);

  const showError = (error: any) => {
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
      case error.UNKNOWN_ERROR:
        setError('An unknown error occurred.');
        break;
      default:
        setError('An unknown error occurred.');
        break;
    }
  };

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={mapPosition} zoom={10} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map(city => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenterPosition position={mapPosition} />
        <DetectMapClick />
      </MapContainer>
    </div>
  );
}

export default Map;
