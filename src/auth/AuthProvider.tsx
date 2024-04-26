import { createContext, ReactNode, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { LoginPage } from '@src/auth/LoginPage';

export type User = {
  name: string;
  isLoggedIn: boolean;
  id: string;
  sub: string;
};

type UserContext = [User, React.Dispatch<React.SetStateAction<User>>];

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<UserContext>([
  {
    isLoggedIn: false,
    name: '',
    id: '',
    sub: '',
  },
  () => {},
]);

export const AuthProvider = (props: AuthProviderProps) => {
  const userDispatch = useState<User>({ name: '', id: '', sub: '', isLoggedIn: false });
  const [user, setUser] = userDispatch;

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const decoded = jwtDecode<Record<string, string>>(token);
        const isExpired = +decoded?.exp! * 1000 < Date.now();
        if (isExpired) localStorage.removeItem('jwt');
        setUser({ name: decoded.name, id: decoded.id, sub: decoded.sub, isLoggedIn: true });
      } catch (error) {
        localStorage.removeItem('jwt');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={userDispatch}>
      {!user.isLoggedIn ? <LoginPage /> : props.children}
    </AuthContext.Provider>
  );
};
