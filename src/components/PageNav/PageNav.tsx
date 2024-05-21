import { NavLink } from 'react-router-dom';
import Logo from '../Login/Logo';
import styles from './PageNav.module.css';
import { useAuth } from '../../contexts/AuthProvider';

function PageNav() {
  const { isAuth, logout } = useAuth();

  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to='/pricing'>Pricing</NavLink>
        </li>
        <li>
          <NavLink to='/product'>Product</NavLink>
        </li>

        <li>
          <NavLink
            to={isAuth ? '/' : '/login'}
            className={`${styles.ctaLink} ${isAuth && styles.bgWhiteColoe}`}
            onClick={logout}
          >
            {isAuth ? 'Loggout' : 'Login'}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
