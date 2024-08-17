import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from 'layouts/AuthLayout';
import Input from 'components/Input/Input';
import ButtonPrimary from 'components/ButtonPrimary/ButtonPrimary';
import s from './style.module.css';
import { AuthAPI } from 'api/auth';
import { toast } from 'utils/alert';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/auth/auth-slice';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const formSubmit = async (e) => {
    e.preventDefault();
    if (password === password2) {
      try {
        const user = await AuthAPI.signup(email, password);
        dispatch(setUser(user));
        await toast('success', 'Signed up successfully..');
        navigate('/');
      } catch (err) {
        toast('error', err.message);
      }
    } else {
      toast('error', 'Password does not match!');
    }
  };

  const form = (
    <div className={s.formContainer}>
      <h2 className={s.title}>
        Signup <br />
        to access your team notes
      </h2>
      <form onSubmit={formSubmit} className={s.formGroup}>
        <Input placeholder={'Enter Email'} onTextChange={setEmail} />
        <Input
          placeholder={'Enter Password'}
          inputType={'password'}
          onTextChange={setPassword}
        />
        <Input
          placeholder={'Re-enter Password'}
          inputType={'password'}
          onTextChange={setPassword2}
        />
        <ButtonPrimary className={s.button} type='submit'>
          Signin
        </ButtonPrimary>
        <span>
          Already have an account? <Link to={'/Signin'}>Signin</Link>
        </span>
      </form>
    </div>
  );
  return <AuthLayout>{form}</AuthLayout>;
};

export default Signup;
