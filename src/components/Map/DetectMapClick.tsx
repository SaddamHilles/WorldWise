import { LeafletMouseEvent } from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

function DetectMapClick() {
  const navigate = useNavigate();

  function handleDetectClick(e: LeafletMouseEvent) {
    console.log('e: ', e);
    navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
  }
  useMapEvents({ click: handleDetectClick });
  return null;
}

export default DetectMapClick;
