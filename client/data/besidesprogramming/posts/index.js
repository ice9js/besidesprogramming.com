/**
 * Internal dependencies
 */
import { config } from 'config';
import { http } from 'lib/http';
import { REQUEST_POSTS } from 'state/action-types';
import { parseResponse } from './utils';

const apiHost = config( 'api.host' );

const fetchPosts = ( { query } ) => http( {
	host: apiHost,
	path: '/posts',
	method: 'GET',
	params: query,
} ).then( parseResponse );

export default ( {
	[ REQUEST_POSTS ]: fetchPosts
} );
