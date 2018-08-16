import React from 'react';
import styles from './Loader.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Loader = () => (
  <div className={cx('lds-ripple')}>
    <div />
    <div />
  </div>
);

export default Loader;
