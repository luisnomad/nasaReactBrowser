import React, { Component, Fragment } from 'react';
import styles from './Meta.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default class Meta extends Component {

    constructor (props) {
        super(props);

        this.state = {
            showMeta: false
        }

        this._toggleText = this._toggleText.bind(this);
    }

    _toggleText(event) {
        event.stopPropagation();
        this.setState(prevState => ({
            showMeta: !prevState.showMeta
        }));
    }

    render() {
        const { data } = this.props;
        const { showMeta } = this.state;
        return (
            data &&
                <Fragment>
                    <button 
                        onClick={this._toggleText}
                        className={ cx('toggle') }>
                        { showMeta ? 'Hide metadata' : 'Show metadata'}
                    </button>
                    { showMeta && 
                        <textarea 
                            readOnly
                            className={ cx('metadata') } 
                            value={JSON.stringify(data, null, 2)} 
                            rows={15} 
                            cols={10} />
                    }
                </Fragment>
                
        );
    }
}

