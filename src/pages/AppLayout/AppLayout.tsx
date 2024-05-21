import Map from '../../components/Map/Map';
import Sidebar from '../../components/Sidebar/Sidebar';
import User from '../../components/User/User';
import { useAuth } from '../../contexts/AuthProvider';
import styles from './AppLayout.module.css';

function AppLayout() {
  const { isAuth } = useAuth();

  return (
    <div className={styles.app}>
      {isAuth && <User />}
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
