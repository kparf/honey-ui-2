import React from 'react';
import Header__icon from 'common/components/Header__icon/Header__icon.jsx';

import style from 'common/components/Address/Address.css';
import pinDropIcon from 'common/components/Address/pin-drop.svg';

const Address = () => {
  return (
    <div className={style['Address']}>
      <Header__icon src={pinDropIcon}/>
      <div className={style['Address__list']}>
        Адрес:
        <span property="address" mv-multiple mv-default="Адрес"></span>
      </div>
    </div>
  );
};

export default Address;
