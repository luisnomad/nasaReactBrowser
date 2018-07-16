import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from "react-router-dom";

import styles from './Asset.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Asset extends Component {

    componentWillMount () {
        console.log(this.props);
    }

    _renderAsset(assetData) {
        const { title, description } = assetData.data[0];
        const src  = assetData.links[0].href;
        return (
            <div>
                <h2>{ title }</h2>
                <img
                    className={ cx('image') }
                    src={src} alt={ title }
                />
                <p>{ description }</p>
            </div>
        )
    }

    render () {
        if (!this.props.nasa.collection) {
            return (<div>
                Looks like you arrived here without making a search first!
                Go to <Link to="/search">Search</Link>
            </div>);
        }

        const assets = this.props.nasa.collection.items;
        const assetId = parseInt(this.props.match.params.asset, 10) || 0;

        return (
            <div>
                Back to <Link to="/search">Search</Link>
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

