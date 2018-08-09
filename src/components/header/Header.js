import React from 'react';
import { Link } from "react-router-dom";
import styles from './Header.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default class Header extends React.Component {
    render() {
        return (
            <div className={ cx('header') }>
                <ul className="nav">
                    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/search">Search</Link></li>
                </ul>
            </div>
        );
    }
}

