import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import fetchData from '../../actions/fetchData';

class Search extends Component {

    componentWillMount () {
        // Test endpoint!
        this.props.fetchData('earth').then((res) => {
            console.log (res.payload.data);
        });
    }

    render() {
        return (
            <div>
                <p>Search page</p>
                <Link to="/asset/1">Testing router, asset 1</Link>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        nasa: state.nasa
    }
};

export default connect(mapStateToProps, { fetchData })(Search);
