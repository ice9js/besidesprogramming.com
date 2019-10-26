/**
 * Internal dependencies
 */
import { config } from 'config';
import { http } from 'lib/http';
import { REQUEST_POST_MEDIA } from 'state/action-types';
import { parseResponse } from './utils';

const apiHost = config( 'api.host' );

export const fetchPostImages = ( postSlug ) => http( {
	host: apiHost,
	path: `/andromeda/v1/posts/${ postSlug }/images`,
	method: 'GET',
} ).then( parseResponse );
