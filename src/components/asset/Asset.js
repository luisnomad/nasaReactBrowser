import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Meta } from './';
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
        }

        this._toggleText = this._toggleText.bind(this);
        this._handleVideoReady = this._handleVideoReady.bind(this);
    }

    _toggleText() {
        if (this._isMobile()) {
            this.setState(prevState => ({
                textCollapsed: !prevState.textCollapsed
            }));
        }
    }

    _isMobile() {
        // toggle is an element that will be hidden with media queries in the Desktop
        // so offsetHeight will return 0 in mobile/tablet
        return this.toggle.offsetHeight > 0;
    }

    _handleVideoReady() {
        this.setState({
            videoLoaded: true
        })
    }

    componentDidMount() {
        const assets = this.props.nasa.collection.items;
        const { assetId } = this.state;
        if (assets && assets[assetId]) {
            const nasaId = assets[assetId].data[0].nasa_id;
            const mediaType = assets[assetId].data[0].media_type;
            const URL = `https://images-api.nasa.gov/asset/${nasaId}`;
            axios.get(URL)
            .then(res => {
                const { collection } = res.data;
                const parsedData = collection.items.map((item) => {
                    return item.href;
                }).reduce((output, item) => {
                    if (item.indexOf('metadata.json') > 0) {
                        output.meta = item;
                    } else {
                        const mobileMedia = mediaType === 'image'
                            ? '~medium.'
                            : '~mobile.';

                        output.media = output.media || [];
                        output.media.push (item);

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
                    return axios.get(parsedData.meta)
                    .then(metaData => {
                        // Group data by type
                        const groupMetaData = Object.keys(metaData.data).reduce(( output, item ) => {
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
                        }, {});
                        parsedData.meta = groupMetaData;
                        return parsedData;
                    });
                } 
                return parsedData;
            })
            .then((parsedData) => {
                this.setState({ assetContent: parsedData });
            });
        }
    }

    _renderImages(assetData) {
        const { assetContent } = this.state;
        return (
            <Fragment>
            {  !assetContent && 
                <img
                    onClick={this._toggleText}
                    className={ cx('figure') }
                    src={assetData.links[0].href} alt={ assetData.data[0].title }
                />
            }
            {  assetContent && assetContent.mobile &&
                <img
                    onClick={this._toggleText}
                    className={ cx('figure', 'mobile') }
                    src={assetContent.mobile }
                    alt={ assetData.data[0].title }
                />
            }
            {  assetContent && assetContent.desktop &&
                <img
                    onClick={this._toggleText}
                    className={ cx({
                        'figure': true,
                        'desktop': true,
                        'no-mobile': !assetContent.mobile
                    }) }
                    src={ assetContent.desktop }
                    alt={ assetData.data[0].title }
                />
            }
            </Fragment>
        );
    }

    _renderVideo() {
        const { assetContent, videoLoaded } = this.state;
        return (
            assetContent && 
                <Fragment>
                    { !videoLoaded && 
                        <h3 className={cx('video-preloader')}>Video is loading...</h3>
                    }
                    <video 
                        className={ cx({
                            'video-player': true,
                            'video-loading': !videoLoaded
                        }) } 
                        poster={assetContent.videoPoster}
                        controls
                        onLoadedData={this._handleVideoReady}>
                        <source src={ assetContent.desktop } media="screen and (min-width:850px)" />
                        <source src={ assetContent.mobile }  media="screen and (max-width:849px)" />
                        Your browser does not support the video tag.
                    </video>
                    { assetContent.mobile && assetContent.mobile.indexOf('.mp4') > 0 &&
                        <small className={ cx('mp4-warning') }>Note: some phones don't support MP4 video files</small>
                    }
                </Fragment>
        );
    }

    _renderAsset(assetData) {
        const { title, description, media_type } = assetData.data[0];
        const { textCollapsed, assetContent } = this.state;
        return (
            <div className={ cx('asset', media_type) }>
                <h2>{ title }</h2>
                { media_type === 'image' && this._renderImages(assetData) }
                { media_type === 'video' && this._renderVideo() }
                <p 
                    className={cx( {hidden: textCollapsed })}
                    onClick={this._toggleText}>
                    <span
                        ref={(toggle) => { this.toggle = toggle; }}>
                        Tap to toggle photo/description
                    </span>
                    { description }
                    { assetContent && <Meta data ={assetContent.meta} />} 
                </p>
            </div>
        )
    }

    render () {
        const { assetId } = this.state;
        if (!this.props.nasa.collection) {
            return (<div>
                Looks like you arrived here without making a search first!
                Go to <Link to="/search">Search</Link>
            </div>);
        }

        const assets = this.props.nasa.collection.items;
        
        return (
            <div className={ cx('wrapper') }>
                { !assets[assetId] && <div> Oops! { assetId } is an invalid asset ID </div> }
                { assets[assetId] && this._renderAsset(assets[assetId]) }
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        nasa: state.nasa
    }
};

export default connect(mapStateToProps)(Asset);

