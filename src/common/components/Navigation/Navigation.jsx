import React from 'react';

import 'common/components/Navigation/Navigation.css';

const Navigation = () => {
  return (
    <nav>
      <ul className="Navigation__list">
        <li><a className="Navigation__list-item" href="/">Главная</a></li>
        <li><a className="Navigation__list-item" href="/products.html">Продукция</a></li>
        <li><a className="Navigation__list-item" href="/about.html">О Нас</a></li>
        <li><a className="Navigation__list-item" href="/contacts.html">Контакты</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
