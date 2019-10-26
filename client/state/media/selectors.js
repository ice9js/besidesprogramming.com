/**
 * External dependencies
 */
import { find, findIndex, get } from 'lodash';

export const isPostMediaRequested = ( state, postSlug ) =>
	get( state, [ 'media', 'requested', postSlug ] );

export const isPostMediaLoading = ( state, postSlug ) =>
	get( state, [ 'media', 'loading', postSlug ] );

export const getPostImages = ( state, postSlug ) =>
	get( state, [ 'media', 'items', postSlug ] ) || [];

export const getPostImage = ( state, postSlug, imageId ) => find(
	getPostImages( state, postSlug ),
	( image ) => image.id === imageId,
);

export const getNextPostImage = ( state, postSlug, previousImageId ) => {
	const images = getPostImages( state, postSlug );
	const index = findIndex( images, ( image ) => image.id === previousImageId ) + 1;

	return images[ index ] || null;
};

export const getPreviousPostImage = ( state, postSlug, nextImageId ) => {
	const images = getPostImages( state, postSlug );
	const index = findIndex( images, ( image ) => image.id === nextImageId ) - 1;

	return index >= 0 ? images[ index ] : null;
};
