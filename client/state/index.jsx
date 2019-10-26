/**
 * External dependencies
 */
import { createStore, applyMiddleware } from 'redux';

/**
 * Internal dependencies
 */
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

export default store;
