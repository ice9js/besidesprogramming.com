/**
 * External dependencies
 */
import { thru } from 'lodash';

/**
 * Internal dependencies
 */
import { config } from 'config';

/**
 * HTTP handlers registry
 * @type {Object}
 */
const httpHandlers = {};

/**
 * Registers a HTTP handler function for an action
 *
 * @param  {string}  actionType
 * @param  {Function} handler
 */
export const addHTTPHandler = ( actionType, handler ) => {
	if ( httpHandlers[ actionType ] ) {
		config( 'env' ) === 'development' && console.warn( `A HTTP handler for '${ actionType }' already exists. No-op.` );
		return;
	}

	httpHandlers[ actionType ] = handler;
};

/**
 * Wraps store.dispatch to fire any HTTP handlers associated with the action
 *
 * @param  {Object} store
 * @return {Function}
 */
export const dispatchWithHTTP = ( store ) => {
	const rawDispatch = store.dispatch;

	return ( action ) => thru(
		rawDispatch( action ),
		( rawResult ) => {
			return httpHandlers[ action.type ]
				? httpHandlers[ action.type ]( action )
				: rawResult;
		}
	);
};
