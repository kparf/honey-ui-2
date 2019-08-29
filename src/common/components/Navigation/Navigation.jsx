import React from 'react';
import {Link} from 'react-router-dom';

import style from 'common/components/Navigation/Navigation.css';

const Navigation = () => {
  return (
    <nav>
      <ul className={style['Navigation__list']}>
        <li><Link className={style['Navigation__list-item']} to="/">Главная</Link></li>
        <li><Link className={style['Navigation__list-item']} to="/products">Продукция</Link></li>
        <li><Link className={style['Navigation__list-item']} to="/about">О Нас</Link></li>
        <li><Link className={style['Navigation__list-item']} to="/contacts">Контакты</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
