import styles from './CountryList.module.css';
import { useCities } from '../../contexts/CitiesProvider';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';
import CountryItem from '../CountryItem/CountryItem';

function CountryList() {
  const { countries, isLoading } = useCities();

  if (!countries.length) {
    return (
      <Message message='Add your first city by clicking on a city on the map' />
    );
  }
  return (
    <ul className={styles.countryList}>
      {isLoading && <Spinner />}
      {!isLoading &&
        countries.map(country => (
          <CountryItem
            key={country.id}
            country={{
              country: country.country,
              emoji: country.emoji,
            }}
          />
        ))}
    </ul>
  );
}

export default CountryList;
