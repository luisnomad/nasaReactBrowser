import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchNasaPOTD } from '../actions';
import Loader from '../components/loader';

import styles from './PictureOfTheDay.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class PictureOfTheDay extends Component {
  componentDidMount() {
    this.props.fetchNasaPOTD();
  }

  render() {
    const { nasaPictureOfTheDay } = this.props.nasa;

    return (
      <div className={cx('nasa-pic-wrapper', 'text-center')}>
        {!nasaPictureOfTheDay && <Loader />}
        {nasaPictureOfTheDay && (
          <Fragment>
            <h3 className={cx('header')}>
              Astronomy Picture Of the Day: '{nasaPictureOfTheDay.title}'
            </h3>
            <figure className="figure">
              <img
                src={nasaPictureOfTheDay.url}
                className="figure-img img-fluid rounded-0"
                alt={nasaPictureOfTheDay.title}
              />
              <figcaption className="figure-caption">
                {`'${nasaPictureOfTheDay.title}' by ${
                  nasaPictureOfTheDay.copyright
                } - ${nasaPictureOfTheDay.date}`}
              </figcaption>
            </figure>
            <div className="container">
              <p className="text-justify">{nasaPictureOfTheDay.explanation}</p>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

PictureOfTheDay.propTypes = {
  nasa: PropTypes.object
};

const mapDispatchToProps = {
  fetchNasaPOTD
};

const mapStateToProps = state => {
  return {
    nasa: state.nasa
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureOfTheDay);
