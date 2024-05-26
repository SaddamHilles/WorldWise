// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';

import styles from './Form.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import BackButton from '../Button/BackButton';
import { useUrlPostion } from '../../hooks/useUrlPostion';
import axios, { AxiosError } from 'axios';
import { countryCodeToEmoji } from '../../utils/countryCodeToEmoji';
import { useCities } from '../../contexts/CitiesProvider';
import Spinner from '../Spinner/Spinner';
import Message from '../Message/Message';

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char, i) => 127397 + char.charCodeAt(i));
  return String.fromCodePoint(...codePoints);
}

const baseUrl = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

interface CityInfo {
  cityName: string;
  country: string;
  emoji: string;
  notes: string;
  date: Date;
  position: { lat: number; lng: number };
}

function Form() {
  const { refresh } = useCities();
  const [lat, lng] = useUrlPostion();
  const [cityInfo, setCityInfo] = useState<CityInfo>({} as CityInfo);
  const [date, setDate] = useState(new Date());
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingErro, setGeocodingErro] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      async function postCity() {
        await axios.post(`http://localhost:8000/cities`, cityInfo, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        navigate('/app');
        refresh();
      }
      postCity();
    } catch (er) {
      console.error((er as AxiosError).message);
    }
  }

  useEffect(() => {
    (async function () {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingErro('');
        const { data } = await axios.get(
          `${baseUrl}?latitude=${lat}&longitude=${lng}`,
        );
        const { city, countryCode, countryName, locality } = data;

        if (!city) {
          throw new Error(
            `That doesn't seem to be a city. Click somewhere else 😉`,
          );
        }

        const newCity = {
          cityName: city || locality,
          country: countryName,
          emoji: countryCodeToEmoji(countryCode),
          notes: '',
          date,
          position: { lat: Number(lat), lng: Number(lng) },
        };
        // lat: lat ? +lat : 0, lng: lng ? +lng : 0

        setCityInfo(newCity);
      } catch (er) {
        setGeocodingErro((er as Error).message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    })();
  }, [lat, lng]);

  function handleOnChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    const newVal = { ...cityInfo, [name]: value };
    setCityInfo(newVal);
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (geocodingErro) return <Message message={geocodingErro} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          name='cityName'
          onChange={handleOnChange}
          value={cityInfo?.cityName || ''}
        />
        <span className={styles.flag}>{cityInfo.emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityInfo?.cityName}?</label>
        <input
          id='date'
          onChange={e => setDate(new Date(e.target.value))}
          value={date.toISOString()}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>
          Notes about your trip to {cityInfo?.cityName}
        </label>
        <textarea
          id='notes'
          name='notes'
          onChange={handleOnChange}
          value={cityInfo?.notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
