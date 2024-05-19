import type { Country } from '../../utils/types.t';
import styles from './CountryItem.module.css';

interface Props {
  country: Partial<Country>;
}
function CountryItem({ country }: Props) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
