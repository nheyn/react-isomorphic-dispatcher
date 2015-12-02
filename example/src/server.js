/* @flow */
import path from 'path';

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
	if(req.url !== '/') {
		next();
		return;
	}

	const appMarkup = ReactDOM.renderToString(
		<App dispatcher={dispatcher} />
	);
	const pageMarkup = ReactDOM.renderToStaticMarkup(
		<html>
			<head>
				<title>Example - react-isomorphic-dispatcher</title>
			</head>
			<body>
				<div id="react-element" dangerouslySetInnerHTML={{__html: appMarkup}} />
				<script src="/app.js" />
			</body>
		</html>
	);
	res.send(pageMarkup);
});
app.use('/app.js', express.static(path.join(__dirname, '../app.js')));
app.use('/dispatch', (req, res, next) => {
	//TODO, add isomporphic-dispatcher communication
	next(new Error('NYI'));
});
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send(err.message);
});

/*------------------------------------------------------------------------------------------------*/
//	--- Start server ---
/*------------------------------------------------------------------------------------------------*/
app.listen(80);