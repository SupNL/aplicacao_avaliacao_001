import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import RouteList from './routes';

import './style.css';
import './color-palette.css';
import './resolutions.css';

const App = () => {
  return (
    <Router>
      <RouteList />
    </Router>
  );
}

export default App;
