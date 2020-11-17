import React from 'react';
import ReactDOM from 'react-dom';
import {
  transitions,
  positions,
  Provider as AlertProvider,
  AlertProviderProps,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import App from './App';

const options: AlertProviderProps = {
  position: positions.TOP_RIGHT,
  timeout: 3500,
  offset: '5px',
  transition: transitions.SCALE,
  template: AlertTemplate,
};

ReactDOM.render(
  <AlertProvider {...options}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AlertProvider>,
  document.getElementById('root'),
);
