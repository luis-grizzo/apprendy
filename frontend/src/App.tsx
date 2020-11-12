import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.sass';
import Routes from './routes/router';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;
