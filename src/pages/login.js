import React from 'react';
import LoginPage from './../components/LoginPage';
import NotLoggedInRequired from '@/components/loginAndAuth/NotLoggedInRequired';

const login = () => {
  return (
    <NotLoggedInRequired>
      <LoginPage />
    </NotLoggedInRequired>
  );
};

export default login;
