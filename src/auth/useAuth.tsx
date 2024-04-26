import { AuthContext } from '@src/auth/AuthProvider';
import { useContext } from 'react';

export const useAuth = () => useContext(AuthContext)[0];

export const useAuthSetter = () => useContext(AuthContext)[1];
