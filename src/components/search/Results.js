
import React, { Component, Fragment } from "react";
import styles from './Results.scss';
import classNames from 'classnames/bind';

import { ResultsCard } from './';

const cx = classNames.bind(styles);

const NoResults = () => (
    <div className={ cx('no-results') }>
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
                author={item.data[0].center}
                image={item.data[0].media_type === 'image' ? item.links[0].href : ''}
                mediaType={item.data[0].media_type}
            />
        ));
    }

    render() {
        const showResults = this._checkResults();
        return (
            <Fragment>
                { showResults && <div className={ cx('cards-wrap') }>
                    <div className={ cx('cards') }>
                        { this._renderResults() }
                    </div>
                </div> }
                { !showResults && <NoResults /> }
            </Fragment>
        )
    }

}

export default Results;