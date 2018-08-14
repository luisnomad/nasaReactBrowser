import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './ResultsCard.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const highlightNASA = text => {
  const parts = text.split(/(\bNASA+\b)/gi);
  for (let i = 1; i < parts.length; i += 2) {
    parts[i] = (
      <span className={cx('NASA')} key={i}>
        {parts[i]}
      </span>
    );
  }
  return <Fragment>{parts}</Fragment>;
};

const TruncatedText = ({ text, length }) => {
  const textArray = text.split(' ');
  const output =
    textArray.length >= length
      ? `${textArray.slice(0, length).join(' ')}...`
      : text;
  return <Fragment>{highlightNASA(output)}</Fragment>;
};

TruncatedText.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
};

const ResultsCard = ({
  title,
  index,
  image,
  description,
  author,
  mediaType
}) => {
  if (!title || !description) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cx(`item-${index + 1}`, mediaType)}>
      <Link to={`/asset/${index}`} className={cx('card')}>
        {mediaType === 'image' && (
          <div
            style={{ backgroundImage: `url(${image})` }}
            className={cx('thumb')}
          />
        )}
        {mediaType === 'video' && (
          <div className={cx('thumb', 'video-thumb')} />
        )}
        <article>
          <h1> {title}</h1>
          <p>
            <TruncatedText text={description} length={20} />
          </p>
          {author && <span>{author} </span>}
        </article>
      </Link>
    </div>
  );
};

ResultsCard.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  image: PropTypes.string,
  description: PropTypes.string, // sometimes the API does not return description, so I've marked as NOT required
  author: PropTypes.string,
  mediaType: PropTypes.string
};

ResultsCard.defaultProps = {
  image: '',
  author: 'NASA',
  mediaType: 'image'
};

export default ResultsCard;
