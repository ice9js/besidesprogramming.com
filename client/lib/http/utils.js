/**
 * External dependencies
 */
import { join, map } from 'lodash';

/**
 * Internal dependencies
 */
import { config } from 'config';

/**
 * Converts an object to url query string
 *
 * @param  {Object} params
 * @return {String}
 */
export const queryParams = ( params ) => join( map(
	params,
	( value, key ) => `${ key }=${ encodeURIComponent( value ) }`
), '&' );

/**
 * Converts response headers object to a plain object
 *
 * @param  {Response} response
 * @return {Object}
 */
export const headers = ( response ) => {
	const headers = {};

	for ( let [ key, value ] of response.headers.entries() ) {
		headers[ key ] = value;
	}

	return headers;
};
