// src/components/LoginComponent.tsx

import { useMutation } from '@apollo/client';
import { useAuth } from '../hooks/useAuth'; // Import the Zustand store
import { gql } from '@apollo/client';
import React from 'react';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      access_token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

const LoginComponent = () => {
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({ variables: { email, password } });
      if (data?.login?.access_token) {
        localStorage.setItem('token', data.login.access_token);
        login(email, password); // Update Zustand store after successful login
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <button onClick={() => handleLogin('test@example.com', 'password123')}>
        Login
      </button>
    </div>
  );
};

export default LoginComponent;
