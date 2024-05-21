import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

interface Props {
  children: React.ReactNode;
}
function ProtectedRoute({ children }: Props) {
  const { isAuth } = useAuth();
  // const navigate = useNavigate()
  return isAuth ? <div>{children}</div> : <Navigate to={'/'} />;
}

export default ProtectedRoute;
