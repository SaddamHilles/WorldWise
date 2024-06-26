import axios from 'axios';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { City, Country } from '../utils/types.t';

export const baseUrl = 'http://localhost:8000';

interface Cities {
  cities: City[];
  isLoading: boolean;
  countries: Country[];
  currentCity: string;
  handleCurrentCity: (id: string) => void;
  refresh: () => void;
}

const CitiesContext = createContext<Cities>({} as Cities);

const CitiesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState('');

  function handleCurrentCity(id: string) {
    setCurrentCity(id);
  }
  function fetchCities() {
    (async function () {
      try {
        setIsLoading(true);
        const { data, statusText } = await axios.get<City[]>(
          `${baseUrl}/cities`,
        );

        if (statusText !== 'OK') {
          throw new Error('Something went wrong with fetch cities!');
        }

        const countries = data.reduce<Country[]>((arr, city) => {
          if (arr.some(item => item.country === city.country)) {
            return arr;
          } else {
            return [
              ...arr,
              {
                country: city.country,
                emoji: city.emoji,
                id: city.id,
              },
            ];
          }
        }, []);

        setCountries(countries);
        setCities(data);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }
  useEffect(() => {
    fetchCities();
  }, []);

  function refresh() {
    fetchCities();
  }

  const contextData: Cities = {
    cities,
    isLoading,
    countries,
    handleCurrentCity,
    currentCity,
    refresh,
  };
  return (
    <CitiesContext.Provider value={contextData}>
      {children}
    </CitiesContext.Provider>
  );
};

function useCities() {
  const ctxCities = useContext(CitiesContext);
  if (!ctxCities) {
    throw new Error('Cities context was used outside of the CitiesProvider');
  }
  return ctxCities;
}
export { CitiesProvider, useCities };

// const uniqueCountriesMap = new Map();
// data.forEach(city => {
//     uniqueCountriesMap.set(city.country, {
//         country: city.country,
//         emoji: city.emoji,
//         id: city.id,
//     });
// });
// const uniqueCountriesArray = Array.from(
//     uniqueCountriesMap.values()
// );
// setCountries(uniqueCountriesArray as Country[]);
