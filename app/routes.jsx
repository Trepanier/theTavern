import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Profile from 'containers/Profile';
import FrontCollection from 'containers/FrontCollection'
import Home from 'containers/Home';
import SlugPost from 'containers/SlugPost';
import ReadPage from 'containers/ReadPage';
import Login from 'containers/Login';
import SignUp from 'containers/SignUp';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="profile" component={Profile} />
      <Route path="collection" component={FrontCollection} />
      <Route path="post/:slug" component={SlugPost} />
      <Route path="read/:slug" component={ReadPage} />
      <Route path="login" component={Login} />
      <Route path="signup" component ={SignUp} />
    </Route>
  );
};
