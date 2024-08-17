import React from 'react';
import s from './style.module.css';
import { ReactComponent as LogoSVG } from 'assets/images/logoSVG.svg';

const AuthLayout = ({ children }) => {
  const header = (
    <div className={s.header}>
      <LogoSVG className={s.logoSVG_top} />
      <h5 className={s.logoTitle}>Notomatic</h5>
    </div>
  );

  const background = (
    <div>
      <div className='d-flex'>
        <LogoSVG className={s.logoSVG_right} />
        <h1 className={s.background_title}>Notomatic</h1>
      </div>
      <p className={s.subText}>One place for the team notes</p>
    </div>
  );

  return (
    <div className={s.container}>
			{header}
      <div className={s.leftSection}>
        {children}
      </div>

      <div className={`${s.rightSection} d-none d-md-flex`}>{background}</div>
    </div>
  );
};

export default AuthLayout;
