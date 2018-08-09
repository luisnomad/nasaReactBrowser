import React from 'react';
import { shallow } from 'enzyme';
import { Results, ResultsCard } from '../../components/search';

import mockData from '../../mockData/responseMock';
import noResultsMock from '../../mockData/noResultsMock';

// NOTE: This cheatsheet is quite useful -> https://devhints.io/enzyme

const getResultsCard = (item) => (
    <ResultsCard
        key={1}
        index={0}
        title={item.data[0].title}
        description={item.data[0].description}
        author={item.data[0].center}
        image={item.data[0].media_type === 'image' ? item.links[0].href : ''}
        mediaType={item.data[0].media_type} />
);

describe('<Results />', () => {
    it('Should have as many ResultsCard instances as data items in the server response', () => {
        const wrapped = shallow (<Results data={mockData} />);
        const resultsNumber = Object.keys(mockData.collection.items).length;
        expect(wrapped.find('ResultsCard').length).toEqual(resultsNumber);
    });

    it('Should the NoResults component when there are no results', () => {
        const wrapped = shallow (<Results data={noResultsMock} />);
        expect(wrapped.find('ResultsCard').length).toEqual(0);
    });

    it('With provided mock data, 1st element should be a video', () => {
        let wrapped; 
        wrapped = shallow (getResultsCard(mockData.collection.items[0]));
        expect(wrapped.hasClass('video')).toBeTruthy();
        wrapped = shallow (getResultsCard(mockData.collection.items[7]));
        expect(wrapped.hasClass('image')).toBeTruthy();
    });
});