/**
 * External dependencies
 */
import { createStore, applyMiddleware } from 'redux';

/**
 * Internal dependencies
 */
import { registerHTTPHandlers } from 'data';
import { dispatchWithHTTP } from 'lib/http/middleware';
import rootReducer from 'state/reducers';

const config = [
	rootReducer
];

if ( typeof window !== 'undefined' ) {
	const app = document.getElementById( 'app' );

	const preloadedState = app.getAttribute( 'data-preloaded-state' );
	if ( preloadedState ) {
		config.push( JSON.parse( preloadedState ) );
		app.removeAttribute( 'data-preloaded-state' );
	}
}

const store = createStore( ...config );

// Set up data layer
store.dispatch = dispatchWithHTTP( store );
registerHTTPHandlers();

export default store;
