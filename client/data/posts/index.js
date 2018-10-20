/**
 * Internal dependencies
 */
import { queryParams } from 'data/utils';

/**
 * Dispatches a request for posts to the server
 */
export const fetchPosts = (	params, onSuccess, onError ) =>
	fetch( `https://besidesprogramming.com/wp-json/wp/v2/posts?${ queryParams( params ) }` )
		.then( response => {
			response.json()
				.then( ( data ) => onSuccess( {
					headers: response.headers,
					status: response.status,
					data,
				} ) );
		} )
		.catch( onError );
