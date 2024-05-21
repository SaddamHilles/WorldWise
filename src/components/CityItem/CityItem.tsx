import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import { City } from '../../utils/types.t';
import styles from './CityItem.module.css';
import { baseUrl, useCities } from '../../contexts/CitiesProvider';
import axios from 'axios';
interface Props {
  city: City;
}
function CityItem({ city }: Props) {
  const { handleCurrentCity, currentCity, refresh } = useCities();

  const { cityName, emoji, date, position, id } = city;

  async function handleDeleteCity(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) {
    e.stopPropagation();
    await axios.delete(`${baseUrl}/cities/${id}`);
    refresh();
  }
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
        <button
          className={styles.deleteBtn}
          onClick={e => handleDeleteCity(e, id)}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
