import React, { Fragment } from 'react';
import styles from './Home.scss';
import classNames from 'classnames/bind';
import Header from '../header';

const cx = classNames.bind(styles);

const Home = () => (
    <Fragment>
        <Header>
          <h1 className="jumbotron-heading">Welcome to the NASA project!</h1>
          <p className="lead text-muted">This is a demo project demonstrating the use of:</p>
        </Header>
        <div className="container">
            <ul>
                <li>React + Redux</li>
                <li>React Router</li>
                <li>Persited App state (local storage)</li>
                <li>Promises with axios</li>
                <li>Redux Middlewares</li>
                <li>Pulling data from an external API</li>
                <li>SASS for styling, and it features a responsive, mobile first design</li>
                <li>Testing components</li>
                <li>Git Flow and Feature branches</li>
            </ul>  
        </div>
    </Fragment>
)

export default Home;