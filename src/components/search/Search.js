import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import fetchData from '../../actions/fetchData';
import setCriteria from '../../actions/setCriteria';
import { Results } from './';

import styles from './Search.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

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
