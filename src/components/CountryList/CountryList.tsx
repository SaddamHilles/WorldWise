import styles from './CountryList.module.css';
import { useWordWise } from '../../context/Provider';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';
import CountryItem from '../CountryItem/CountryItem';

function CountryList() {
 const { countries, isLoading } = useWordWise();
 console.log('countries: ', countries);

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
