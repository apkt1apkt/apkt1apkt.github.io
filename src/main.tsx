import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { envService } from '@src/helpers/env-service';
import { NotificationProvider } from '@src/providers/NotificationProvider';
import { AuthProvider } from '@src/auth/AuthProvider';
import { MainPage } from '@src/MainPage';
import '@src/index.css';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@src/apollo/apollo-client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NotificationProvider>
      <GoogleOAuthProvider clientId={envService.googleClientId}>
        <AuthProvider>
          <ApolloProvider client={apolloClient}>
            <MainPage />
          </ApolloProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </NotificationProvider>
  </React.StrictMode>,
);
