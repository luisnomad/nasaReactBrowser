import React from 'react';
import { mount } from 'enzyme';
import { PictureOfTheDay } from '../../containers';
import Root from '../../Root';
import toJson from 'enzyme-to-json';
import mockData from '../../mockData/responseMock';

const mockFetchNasaPOTD = () => ({
  nasaPictureOfTheDay: {
    copyright: 'Derek Demeter',
    date: '2018-08-16',
    explanation:
      "The brief flash of a bright Perseid meteor streaks across the upper right in this composited series of exposures made early Sunday morning near the peak of the annual Perseid meteor shower. Set up about two miles from Space Launch Complex 37 at Cape Canaveral Air Force Station, the photographer also captured the four minute long trail of a Delta IV Heavy rocket carrying the Parker Solar Probe into the dark morning sky. Perseid meteors aren't slow. The grains of dust from periodic comet Swift-Tuttle vaporize as they plow through Earth's upper atmosphere at about 60 kilometers per second (133,000 mph). On its way to seven gravity-assist flybys of Venus over its seven year mission, the Parker Solar Probe's closest approach to the Sun will steadily decrease, finally reaching a distance of 6.1 million kilometers (3.8 million miles). That's about 1/8 the distance between Mercury and the Sun, and within the solar corona, the Sun's tenuous outer atmosphere. By then it will be traveling roughly 190 kilometers per second (430,000 mph) with respect to the Sun, a record for fastest spacecraft from planet Earth.",
    hdurl:
      'https://apod.nasa.gov/apod/image/1808/parkerlaunchperseids.apodDemeter.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Parker vs Perseid',
    url:
      'https://apod.nasa.gov/apod/image/1808/parkerlaunchperseids.apodDemeter1024.jpg'
  }
});

describe('<PictureOfTheDay />', () => {
  const wrapped = mount(
    <Root>
      <PictureOfTheDay nasa={mockData} />
    </Root>
  );

  it('Should render correctly', () => {
    expect(toJson(wrapped)).toMatchSnapshot();
  });

  it('Should include a header', () => {
    expect(wrapped.find('.header').length).toEqual(1);
  });

  it('Should include an image and a caption', () => {
    expect(wrapped.find('.figure').length).toEqual(1);
    expect(wrapped.find('.figure-caption').length).toEqual(1);
  });
});
