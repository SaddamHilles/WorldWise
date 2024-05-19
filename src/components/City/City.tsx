import styles from './City.module.css';
import { formatDate } from '../../utils/formatDate';
import { useWordWise } from '../../context/Provider';
import { useParams, useSearchParams } from 'react-router-dom';

function City() {
 const { cities } = useWordWise();
 const params = useParams();
 const [searchParams] = useSearchParams();
 const lat = searchParams.get('lat');
 const lng = searchParams.get('lng');

 const findCity = cities.find(city => city.id === Number(params.id));

 if (!findCity) {
  return <p>City Not Found!</p>;
 }
 const { cityName, emoji, notes, date } = findCity;
 return (
  <div className={styles.city}>
   <div className={styles.row}>
    <h6>City name</h6>
    <h3>
     <span>{emoji}</span> {cityName}
    </h3>
   </div>

   <div className={styles.row}>
    <h6>You went to {cityName} on</h6>
    <p>{formatDate(date || null)}</p>
   </div>

   {notes && (
    <div className={styles.row}>
     <h6>Your notes</h6>
     <p>{notes}</p>
    </div>
   )}

   <div className={styles.row}>
    <h6>Learn more</h6>
    <a
     href={`https://en.wikipedia.org/wiki/${cityName}`}
     target='_blank'
     rel='noreferrer'
    >
     Check out {cityName} on Wikipedia &rarr;
    </a>
   </div>
   <p>
    Position: {lat}, {lng}
   </p>
   <div>{/* <ButtonBack /> */}</div>
  </div>
 );
}

export default City;
