import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home';
import { Search, Asset } from './containers';

const App = () => (
  <Fragment>
    <main role="main">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route path="/asset/:asset" component={Asset} />
      </Switch>
    </main>
  </Fragment>
);

export default App;
