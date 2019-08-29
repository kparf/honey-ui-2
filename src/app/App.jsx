import React from 'react';
import Header from 'common/components/Header/Header.jsx';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import NotFoundPage from 'common/components/NotFoundPage/NotFoundPage.jsx';
import ProductsPage from 'products/components/ProductsPage/ProductsPage.jsx';
import HomePage from 'home/components/HomePage/HomePage.jsx';

import style from 'app/App.css';


export const App = () => {
  return (
    <div className={style['App']}>
      <Router history={createBrowserHistory()}>
        <Header></Header>
        <Switch>
          <Route path="/products" component={ ProductsPage }/>
          <Route path="/" component={ HomePage }/>
          <Route component={NotFoundPage}/>
        </Switch>
      </Router>
    </div>
  );
};
