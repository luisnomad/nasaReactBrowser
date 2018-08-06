import { Link } from "react-router-dom";
import React, { Fragment } from "react";

import styles from './ResultsCard.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const highlightNASA = (text) => {
    const parts = text.split(/(\bNASA+\b)/gi);
    for (let i = 1; i < parts.length; i += 2) {
        parts[i] = <span className={ cx('NASA') } key={i}>{parts[i]}</span>;
    }
    return <Fragment>{ parts }</Fragment>;
};

const ResultsCard = ({ title, index, image, description }) => {
    return (
        <Fragment>
            <li className={ cx('cards__item') }>
                <Link to={`/asset/${index}`}>
                    <div className={ cx('card') }>
                        <div
                            className={ cx('card__image', 'card') }
                            style={{ backgroundImage: `url(${image})` }}
                        />
                        <div className={ cx('card__content') }>
                            <div className={ cx('card__title') }>
                                { title }
                            </div>
                            <p className={ cx('card__text') }>{ highlightNASA(description) }</p>
                        </div>
                    </div>
                </Link>
            </li>
        </Fragment>
    );
};

export default ResultsCard;