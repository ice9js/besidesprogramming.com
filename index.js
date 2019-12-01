/**
 * Internal dependencies
 */
const app = require( 'boot' )();
const config = require( 'config' ).config;

const host = process.env.HOST || config( 'app.host' );
const port = process.env.PORT || config( 'app.port' );

console.log( 'Server listening on port:' + port );

app.listen( port );
