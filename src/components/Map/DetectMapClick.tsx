import { useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

function DetectMapClick() {
 const navigate = useNavigate();
 useMapEvents({ click: () => navigate('form') });
 return null;
}

export default DetectMapClick;
