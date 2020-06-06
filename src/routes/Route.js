import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

import { store } from '../store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  adminPage,
  ...rest
}) {
  const { signed, isAdmin } = store.getState().auth;

  const Layout = signed ? DefaultLayout : AuthLayout;

  if (!signed && isPrivate) {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Layout>
            <Redirect {...props} to="/" />
          </Layout>
        )}
      />
    );
  }

  if (signed && !isPrivate) {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Layout>
            <Redirect {...props} to="/home" />
          </Layout>
        )}
      />
    );
  }

  if (!isAdmin && adminPage) {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Layout>
            <Redirect {...props} to="/home" />
          </Layout>
        )}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}
RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  adminPage: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  adminPage: false,
};
