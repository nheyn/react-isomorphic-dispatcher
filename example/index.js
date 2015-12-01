var path = require('path');
var fs = require('fs');
var babel = require('babel-core');
var browserify = require('browserify');

/*------------------------------------------------------------------------------------------------*/
//	--- Transpile source ---
/*------------------------------------------------------------------------------------------------*/
// Run babel on src/
var babelPromise = runBabel(path.join(__dirname, 'src'), path.join(__dirname, 'lib'), [
	'app.js', 'client.js', 'server.js', 'stores.js'
]);

// Run browserify on lib/client.js
var browserifyPromise = babelPromise.then(function() {
	return runBrowerify(path.join(__dirname, 'lib/client.js'), path.join(__dirname, 'app.js'), [
		'express'
	]);
});

/*------------------------------------------------------------------------------------------------*/
//	--- Start server ---
/*------------------------------------------------------------------------------------------------*/
browserifyPromise.then(function() {
	require('./lib/server.js');
}).catch(function(err) {
	console.error('[Transpile Error]: ', err);
});

/*------------------------------------------------------------------------------------------------*/
//	--- Helper functions ---
/*------------------------------------------------------------------------------------------------*/
function runBabel(srcDir, dstDir, files) {
	return Promise.all(files.map(function(file) {
		return new Promise(function(resolve, reject) {
			babel.transformFile(path.join(srcDir, file), function(err, results) {
				if(err) {
					reject(err);
					return;
				}

				var writeStream = fs.createWriteStream(path.join(dstDir, file));
				writeStream.on('error', function(err) {
					reject(err)
				});
				writeStream.on('finish', function() {
					resolve(true);
				});

				writeStream.write(results.code);
				writeStream.end();
			});
		});
	}));
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