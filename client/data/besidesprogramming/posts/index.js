/**
 * Internal dependencies
 */
import { config } from 'config';
import { http } from 'lib/http';
import { REQUEST_POSTS } from 'state/action-types';
import { parseResponse } from './utils';

const apiHost = config( 'api.host' );

export const fetchPosts = ( query, onSuccess, onError ) => http(
	{
		host: apiHost,
		path: '/wp/v2/posts',
		method: 'GET',
		params: query,
	},
	onSuccess,
	onError,
	parseResponse
);
