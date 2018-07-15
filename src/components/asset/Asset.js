import React, { Component } from 'react';

class Asset extends Component {
    render () {
        const assetId = parseInt(this.props.match.params.asset, 10) || 0;
        return (
            <div>Asset view page { assetId }</div>
        )
    }
}

export default Asset;
