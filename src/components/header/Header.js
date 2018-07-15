import React from "react";
import { Link } from "react-router-dom";
import styles from './Header.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <header className={cx('header')}>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/search">Search</Link>
                </li>
            </ul>
        </nav>
    </header>
);

export default Header;
