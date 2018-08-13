import React from 'react';
import { mount } from 'enzyme';
import { Asset } from '../../containers';
import Root from '../../Root';
import toJson from 'enzyme-to-json';
import mockData from '../../mockData/responseMock';

describe('<Asset />', () => {
    const wrapped = mount(
        <Root>
            <Asset 
                match={{params: { asset: 1}, isExact: true, path: "", url: ""}}
                nasa={mockData} />
        </Root>
    );

    it('Should render correctly', () => {
        expect(toJson(wrapped)).toMatchSnapshot();
    });
});