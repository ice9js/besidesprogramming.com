/**
 * External dependencies
 */
import { thru } from 'lodash';

/**
 * Returns the parent anchor node of an element or null.
 *
 * @param  {Node} element
 * @return {Node}
 */
export const getLink = ( element ) => element && ( /^a$/i.test( element.nodeName ) ? element : getLink( element.parentNode ) );

/**
 * Returns true if the given element is an anchor pointing at a path local to the app.
 *
 * @param  {Node}    element
 * @return {Boolean}
 */
export const isLocalLink = ( element ) =>
	element.href &&
	! element.target !== '_blank' &&
	window.location.origin === thru( new URL( element.href ), ( url ) => url.origin );
