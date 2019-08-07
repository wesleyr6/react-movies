import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const PublicRoute = (props) => {
  const {
    component: Component,
    routerProps,
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={renderProps => <Component auth={false} routerProps={routerProps} {...renderProps} />}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
  routerProps: PropTypes.instanceOf(Object),
};

PublicRoute.defaultProps = {
  routerProps: {},
};

export default PublicRoute;
