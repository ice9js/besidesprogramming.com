/**
 * External dependencies
 */
import { join, map } from 'lodash';

/**
 * Internal dependencies
 */
import { config } from 'config';

const apiHost = config( 'api.host' );

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
 * Dispatches an API request
 *
 * @param  {Strign}   path
 * @param  {Object}   params
 * @param  {Function} onSuccess
 * @param  {Function} onError
 * @return {Promise}
 */
export const apiRequest = ( path, params, onSuccess, onError ) =>
	fetch( `${ apiHost }${ path }?${ queryParams( params ) }` )
		.then( response => {
			response.json()
				.then( ( data ) => onSuccess( {
					headers: response.headers,
					status: response.status,
					data,
				} ) );
		} )
		.catch( onError );
