import { GoogleLogin } from '@react-oauth/google';
import { useAuthSetter } from '@src/auth/useAuth';
import { useVerifyLogin } from '@src/auth/useVerifyLogin';
import { useAppNotification } from '@src/hooks/useAppNotification';

export const LoginPage = () => {
  const showNotification = useAppNotification();
  const setUser = useAuthSetter();

  const onLoginFailure = () => {
    setUser({ id: '', name: '', sub: '', isLoggedIn: false });
    showNotification({ type: 'error', message: 'Login Failed' });
  };

  const verifyLogin = useVerifyLogin(setUser, onLoginFailure);

  return (
    <div style={{ display: 'grid', placeItems: 'center', width: '100vw' }}>
      <div>Login To Add To Funeral Contribution </div>
      <GoogleLogin onSuccess={verifyLogin} onError={onLoginFailure} />
    </div>
  );
};
