/**
 * External dependencies
 */
import fetch from 'node-fetch';
import { inRange, map, tap, thru, uniqueId, values } from 'lodash';

/**
 * Internal dependencies
 */
import { headers, queryParams } from './utils';

/**
 * Container for currently pending requests
 *
 * @type {Object}
 */
const pendingRequests = {};

/**
 * Returns all async HTTP requests currently in progress
 *
 * @return {Array}
 */
export const getPendingRequests = () => values( pendingRequests );


/**
 * Handles failed requests
 * 
 * @param  {Response} error
 * @return {Promise}
 */
const handleFailure = ( error ) => Promise.reject( {
	status: ( error && error.status ) || 500,
} );

/**
 * Handles responses of successful requests
 *
 * @param  {Response} rawResponse
 * @return {Promise}
 */
const handleSuccess = ( rawResponse ) =>
	rawResponse.json().then(
		( data ) => Promise.resolve( {
			headers: headers( rawResponse ),
			data,
		} )
	);

/**
 * Sends async HTTP requests
 *
 * @param  {Object} options
 * @param  {Function} onSuccess
 * @param  {Function} onError
 * @param  {Function} fromApi
 */
export const http = ( options, onSuccess, onError, fromApi = null ) => {
	let uri = options.path;

	if ( options.method === 'GET' && options.params ) {
		uri = `${ options.path }?${ queryParams( options.params ) }`;
	}

	// Assign a request id
	const requestId = uniqueId();

	// Set up the request promise and mark as pending
	pendingRequests[ requestId ] = fetch( `${ options.host }${ uri }` )
		.then(
			( rawResponse ) => {
				return inRange( rawResponse.status, 200, 300 )
					? handleSuccess( rawResponse )
					: handleFailure( rawResponse );
			},
			( error ) => handleFailure( error, onError ),
		)
		.then( ( response ) => typeof fromApi === 'function' ? fromApi( response ) : response )
		.then( onSuccess, onError )
		.finally( () => {
			delete pendingRequests[ requestId ];
		} );
};
