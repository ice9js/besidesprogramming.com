/**
 * External dependencies
 */
import { thru } from 'lodash';

const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

export const formatDate = ( isoDate ) => {
	const date = new Date( isoDate );
	const year = date.getFullYear();
	const currentYear = thru( new Date(), ( currentDate ) => currentDate.getFullYear() );

	const yearSuffix = year !== currentYear ? `, ${ year }` : '';

	return `${ months[ date.getMonth() ] } ${ date.getDate() }${ yearSuffix }`;
};
