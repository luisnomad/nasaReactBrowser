import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import fetchData from '../../actions/fetchData';
import setCriteria from '../../actions/setCriteria';

import styles from './Search.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const NoResults = () => (
    <div>
        Your query didn't return any results!
    </div>
);

const highlightNASA = (text) => {
    const parts = text.split(/(\bNASA+\b)/gi);
    for (let i = 1; i < parts.length; i += 2) {
        parts[i] = <span className={ cx('NASA') } key={i}>{parts[i]}</span>;
    }
    return <Fragment>{ parts }</Fragment>;
};

const ResultsCard = ({ ...props, title, index, image, description }) => {
    return (
        <Fragment>
            <li className={ cx('cards__item') }>
                <Link to={`/asset/${index}`}>
                    <div className={ cx('card') }>
                        <div
                            className={ cx('card__image', 'card') }
                            style={{ backgroundImage: `url(${image})` }}
                        />
                        <div className={ cx('card__content') }>
                            <div className={ cx('card__title') }>
                                { title }
                            </div>
                            <p className={ cx('card__text') }>{ highlightNASA(description) }</p>

                        </div>
                    </div>
                </Link>
            </li>
        </Fragment>
    );
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
                console.log (res.payload.data);
            });
        }
    }

    _renderResults() {
        const { nasa } = this.props;
        return nasa.collection.items.map((item, key) => (
            <ResultsCard
                key={key}
                index={key}
                title={item.data[0].title}
                description={item.data[0].description}
                image={item.links[0].href}
            />
        ));
    }

    _checkResults() {
        const { nasa } = this.props;
        return (
            nasa && nasa.collection && nasa.collection.items.length > 0
        );
    }

    render() {
        const { disabled, searchCriteria } = this.state;
        const resultsReturned = this._checkResults();

        return (
            <Fragment>
                <h2>Search page</h2>
                <div className={ cx('search-box', { disabled }) }>
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
                    {resultsReturned && (
                        <ul className={ cx('cards') }>
                            { this._renderResults() }
                        </ul>
                    )}
                    { searchCriteria && !resultsReturned && <NoResults /> }
                </div>
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
