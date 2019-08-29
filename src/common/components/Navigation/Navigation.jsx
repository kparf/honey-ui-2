import React from 'react';

import style from 'common/components/Navigation/Navigation.css';

const Navigation = () => {
  return (
    <nav>
      <ul className={style['Navigation__list']}>
        <li><a className={style['Navigation__list-item']} href="/">Главная</a></li>
        <li><a className={style['Navigation__list-item']} href="/products.html">Продукция</a></li>
        <li><a className={style['Navigation__list-item']} href="/about.html">О Нас</a></li>
        <li><a className={style['Navigation__list-item']} href="/contacts.html">Контакты</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
