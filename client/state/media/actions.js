/**
 * Internal dependencies
 */
import { REQUEST_POST_MEDIA, REQUEST_POST_MEDIA_ERROR, UPDATE_POST_MEDIA } from 'state/action-types';

export const requestPostMedia = ( postSlug ) => ( {
	type: REQUEST_POST_MEDIA,
	postSlug,
} );

export const requestPostMediaError = ( postSlug ) => ( {
	type: REQUEST_POST_MEDIA_ERROR,
	postSlug,
} );

export const updatePostMedia = ( postSlug, media ) => ( {
	type: UPDATE_POST_MEDIA,
	postSlug,
	media,
} );
