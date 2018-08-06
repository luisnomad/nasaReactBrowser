
import React, { Component } from "react";
import styles from './Results.scss';
import classNames from 'classnames/bind';

import { ResultsCard } from './';

const cx = classNames.bind(styles);

const NoResults = () => (
    <div>
        Your query didn't return any results!
    </div>
);

class Results extends Component {

    _checkResults() {
        const { data } = this.props;
        return (
            data && data.collection && data.collection.items.length > 0
        );
    }

    _renderResults() {
        const { data } = this.props;
        return data.collection.items.map((item, key) => (
            <ResultsCard
                key={key}
                index={key}
                title={item.data[0].title}
                description={item.data[0].description}
                image={item.links[0].href}
            />
        ));
    }

    render() {
        const showResults = this._checkResults();
        return (
            <div className={ cx('cards') }>
                { showResults && this._renderResults() }
                { !showResults && <NoResults /> }
            </div>
        )
    }

}

export default Results;