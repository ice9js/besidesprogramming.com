/**
 * External dependencies
 */
import { reduce } from 'lodash';

/**
 * Parses a URL query string to return an object
 *
 * @param  {String} queryString Query string
 * @return {Object}             Parsed keys & values
 */
export const parseQuery = ( queryString ) => reduce(
	queryString.replace( /^\?/, '' ).split( '&' ),
	( result, value ) => {
		const pair = value.split( '=' );

		result[ pair[ 0 ] ] = decodeURIComponent( pair[ 1 ] );

		return result;
	},
	{}
);
