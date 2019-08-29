import React from 'react';
import classnames from 'classnames';

import style from 'common/components/Header__icon/Header__icon.css';

const Header__icon = ({className, src}) => {
  return <img className={classnames(className, style['Header__icon'])} src={src}/>;
};

export default Header__icon;
