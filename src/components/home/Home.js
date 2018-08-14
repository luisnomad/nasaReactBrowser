import React, { Fragment } from 'react';
import styles from './Home.scss';
import classNames from 'classnames/bind';
import Header from '../header';

const cx = classNames.bind(styles);

const Home = () => (
    <Fragment>
        <Header>
          <h1 className="jumbotron-heading">Album example</h1>
          <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
          <p>
            <a href="#" className="btn btn-primary my-2">Main call to action</a>
            <a href="#" className="btn btn-secondary my-2">Secondary action</a>
          </p>
        </Header>
        <div className={ cx('home-wrapper') }>
            <h1>Welcome to the NASA project!</h1>
            <p>This is a demo project demonstrating the use of: </p>
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