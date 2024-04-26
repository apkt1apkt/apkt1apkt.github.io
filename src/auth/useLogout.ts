import { googleLogout } from '@react-oauth/google';
import { useAuthSetter } from '@src/auth/useAuth';

export const useLogout = () => {
  const setUser = useAuthSetter();
  const logout = () => {
    localStorage.removeItem('jwt');
    googleLogout();
    setUser({ id: '', name: '', sub: '', isLoggedIn: false });
  };
  return logout;
};
