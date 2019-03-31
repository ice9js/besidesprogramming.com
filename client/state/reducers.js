import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import posts from 'state/posts/reducers';

const rootReducer = combineReducers( {
	posts,
} );

export default rootReducer;
