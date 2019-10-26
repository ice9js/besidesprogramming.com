/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import { REQUEST_POST_MEDIA, REQUEST_POST_MEDIA_ERROR, UPDATE_POST_MEDIA } from 'state/action-types';
import { createReducer, keyedReducer } from 'state/utils';

const postMedia = createReducer( null, {
	[ UPDATE_POST_MEDIA ]: ( state, { media } ) => media,
} );

const items = keyedReducer( 'postSlug', postMedia );

const isloading = createReducer( false, {
	[ REQUEST_POST_MEDIA ]: () => true,
	[ REQUEST_POST_MEDIA_ERROR ]: () => false,
	[ UPDATE_POST_MEDIA ]: () => false,
} );

const loading = keyedReducer( 'postSlug', isloading );

const isRequested = createReducer( false, {
	[ REQUEST_POST_MEDIA ]: () => true,
} );

const requested = keyedReducer( 'postSlug', isRequested );

export default combineReducers( {
	items,
	loading,
	requested,
} );
