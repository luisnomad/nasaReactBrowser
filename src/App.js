import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import Asset from './components/asset';
import Search from './components/search';

const App = () => (
    <div>
        <Header />
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/search' component={Search}/>
            <Route path='/asset/:asset' component={Asset}/>
        </Switch>
    </div>
)

export default App;