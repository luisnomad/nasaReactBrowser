import React from 'react';
import { shallow } from 'enzyme';
import Meta from '../../components/meta';

import mockData from '../../mockData/metaMock';

let wrapped; 

beforeEach(() => {
    wrapped = shallow (<Meta data={mockData} />);
});

describe('<Meta />', () => {

    it('Should have data hidden', () => {
        expect(wrapped.find('textarea').length).toEqual(0);
    });

    it('Should show the metadata box when the button is clicked', () => {
        wrapped.find('button').simulate('click', { stopPropagation() {} });
        expect(wrapped.find('textarea').length).toEqual(1);
        expect('showMeta' in wrapped.state()).toEqual(true);
    });
});