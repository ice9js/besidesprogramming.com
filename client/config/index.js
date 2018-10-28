/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import settings from 'app-settings';

export const config = ( key ) => get( settings, key );
