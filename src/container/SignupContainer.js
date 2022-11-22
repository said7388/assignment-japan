import React, { useEffect, useState } from 'react';
import SignupForm from '../ui/SignupForm';

const SignupContainer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    console.log({ email, password });
  }, [email, password]);

  return (
    <SignupForm setPassword={setPassword} setEmail={setEmail} />
  );
};

export default SignupContainer;