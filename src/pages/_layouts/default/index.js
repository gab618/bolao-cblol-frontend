import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import jwt from 'jsonwebtoken';

import { signOut } from '../../../store/modules/auth/actions';

import { Wrapper } from './styles';
import Header from '../../../components/Header';

export default function DefaultLayout({ children }) {
  const dispatch = useDispatch();
  const myToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    function checkToken(token) {
      if (token && jwt.decode(token)) {
        const expiry = jwt.decode(token).exp;
        const now = new Date();
        if (now.getTime() > expiry * 1000) {
          dispatch(signOut());
        }
      }
    }
    checkToken(myToken);
  }, [children, dispatch, myToken]);

  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
