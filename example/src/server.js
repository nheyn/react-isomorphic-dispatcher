/* @flow */
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';

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
	const appMarkup = 'Example: NYI'; /*ReactDOM.renderToString(
		<App dispatcher={dispatcher} />
	);*/
	const pageMarkup = ReactDOM.renderToStaticMarkup(
		<html>
			<head>
				<title>Example - react-isomorphic-dispatcher</title>
			</head>
			<body>
				<div id="react-element">{appMarkup}</div>
				<script src="/app.js" />
			</body>
		</html>
	);
	res.send(pageMarkup);
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
	console.error(err.stack);
	res.status(500);
});

/*------------------------------------------------------------------------------------------------*/
//	--- Start server ---
/*------------------------------------------------------------------------------------------------*/
app.listen(80);