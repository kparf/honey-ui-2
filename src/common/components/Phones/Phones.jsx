import React from 'react';
import Header__icon from 'common/components/Header__icon/Header__icon.jsx';

import style from 'common/components/Phones/Phones.css';
import phoneIcon from 'common/components/Phones/phone.svg';

const Phones = () => {
  return (
    <div className={style['Phones']}>
      <Header__icon src={phoneIcon}/>
      <div className={style['Phones__list']}>
        Телефон:
        <span property="phone" mv-multiple mv-default="+375 11 111 111"></span>
      </div>
    </div>
  );
};

export default Phones;
