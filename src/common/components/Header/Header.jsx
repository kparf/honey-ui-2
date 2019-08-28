import React from 'react';
import Navigation from 'common/components/Navigation/Navigation.jsx';

import 'common/components/Header/Header.css';
import phoneIcon from 'common/components/Header/phone.svg';
import pinDropIcon from 'common/components/Header/pin-drop.svg';

const Header = () => {
  return (
    <header className="Header">
      <div className="Header__container">
        <img property="logo" src="https://via.placeholder.com/100.png" />
        <div className="information-container">
          <div className="phones-container">
            <img className="Header__icon" src={phoneIcon} />
            <div className="phone-list Header__list">
              Телефон:
              <span property="phone" mv-multiple mv-default="+375 11 111 111"></span>
            </div>
          </div>
          <div className="address-container">
            <img className="Header__icon" src={pinDropIcon} />
            <div className="address-list Header__list">
              Адрес:
              <span property="address" mv-multiple mv-default="Адрес"></span>
            </div>
          </div>
        </div>
      </div>
      <Navigation/>
    </header>
  );
};

export default Header;
