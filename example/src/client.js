import React from 'react';
import ReactDOM from 'react-dom';
import { createClientDispatcher } from 'express-isomorphic-dispatcher';
import { useDispatcher } from 'react-isomorphic-dispatcher';

import App from './components';
import stores, { encodeState, decodeState } from './stores';

// Enable react dev tools
window.React = React;

window.onload = () => {
  const dispatcher = createClientDispatcher(stores, { encodeState, decodeState });
  const AppWithDispatcher = useDispatcher(App, dispatcher);

  ReactDOM.render(<AppWithDispatcher />, window.document.getElementById('react-app'));
};