import { CredentialResponse } from '@react-oauth/google';
import { User } from '@src/auth/AuthProvider';
import { envService } from '@src/helpers/env-service';
import { jwtDecode } from 'jwt-decode';

export const useVerifyLogin = (
  onSuccess: (user: User) => void,
  onFailure: (user: User) => void,
) => {
  const verifyLogin = (response: CredentialResponse) => {
    fetch(`${envService.serverUrl}/auth/verify-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('failed');
        return res.json();
      })
      .then((data) => {
        localStorage.setItem('jwt', data.accessToken);
        const decoded = jwtDecode<Record<string, string>>(data.accessToken);
        onSuccess({ id: decoded.id, name: decoded.name, sub: decoded.sub, isLoggedIn: true });
      })
      .catch(onFailure);
  };
  return verifyLogin;
};
