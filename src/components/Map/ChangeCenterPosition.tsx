import { useMap } from 'react-leaflet';

interface Props {
  position: [number, number];
}
function ChangeCenterPosition({ position }: Props) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default ChangeCenterPosition;
