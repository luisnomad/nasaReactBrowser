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

const TruncatedText = ({text, length}) => {
    const output = text.length >= length
        ? `${text.substr(0, length)}...`
        : text;
    return (
        <Fragment>
            { output }
        </Fragment>
    );
}

const ResultsCard = ({ title, index, image, description }) => {
    return (
        <div className={`item-${index}`}>
            <Link to={`/asset/${index}`} className={ cx('card') }>
                <div 
                    style={{ backgroundImage: `url(${image})` }}
                    className={ cx('thumb') }>
                </div>
                <article>
                    <h1> { title }</h1>
                    <p>
                        <TruncatedText 
                            text={description}
                            length={140}
                        />
                    </p>
                </article>
            </Link>
        </div>
    );
};

export default ResultsCard;