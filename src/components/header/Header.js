import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../sectionHeader';
import styles from './Header.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Header = ({ children, className = '' }) => (
  <Fragment>
    <div className={cx('header')}>
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/search">
            Search
          </Link>
        </li>
      </ul>
    </div>
    {children && (
      <SectionHeader className={className}>{children}</SectionHeader>
    )}
  </Fragment>
);

export default Header;
