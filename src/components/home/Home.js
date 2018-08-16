import React, { Fragment } from 'react';
import Header from '../header';
import SectionHeader from '../sectionHeader';
import { PictureOfTheDay } from '../../containers/';

const Home = () => (
  <Fragment>
    <Header className="bg-dark text-light">
      <h1 className="jumbotron-heading">Welcome to the NASA project!</h1>
      <p className="lead text-muted">A small but fun React/Redux demo</p>
    </Header>
    <PictureOfTheDay />
    <SectionHeader className="bg-dark text-light">
      <h2 className="jumbotron-heading">About this project</h2>
    </SectionHeader>
    <div className="container">
      <p>This is a demo project demonstrating the use of:</p>
      <ul>
        <li>React + Redux</li>
        <li>React Router</li>
        <li>Persited App state (local storage)</li>
        <li>Promises with axios</li>
        <li>Redux Middlewares (redux-thunk, redux-promise, redux-persist)</li>
        <li>Pulling data from an external API</li>
        <li>
          SASS for styling, and it features a responsive, mobile first design.
          No, I don't use CSS in JS. I use IF it's a requirement. Personal
          taste.
        </li>
        <li>Testing components</li>
        <li>Git Flow and Feature branches</li>
        <li>
          Pretty code thanks to{' '}
          <a
            href="https://github.com/prettier/prettier"
            target="_blank"
            alt="prettier"
            rel="noopener noreferrer">
            prettier
          </a>
        </li>
      </ul>
    </div>
  </Fragment>
);

export default Home;
