import React from 'react';
import styles from './Home.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Home = () => (
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
)

export default Home;