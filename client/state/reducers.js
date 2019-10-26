/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import media from 'state/media/reducers';
import posts from 'state/posts/reducers';

const rootReducer = combineReducers( {
	media,
	posts,
} );

export default rootReducer;
