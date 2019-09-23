/**
 * External dependencies
 */
 import { trim } from 'lodash';

export const renderHTML = ( document ) => trim(
	`
	<!DOCTYPE html>
	${ document }
	`
);
