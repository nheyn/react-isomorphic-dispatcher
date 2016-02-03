/* @flow */
import 'babel-polyfill';

import React from 'react';
import RectDOM from 'react-dom';
import { createClientDispatcher } from 'isomorphic-dispatcher';

import { storeA, storeB, storeC } from './stores';
import App from './app';

/*--------------------------------------------------------------------------------------------------------------------*/
//	--- Create dispatcher ---
/*--------------------------------------------------------------------------------------------------------------------*/
//TODO
const dispatcher = createClientDispatcher({ storeA, storeB, storeC }, () => { throw new Error(); });

/*--------------------------------------------------------------------------------------------------------------------*/
//	--- Render on client ---
/*--------------------------------------------------------------------------------------------------------------------*/
RectDOM.render(
	<App dispatcher={dispatcher} />,
	window.document.getElementById('react-element')
);