import React from 'react';
import { Link } from "react-router-dom";
import styles from './Header.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default class Header extends React.Component {
    render() {
        return (
            <div className={ cx('header') }>
                <ul className={ cx('navBar') }>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/search">Search</Link></li>
                </ul>
            </div>
        );
    }
}

