/**
 * External dependencies
 */
import { filter, join, map } from 'lodash';

/**
 * Internal dependencies
 */
import { config } from 'config';

const photonHost = config( 'photon.host' );
const photonSizes = config( 'photon.sizes' );
const uploadsUrl = `${ config( 'assets.host' ) }${ config( 'assets.paths.uploads' ) }`;

/**
 * Strips the protocol from a url
 *
 * @param  {string} url
 * @return {string}
 */
const stripProtocol = ( url ) => url.replace( /^https?:\/\//, '' );

/**
 * Returns a Photon URL for the given file URL
 *
 * @param  {string} url
 * @param  {int}    width
 * @return {string}
 */
const photonize = ( url, width ) => {
	const photonUrl = `${ photonHost }/${ stripProtocol( url ) }?ssl=1`;

	return width ? `${ photonUrl }&w=${ width }` : photonUrl;
};

/**
 * Returns an array of available image sizes based on the original image width
 *
 * @param  {int}   originalWidth
 * @return {Array}
 */
const availableSizes = ( originalWidth ) => filter(
	photonSizes,
	( size ) => size < originalWidth,
);

/**
 * Return the correct img[sizes] property depending on an image's actual width
 *
 * @todo: Actually should be optimized for max-width(< desktop ): 100vw < original Xvw, original
 *
 * @param  {int}    originalWidth
 * @return {string}
 */
export const getSizes = ( originalWidth ) => `(max-width: ${ originalWidth }px) 100vw, ${ originalWidth }px`;

/**
 * Returns a valid url for the given file
 * Specifying width will return a url for an appropriately resized version if Photon is enabled
 *
 * @param  {string} file
 * @param  {int}    width
 * @return {string}
 */
export const getImageUrl = ( file, width ) => {
	const url = `${ uploadsUrl }/${ file }`;

	return config( 'photon.enabled' ) ? photonize( url, width ) : url;
};

/**
 * Returns a complete src-set for the given file
 *
 * @param  {string} file
 * @param  {int}    originalWidth
 * @return {string}
 */
export const getSrcSet = ( file, originalWidth ) => {
	if ( ! config( 'photon.enabled' ) ) {
		return getImageUrl( file );
	}

	const sizes = availableSizes( originalWidth );
	const sizeUrls = map( sizes, ( size ) => `${ getImageUrl( file, size ) } ${ size }w` );
	const defaultUrl = `${ getImageUrl( file, originalWidth ) } ${ originalWidth }w`;

	return join( [ ...sizeUrls, defaultUrl ], ', ' );
};
