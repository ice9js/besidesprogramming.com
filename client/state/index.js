/**
 * External dependencies
 */
import { createStore, applyMiddleware } from 'redux';

/**
 * Internal dependencies
 */
import rootReducer from './reducer.js';

console.log( rootReducer );

const store = createStore(
	rootReducer,
);

export default store;
