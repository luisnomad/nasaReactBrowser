import React from 'react';
import { shallow } from 'enzyme';
import { Results, ResultsCard, NoResults } from '../../components/search';

import mockData from '../../mockData/responseMock';
import noResultsMock from '../../mockData/noResultsMock';

// NOTE: This cheatsheet is quite useful -> https://devhints.io/enzyme

describe('<Meta />', () => {
    
    it('Should have as many ResultsCard instances as data items in the server response', () => {
        const wrapped = shallow (<Results data={mockData} />);
        const resultsNumber = Object.keys(mockData.collection.items).length;
        expect(wrapped.find('ResultsCard').length).toEqual(resultsNumber);
    });

    it('Should the NoResults component when there are no results', () => {
        const wrapped = shallow (<Results data={noResultsMock} />);
        expect(wrapped.find('ResultsCard').length).toEqual(0);
    });
});