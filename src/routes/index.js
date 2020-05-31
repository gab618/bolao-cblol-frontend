import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/home" component={Home} />
      <Route path="/profile" component={Profile} />
    </Switch>
  );
}
