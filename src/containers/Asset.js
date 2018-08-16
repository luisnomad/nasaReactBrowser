import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAsset, clearAsset } from '../actions';
import { Meta } from '../components/meta';
import Header from '../components/header';
import styles from './Asset.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Asset extends Component {
  constructor(props) {
    super(props);

    const assetId = parseInt(props.match.params.asset, 10) || 0;

    this.state = {
      assetId,
      textCollapsed: false,
      videoLoaded: false
    };

    this._handleVideoReady = this._handleVideoReady.bind(this);
  }

  _handleVideoReady() {
    this.setState({
      videoLoaded: true
    });
  }

  componentDidMount() {
    const assets = this.props.nasa.collection.items;
    const { assetId } = this.state;
    if (assets && assets[assetId]) {
      const nasaId = assets[assetId].data[0].nasa_id;
      const mediaType = assets[assetId].data[0].media_type;

      this.props.fetchAsset(nasaId, mediaType);
    }
  }

  componentWillUnmount() {
    this.props.clearAsset();
  }

  _renderImages(assetData) {
    const { assetContent } = this.props.nasa;
    return (
      <p className={cx('image-wrapper', 'mb-3 mb-md-0 mr-md-3 w-60')}>
        {!assetContent && <span>Loading image...</span>}
        {assetContent &&
          assetContent.mobile && (
            <img
              className={cx('img-fluid', 'mobile')}
              src={assetContent.mobile}
              alt={assetData.data[0].title}
            />
          )}
        {assetContent &&
          assetContent.desktop && (
            <img
              className={cx({
                'img-fluid': true,
                desktop: true,
                'no-mobile': !assetContent.mobile
              })}
              src={assetContent.desktop}
              alt={assetData.data[0].title}
            />
          )}
      </p>
    );
  }

  _renderVideo() {
    const { videoLoaded } = this.state;
    const { assetContent } = this.props.nasa;
    return (
      assetContent && (
        <Fragment>
          <div className="embed-responsive embed-responsive-16by9">
            {!videoLoaded && (
              <h3 className={cx('video-preloader')}>Video is loading...</h3>
            )}
            <video
              className={cx({
                'embed-responsive-item': true,
                'video-loading': !videoLoaded
              })}
              poster={assetContent.videoPoster}
              controls
              onLoadedData={this._handleVideoReady}>
              <source
                src={assetContent.desktop}
                media="screen and (min-width:850px)"
              />
              <source
                src={assetContent.mobile}
                media="screen and (max-width:849px)"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          {assetContent.mobile &&
            assetContent.mobile.indexOf('.mp4') > 0 && (
              <small className={cx('mp4-warning')}>
                Note: some phones don't support MP4 video files
              </small>
            )}
        </Fragment>
      )
    );
  }

  _renderAsset(assetData) {
    const { description, media_type } = assetData.data[0];
    const { assetContent } = this.props.nasa;
    return (
      <div
        className={cx({
          'd-flex flex-column': true,
          ' flex-md-row': media_type === 'image'
        })}>
        {media_type === 'video' && this._renderVideo()}
        {media_type === 'image' && this._renderImages(assetData)}
        <div className={cx('description')}>
          <p>
            {description}
            {assetContent && <Meta data={assetContent.meta} />}
          </p>
        </div>
      </div>
    );
  }

  _renderTitle(assetData) {
    const { title } = assetData.data[0];

    return <h3>{title}</h3>;
  }

  render() {
    const { assetId } = this.state;
    if (!this.props.nasa.collection) {
      debugger;
      return (
        <div>
          Looks like you arrived here without making a search first! Go to{' '}
          <Link to="/search">Search</Link>
        </div>
      );
    }

    const assets = this.props.nasa.collection.items;
    const currentAsset = assets[assetId];

    return (
      <Fragment>
        <Header className={cx('header')}>
          {currentAsset && this._renderTitle(currentAsset)}
        </Header>
        <div className="container">
          {!currentAsset && <div> Oops! {assetId} is an invalid asset ID </div>}
          {currentAsset && this._renderAsset(currentAsset)}
        </div>
      </Fragment>
    );
  }
}

Asset.propTypes = {
  nasa: PropTypes.object
};

const mapDispatchToProps = {
  fetchAsset,
  clearAsset
};

const mapStateToProps = state => {
  return {
    nasa: state.nasa
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Asset);
