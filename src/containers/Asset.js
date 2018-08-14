import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
      assetContent: null,
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
      // TODO: Move this to a helper function and out of this lifecycle method
      // so it can be tested!
      const nasaId = assets[assetId].data[0].nasa_id;
      const mediaType = assets[assetId].data[0].media_type;
      const URL = `https://images-api.nasa.gov/asset/${nasaId}`;
      axios
        .get(URL)
        .then(res => {
          const { collection } = res.data;
          const parsedData = collection.items
            .map(item => {
              return item.href;
            })
            .reduce((output, item) => {
              if (item.indexOf('metadata.json') > 0) {
                output.meta = item;
              } else {
                const mobileMedia =
                  mediaType === 'image' ? '~medium.' : '~mobile.';

                output.media = output.media || [];
                output.media.push(item);

                if (item.indexOf(mobileMedia) > 0) {
                  output.mobile = item;
                }

                if (item.indexOf('~orig.') > 0) {
                  output.desktop = item;
                }

                if (item.indexOf('.srt') > 0) {
                  output.subtitle = item;
                }

                if (!output.videoPoster && item.indexOf('preview_thumb') > 0) {
                  output.videoPoster = item;
                }
              }
              return output;
            }, {});

          if (parsedData.meta) {
            // TODO: This is not the right place for this
            return axios.get(parsedData.meta).then(metaData => {
              // Group data by type
              const groupMetaData = Object.keys(metaData.data).reduce(
                (output, item) => {
                  const value = metaData.data[item];
                  if (value !== '') {
                    const keys = item.split(':');
                    const currentGroup = keys.length > 1 ? keys[0] : 'Other';
                    const currentKey = keys.length > 1 ? keys[1] : item;
                    output[currentGroup] = output[currentGroup] || {};
                    output[currentGroup][currentKey] = Array.isArray(value)
                      ? value.join(', ')
                      : value;
                  }
                  return output;
                },
                {}
              );
              parsedData.meta = groupMetaData;
              return parsedData;
            });
          }
          return parsedData;
        })
        .then(parsedData => {
          this.setState({ assetContent: parsedData });
        });
    }
  }

  _renderImages(assetData) {
    const { assetContent } = this.state;
    return (
      <p className={cx('image-wrapper', 'mb-3 mb-md-0 mr-md-3 w-60')}>
        {!assetContent && (
          <img
            onClick={this._toggleText}
            className="img-fluid"
            src={assetData.links[0].href}
            alt={assetData.data[0].title}
          />
        )}
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
    const { assetContent, videoLoaded } = this.state;
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
              onLoadedData={this._handleVideoReady}
            >
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
    const { assetContent } = this.state;
    return (
      <div
        className={cx({
          'd-flex flex-column': true,
          ' flex-md-row': media_type === 'image'
        })}
      >
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

const mapStateToProps = state => {
  return {
    nasa: state.nasa
  };
};

export default connect(mapStateToProps)(Asset);
