import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import Leaderboard from '../pages/Leaderboard';
import Admin from '../pages/Admin';
import UserPage from '../pages/UserPage';
import ForgotPassword from '../pages/ForgotPassword';
import PasswordReset from '../pages/PasswordReset';
import WaitingPage from '../pages/WaitingPage';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={WaitingPage} />
      <Route path="/login" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/forgot_password" component={ForgotPassword} />
      <Route path="/reset_password" component={PasswordReset} />

      <Route path="/home" component={Home} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/leaderboard" component={Leaderboard} isPrivate />
      <Route path="/user/:id" component={UserPage} isPrivate />

      <Route path="/admin" component={Admin} isPrivate adminPage />

      <Route path="/" component={() => <h1>404 - Seu lugar é no museu</h1>} />
    </Switch>
  );
}
