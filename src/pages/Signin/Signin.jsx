import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import s from './style.module.css';
import Input from 'components/Input/Input';
import AuthLayout from 'layouts/AuthLayout';
import ButtonPrimary from 'components/ButtonPrimary/ButtonPrimary';
import { AuthAPI } from 'api/auth';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/auth/auth-slice';
import { toast } from 'utils/alert';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await AuthAPI.signin(email, password);
      dispatch(setUser(user));
      await toast('success', 'Auth succeed! Redirecting...');
      navigate('/');
    } catch (err) {
      toast('error', err.message);
    }
  };

  const form = (
    <div className={s.formContainer}>
      <h2 className={s.title}>
        Signin <br />
        to access your team notes
      </h2>
      <form onSubmit={formSubmit} className={s.formGroup}>
        <Input placeholder={'Enter Email'} onTextChange={setEmail} />
        <Input
          placeholder={'Enter Password'}
          inputType={'password'}
          onTextChange={setPassword}
        />
        <ButtonPrimary className={s.button} type='submit'>
          Signin
        </ButtonPrimary>
        <span>
          Don't have account yet? <Link to={'/Signup'}>Signup</Link>
        </span>
      </form>
    </div>
  );
  return <AuthLayout>{form}</AuthLayout>;
};

export default Signin;
