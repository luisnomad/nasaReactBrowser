import React from 'react';
import styles from './Meta.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default class Meta extends React.Component {
    render() {
        const { data } = this.props;
        return (
            data &&
                <pre>
                    { JSON.stringify(data, null, 2) }
                </pre>
        );
    }
}

