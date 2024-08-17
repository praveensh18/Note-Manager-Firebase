import React from 'react';
import s from './style.module.css';
import logoSrc from 'assets/images/logo.png';
import { Logo } from 'components/Logo';
import ButtonPrimary from 'components/ButtonPrimary/ButtonPrimary';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/auth/auth-selectors';
import { AuthAPI } from 'api/auth';
import { setUser } from 'store/auth/auth-slice';

const AVATAR_URL = 'https://api.dicebear.com/5.x/bottts/svg?seed='

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(selectUser);

  const signoutUser = () => {
    AuthAPI.signout()
    dispatch(setUser(null))
  }
  const renderAuthProfile = (
    <div>
      <img src={`${AVATAR_URL}${user.email}`} className={s.user_avatar}/>
      <div>Hello, {user.email}</div>
      <Link to={'#'} onClick={signoutUser}>Signout</Link>
    </div>
  )
  return (
    <div className={`row ${s.container}`}>
      <div className='col-xs-12 col-sm-4'>
        <Logo
          title='Notomatic'
          subtitle={'Manage your notes'}
          image={logoSrc}
          onLogoClick={() => navigate('/')}
        ></Logo>
      </div>
      <div className='col-xs-12 col-sm-8 text-end'>
        {renderAuthProfile}
      </div>
    </div>
  );
};

export default Header;
