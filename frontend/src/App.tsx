import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteList from './routes'

const App = () => {
  return (
    <Router>
      <RouteList />
    </Router>
  );
}

export default App;
