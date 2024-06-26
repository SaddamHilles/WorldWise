import { useCities } from '../../contexts/CitiesProvider';
import CityItem from '../CityItem/CityItem';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';
import styles from './CityList.module.css';

function CityList() {
  const { cities, isLoading } = useCities();

  if (!cities.length) {
    return (
      <Message message='Add your first city by clicking on a city on the map' />
    );
  }
  return (
    <ul className={styles.cityList}>
      {isLoading && <Spinner />}
      {!isLoading && cities.map(city => <CityItem key={city.id} city={city} />)}
    </ul>
  );
}

export default CityList;
