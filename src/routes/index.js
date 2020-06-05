import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import Leaderboard from '../pages/Leaderboard';
import Admin from '../pages/Admin';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/home" component={Home} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/leaderboard" component={Leaderboard} isPrivate />
      <Route path="/admin" component={Admin} isPrivate adminPage />

      <Route path="/" component={() => <h1>404 - Seu lugar é no museu</h1>} />
    </Switch>
  );
}
