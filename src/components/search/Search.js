import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import fetchData from '../../actions/fetchData';
import setCriteria from '../../actions/setCriteria';

const NoResults = () => (
    <div>
        Your query didn't return any results!
    </div>
);

const ResultsCard = ({ ...props, title, index, image }) => {
    return (
        <div>
            <Link to={`/asset/${index}`}>{ title }</Link>
        </div>
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
            <div>
                <p>Search page</p>
                <input type="text"  value={searchCriteria} onChange={this.handleChange} />
                <input type="submit" onClick={this.handleSubmit} disabled={disabled} />

                { resultsReturned &&  this._renderResults()}
                { searchCriteria && !resultsReturned && <NoResults /> }
            </div>
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
