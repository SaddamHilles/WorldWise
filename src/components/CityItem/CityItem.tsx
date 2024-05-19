import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import { City } from '../../utils/types.t';
import styles from './CityItem.module.css';
import { useCities } from '../../context/CitiesProvider';
interface Props {
 city: City;
}
function CityItem({ city }: Props) {
 const { handleCurrentCity, currentCity } = useCities();

 const { cityName, emoji, date, position } = city;

 return (
  <li>
   <Link
    to={`${city.id}?lat=${position.lat}&lng=${position.lng}`}
    className={`${styles.cityItem} ${
     currentCity === city.id && styles['cityItem--active']
    } `}
    onClick={() => handleCurrentCity(city.id)}
   >
    <span className={styles.emoji}>{emoji}</span>
    <h3 className={styles.name}>{cityName}</h3>
    <time className={styles.date}>
     {formatDate(date).split(', ').slice(1).join(', ')}
    </time>
    <button className={styles.deleteBtn}>&times;</button>
   </Link>
  </li>
 );
}

export default CityItem;
