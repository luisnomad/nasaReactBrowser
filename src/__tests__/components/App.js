import React from 'react';
import { shallow } from 'enzyme';
import App from '../../App';
import toJson from 'enzyme-to-json';

describe('<App />', () => {
    const wrapped = shallow (<App />);

    it('Should render correctly', () => {
        expect(toJson(wrapped)).toMatchSnapshot();
    });
});