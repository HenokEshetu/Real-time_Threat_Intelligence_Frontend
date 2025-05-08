import React from 'react';
import { LoginForm } from '@/components/LoginForm';
import { LoginCard } from '@/components/LoginCard';

export const Login = () => {
  return (
    <div className="flex w-full h-[91vh] items-center justify-center p-6 md:p-10">
      <div className="flex w-[60%] h-[67%] shadow-2xl rounded-2xl">
        <LoginForm />
        <LoginCard />
      </div>
    </div>
  )
};