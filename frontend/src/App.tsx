import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.sass';
import Routes from './routes/router';

const App: React.FC = () => (
  <BrowserRouter>
    <ToastContainer />
    <Routes />
  </BrowserRouter>
);

export default App;
