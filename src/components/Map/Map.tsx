import styles from './Map.module.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../../contexts/CitiesProvider';
import ChangeCenterPosition from './ChangeCenterPosition';
import DetectMapClick from './DetectMapClick';
import { useGeolocation } from '../../hooks/useGeolocation';
import Button from '../Button/Button';
import { useUrlPostion } from '../../hooks/useUrlPostion';

function Map() {
  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);
  const { cities } = useCities();
  const [lat, lng] = useUrlPostion();

  const {
    position: geoLocationPosition,
    getPosition,
    isLoading: isLoadingPosition,
    error,
  } = useGeolocation({});

  useEffect(
    function () {
      if (lat && lng) setMapPosition([+lat, +lng]);
    },
    [lat, lng],
  );

  useEffect(() => {
    if (geoLocationPosition.lat && geoLocationPosition.lng) {
      setMapPosition([+geoLocationPosition.lat, +geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  if (error) {
    alert(error);
  }

  return (
    <div className={styles.mapContainer}>
      <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? 'Loading...' : 'User your position'}
      </Button>
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
