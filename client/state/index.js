/**
 * External dependencies
 */
import { createStore, applyMiddleware } from 'redux';

/**
 * Internal dependencies
 */
import rootReducer from './reducer.js';

const store = createStore(
	rootReducer,
);

export default store;
