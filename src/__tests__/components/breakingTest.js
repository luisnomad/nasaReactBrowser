import React from 'react';
import { shallow } from 'enzyme';
import App from '../../';
import Header from '../../components/header';

describe('<App />', () => {

    const wrapped = shallow (<App />);

    it('Should render a Header', () => {
        expect(wrapped.find(Header).length).toBeEqual(1);
    });
});