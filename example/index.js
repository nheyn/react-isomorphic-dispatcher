var path = require('path');
var fs = require('fs');
var babel = require('babel-core');
var browserify = require('browserify');

/*------------------------------------------------------------------------------------------------*/
//	--- Transpile source ---
/*------------------------------------------------------------------------------------------------*/
// Run babel on src/
console.log('babel src/ => lib/: START');
var babelPromise = runBabel(path.join(__dirname, 'src'), path.join(__dirname, 'lib'), [
	'app.js', 'client.js', 'server.js', 'stores.js'
]);

// Run browserify on lib/client.js
var browserifyPromise = babelPromise.then(function() {
	console.log('babel src/ => lib/: FINISH');
	console.log('browserify lib/client.js => app.js: START');
	return runBrowerify(path.join(__dirname, 'lib/client.js'), path.join(__dirname, 'app.js'), [
		'express'
	]);
});

/*------------------------------------------------------------------------------------------------*/
//	--- Start server ---
/*------------------------------------------------------------------------------------------------*/
browserifyPromise.then(function() {
	console.log('browserify lib/client.js => app.js: FINISH');

	console.log('starting server');

	// Start server.js
	require('./lib/server.js');
}).catch(function(err) {
	console.error('[Transpile Error]: ', err);
});

/*------------------------------------------------------------------------------------------------*/
//	--- Helper functions ---
/*------------------------------------------------------------------------------------------------*/
function runBabel(srcDir, dstDir, files) {
	var makeDirPromise = new Promise(function(resolve, reject) {
		fs.mkdir(dstDir, function(err) {
			resolve(dstDir);
		});
	});

	return makeDirPromise.then(function() {
		return Promise.all(files.map(function(file) {
			return new Promise(function(resolve, reject) {
				babel.transformFile(path.join(srcDir, file), function(err, results) {
					if(err) {
						reject(err);
						return;
					}

					fs.writeFile(path.join(dstDir, file), results.code, function(err) {
						if(err) reject(err);
						else	resolve(true)
					});
				});
			});
		}));
	});
}

function runBrowerify(src, dst, modulesToIgnore) {
	return new Promise(function(resolve, reject) {
		var b = browserify(src);

		// Skip ignored modules
		if(modulesToIgnore && modulesToIgnore.length > 0) {
			modulesToIgnore.forEach(function(module) {
				b.ignore(module);
			});
		}

		// Set up bundle
		var appBundle = b.bundle();
		appBundle.on('error', function(err) {
			reject(err);
		});
		appBundle.on('end', function() {
			resolve(true);
		});

		// Save file
		appBundle.pipe(
			fs.createWriteStream(dst, { flags : 'w' })
		);
	});
}