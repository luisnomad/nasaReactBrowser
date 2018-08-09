import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import { Search, Asset } from './containers';

import styles from './App.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const App = () => (
    <Fragment>
        <Header />
        <div className={ cx('container') }>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/search' component={Search}/>
                <Route path='/asset/:asset' component={Asset}/>
            </Switch>
        </div>
    </Fragment>
);

export default App;