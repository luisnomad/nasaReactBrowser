import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchData from '../actions/fetchData';
import setCriteria from '../actions/setCriteria';
import { Results } from '../components/search';
import Header from '../components/header';

import styles from './Search.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PaginationLink = ({ text, isDisabled, ...props }) => {
  const classNames = isDisabled ? 'page-item disabled' : 'page-item';
  return (
    <li className={classNames}>
      <a className="page-link" href="#page" {...props}>
        {text}
      </a>
    </li>
  );
};

PaginationLink.propTypes = {
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool
};

PaginationLink.defaultProps = {
  isDisabled: false
};

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchCriteria: '',
      disabled: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { ui } = this.props;

    if (ui && ui.searchCriteria) {
      this.setState({
        searchCriteria: ui.searchCriteria
      });
    }
  }

  handleChange(event) {
    this.setState({ searchCriteria: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ disabled: true });
    const { searchCriteria } = this.state;
    if (searchCriteria !== '') {
      this.props.setCriteria(searchCriteria);
      this.props.fetchData(searchCriteria).then(res => {
        this.setState({ disabled: false });
      });
    }
  }

  handleClickLink(url) {
    this.setState({ disabled: true });
    this.props.fetchData(null, url).then(res => {
      this.setState({ disabled: false });
    });
  }

  _paginationLinks(links, currentPage = '') {
    if (links && links.length) {
      const buttons = links.map((link, index) => {
        return (
          <PaginationLink
            text={link.prompt}
            onClick={() => this.handleClickLink(link.href)}
            key={index}
          />
        );
      });
      const pageUrl = new URL(currentPage);
      return (
        <ul className="pagination justify-content-center">
          {pageUrl &&
            pageUrl.searchParams && (
              <PaginationLink
                text={`Page ${pageUrl.searchParams.get('page') || 1}`}
                isDisabled={true}
              />
            )}
          {buttons}
        </ul>
      );
    }
  }

  render() {
    const { disabled, searchCriteria } = this.state;
    const { nasa } = this.props;

    return (
      <Fragment>
        <Header className={cx('search-box', { disabled })}>
          <div>
            <h1>Search NASA</h1>
            <form className={cx('search-form')}>
              <input
                className={cx('search-text')}
                type="text"
                placeholder="Search in NASA"
                value={searchCriteria}
                onChange={this.handleChange}
              />
              <input
                className={cx('search-button')}
                type="submit"
                onClick={this.handleSubmit}
                disabled={disabled}
              />
            </form>
          </div>
        </Header>
        {nasa.collection &&
          this._paginationLinks(nasa.collection.links, nasa.collection.href)}
        <Results data={nasa} />
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  fetchData, // will be wrapped into a dispatch call
  setCriteria // will be wrapped into a dispatch call
};

const mapStateToProps = state => {
  return {
    nasa: state.nasa,
    ui: state.ui
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
