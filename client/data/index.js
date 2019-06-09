/**
 * External dependencies
 */
import { forEach } from 'lodash';

/**
 * Internal dependencies
 */
import { addHTTPHandler } from 'lib/http/middleware';
import besidesprogramming from './besidesprogramming';

export const registerHTTPHandlers = () =>
	forEach( besidesprogramming, ( handler, actionType ) => addHTTPHandler( actionType, handler ) );
