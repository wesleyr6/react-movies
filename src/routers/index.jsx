/* eslint-disable no-undef */
import React from 'react';
import uuidv1 from 'uuid/v1';
import { Switch, BrowserRouter } from 'react-router-dom';
import myRoutes from './routers';
import PublicRoute from '../components/PublicRoute';

const Routers = () => (
  <BrowserRouter>
    <Switch>
      {
        myRoutes.filter(route => route.active).map(item => (
          <PublicRoute
            key={uuidv1()}
            exact
            path={item.path}
            component={item.component}
            routerProps={item.routerProps}
          />
        ))
      }
    </Switch>
  </BrowserRouter>
);

export default Routers;
