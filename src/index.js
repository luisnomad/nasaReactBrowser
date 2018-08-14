import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Root from './Root';

import './styles/base.scss';

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root')
);
registerServiceWorker();
