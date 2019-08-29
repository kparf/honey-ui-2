import React from 'react';
import Navigation from 'common/components/Navigation/Navigation.jsx';
import Phones from 'common/components/Phones/Phones.jsx';
import Address from 'common/components/Address/Address.jsx';

import logo from 'common/components/Header/default-logo.png';
import style from 'common/components/Header/Header.css';

const Header = () => {
  return (
    <header className={style['Header']}>
      <div className={style['Header__container']}>
        <img property="logo" src={logo} />
        <div className={style['Header__information-container']}>
          <Phones />
          <Address />
        </div>
      </div>
      <Navigation/>
    </header>
  );
};

export default Header;
