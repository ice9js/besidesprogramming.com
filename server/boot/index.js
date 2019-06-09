/**
 * External dependencies
 */
const express = require( 'express' );
const path = require( 'path' );

/**
 * Internal dependencies
 */
const pages = require( 'pages' );

function isDevelopment() {
	return process.env.NODE_ENV === 'development';
}

function boot() {
	const app = express();

	app.enable( 'trust proxy' );

	if ( isDevelopment() ) {
		app.use( '/andromeda', express.static( 'public' ) );
		app.use( '/assets', express.static( 'assets' ) );
	}

	return app.use( pages.default );
}

module.exports = boot;
