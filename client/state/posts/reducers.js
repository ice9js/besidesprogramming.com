/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import { REQUEST_POSTS, REQUEST_POSTS_ERROR, UPDATE_POSTS } from 'state/action-types';
import { createReducer } from 'state/utils';

const error = createReducer( null, {
	[ REQUEST_POSTS ]: () => null,
	[ REQUEST_POSTS_ERROR ]: ( state, { errorCode } ) => errorCode || 500,
} );

const items = createReducer( [], {
	[ REQUEST_POSTS ]: () => [],
	[ UPDATE_POSTS ]: ( state, { posts } ) => posts,
} );

const loading = createReducer( false, {
	[ REQUEST_POSTS ]: () => true,
	[ REQUEST_POSTS_ERROR ]: () => false,
	[ UPDATE_POSTS ]: () => false,
} );

const query = createReducer( {}, {
	[ REQUEST_POSTS ]: ( state, { query } ) => query,
} );

const total = createReducer( 0, {
	[ REQUEST_POSTS ]: () => 0,
	[ UPDATE_POSTS ]: ( state, { total } ) => total,
} );

const totalPages = createReducer( 0, {
	[ REQUEST_POSTS ]: () => 0,
	[ UPDATE_POSTS ]: ( state, { totalPages } ) => totalPages,
} );

export default combineReducers( {
	error,
	items,
	loading,
	query,
	total,
	totalPages
} );
