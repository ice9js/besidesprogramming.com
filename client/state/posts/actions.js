/**
 * Internal dependencies
 */
import { REQUEST_POSTS, REQUEST_POSTS_ERROR, UPDATE_POSTS } from 'state/action-types';

export const requestPosts = ( query ) => ( {
	type: REQUEST_POSTS,
	query,
} );

export const requestPostsError = ( errorCode ) => ( {
	type: REQUEST_POSTS_ERROR,
	errorCode,
} );

export const updatePosts = ( posts, total, totalPages ) => ( {
	type: UPDATE_POSTS,
	posts,
	total,
	totalPages,
} );
