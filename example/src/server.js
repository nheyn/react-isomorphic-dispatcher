/* @flow */
import express from 'express';

import App from './app';

/*------------------------------------------------------------------------------------------------*/
//	--- Create dispatcher ---
/*------------------------------------------------------------------------------------------------*/
//TODO
const dispatcher = {};

/*------------------------------------------------------------------------------------------------*/
//	--- Create server ---
/*------------------------------------------------------------------------------------------------*/
let app = express();
app.use('/', (req, res, next) => {
	//TODO, add page load
	next(new Error('NYI'));
});
app.use('/app.js', (req, res, next) => {
	//TODO, add app.js load
	next(new Error('NYI'));
});
app.use('/dispatch', (req, res, next) => {
	//TODO, add isomporphic-dispatcher communication
	next(new Error('NYI'));
});
app.use((err, req, res, next) => {
	//TODO, handle error
	console.error('[Error Handling: NYI]: ', err);
});

/*------------------------------------------------------------------------------------------------*/
//	--- Start server ---
/*------------------------------------------------------------------------------------------------*/
app.listen(80);