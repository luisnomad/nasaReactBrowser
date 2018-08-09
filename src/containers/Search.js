import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import fetchData from '../actions/fetchData';
import setCriteria from '../actions/setCriteria';
import { Results } from '../components/search';

import styles from './Search.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PaginationLink = ({ text }) => (
    <div className={ cx('pagination-link') }>
        { text }
    </div>
)

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
            })
        }
    }

    handleChange(event) {
        this.setState({searchCriteria: event.target.value});
    }

    handleSubmit(event) {
        this.setState({ disabled: true });
        const { searchCriteria } = this.state;
        if (searchCriteria !== '') {
            this.props.setCriteria(searchCriteria);
            this.props.fetchData(searchCriteria).then((res) => {
                this.setState({ disabled: false });
            });
        }
    }

    handleClickLink(url) {
        this.setState({ disabled: true });
        this.props.fetchData(null, url).then((res) => {
            this.setState({ disabled: false });
        });
    }

    _paginationLinks(links, currentPage = '') {
        if (links && links.length) {
            const buttons = links.map((link, index) => {
                return (
                    <li className="page-item" key={index}>
                        <a 
                            className="page-link" 
                            onClick={() => this.handleClickLink(link.href)}
                            href="#">
                            {link.prompt}
                        </a>
                    </li>
                );
            });
            const pageUrl = new URL(currentPage);
            return (
                <ul className="pagination justify-content-center">
                    { pageUrl && pageUrl.searchParams && 
                       <li className="page-item  disabled">
                       <a 
                            className="page-link" 
                            href="#">
                            Page {pageUrl.searchParams.get('page')}
                       </a>
                   </li> 
                    }
                    { buttons }
                </ul>
            );
        }
    }

    render() {
        const { disabled, searchCriteria } = this.state;
        const { nasa } = this.props;
        
        return (
            <Fragment>
                <div className={ cx('search-box', { disabled }) }>
                    <h1>Search NASA</h1>
                    <form className={ cx('search-form') }>
                        <input
                            className={ cx('search-text')}
                            type= "text"
                            placeholder= "Search in NASA"
                            value={searchCriteria}
                            onChange={this.handleChange}
                        />
                        <input
                            className={ cx('search-button')}
                            type="submit"
                            onClick={this.handleSubmit}
                            disabled={disabled} />
                    </form>
                </div>
                { nasa.collection && this._paginationLinks(nasa.collection.links, nasa.collection.href) }
                <Results data={ nasa } />
            </Fragment>
        );
    }
}

const mapDispatchToProps = {
    fetchData, // will be wrapped into a dispatch call
    setCriteria, // will be wrapped into a dispatch call
};

const mapStateToProps = (state) => {
    return {
        nasa: state.nasa,
        ui: state.ui
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
