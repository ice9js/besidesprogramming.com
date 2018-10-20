/**
 * External dependencies
 */
import { join, map } from 'lodash';

export const queryParams = ( params ) => join( map(
	params,
	( value, key ) => `${ key }=${ encodeURIComponent( value ) }`
), '&' );
