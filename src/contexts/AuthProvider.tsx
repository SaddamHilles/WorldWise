import { createContext, useContext, useState } from 'react';

export interface User {
  email: string;
  password: string;
  avatar?: string;
}
interface Auth {
  user: User;
  isAuth: boolean;
  login: (userInfo: User) => void;
  logout: () => void;
}
const AuthContext = createContext({} as Auth);

interface Props {
  children: React.ReactNode;
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>({} as User);
  const [isAuth, setIsAuth] = useState(false);

  function login(userInfo: User) {
    console.log('userInfo: ', userInfo);
    if (
      userInfo.email === FAKE_USER.email &&
      userInfo.password === FAKE_USER.password
    ) {
      setUser({...userInfo, avatar: FAKE_USER.avatar});
      setIsAuth(true);
    }
  }
  function logout() {
    setUser({ email: '', password: '', avatar: '' });
    setIsAuth(false);
  }
  const auth: Auth = {
    user,
    login,
    logout,
    isAuth,
  };
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const ctxAuth = useContext(AuthContext);
  if (!ctxAuth) {
    throw new Error("You can't use AuthContext outside the AuthProvider");
  }
  return ctxAuth;
}
export { AuthProvider, useAuth };
