/**
 * Internal dependencies
 */
import { apiRequest } from 'data/utils';

/**
 * Dispatches a request for posts to the server
 */
export const fetchPosts = ( params, onSuccess, onError ) => apiRequest( '/posts', params, onSuccess, onError );
