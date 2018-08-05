'use strict';

import React from 'react';
import Home from '../../components/home';

import renderer from 'react-test-renderer';
import {
  shallow,
} from 'enzyme';

const wrapper = shallow(<Home />);

describe('<Home />', () => {
    it('Should render correctly', () => {
        expect(wrapper);
    });
});