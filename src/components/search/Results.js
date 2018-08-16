import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './Results.scss';
import classNames from 'classnames/bind';

import { ResultsCard } from './';

const cx = classNames.bind(styles);

export const NoResults = () => (
  <div className={cx('no-results')}>Your query didn't return any results!</div>
);

export const ErrorMessage = props => (
  <div className="alert alert-danger text-center" role="alert">
    {props.message}
  </div>
);

class Results extends Component {
  _checkResults() {
    const { data } = this.props;
    return data && data.collection && data.collection.items.length > 0;
  }

  _checkErrors() {
    const { data } = this.props;
    console.log(data.error);
    return !data || data.error;
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

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !this.props.data ||
      !this.props.data.collection ||
      !nextProps.data ||
      !nextProps.data.collection
    ) {
      return true;
    }
    const currentPage = this.props.data.collection.href;
    const nextPropsPage = nextProps.data.collection.href;

    return currentPage !== nextPropsPage;
  }

  render() {
    const showResults = this._checkResults();
    const showError = this._checkErrors();
    return (
      <Fragment>
        {showResults && (
          <div className={cx('cards-wrap')}>
            <div className={cx('cards')}>{this._renderResults()}</div>
          </div>
        )}
        {showError && <ErrorMessage message={this.props.data.error} />}
        {!showResults && !showError && <NoResults />}
      </Fragment>
    );
  }
}

Results.propTypes = {
  data: PropTypes.object.isRequired
};

export default Results;
