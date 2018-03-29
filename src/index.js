// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const el = document.querySelector('#app');
if (el) {
  ReactDOM.render(
    <App />,
    el,
  );
}
