import axios from 'axios';
import {
 PropsWithChildren,
 createContext,
 useContext,
 useEffect,
 useState,
} from 'react';
import type { City, Country } from '../utils/types.t';

const baseUrl = 'http://localhost:8000';

interface WorldWise {
 cities: City[];
 isLoading: boolean;
 countries: Country[];
}

const initialState: WorldWise = { cities: [], countries: [], isLoading: false };

const WorldWiseContext = createContext<WorldWise>(initialState);

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
 const [cities, setCities] = useState<City[]>([]);
 const [countries, setCountries] = useState<Country[]>([]);
 const [isLoading, setIsLoading] = useState(false);

 // const uniqueCountriesMap = new Map();

 useEffect(() => {
  (async function () {
   try {
    setIsLoading(true);
    const { data } = await axios.get<City[]>(`${baseUrl}/cities`);
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
 }, []);

 const contextData: WorldWise = {
  cities,
  isLoading,
  countries,
 };
 return (
  <WorldWiseContext.Provider value={contextData}>
   {children}
  </WorldWiseContext.Provider>
 );
};

function useWordWise() {
 const ctxWorldWise = useContext(WorldWiseContext);
 if (!ctxWorldWise) {
  throw new Error(
   'WorldWise context was used outside of the WorldWiseProvider',
  );
 }
 return ctxWorldWise;
}
export { Provider, useWordWise };
