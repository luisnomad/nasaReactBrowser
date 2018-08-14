import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../components/home';

describe('<Home />', () => {
    it('Should render correctly', () => {
        const wrapped = shallow (<Home />);
        expect(wrapped.find('.jumbotron-heading').length).toEqual(1);
    });
});