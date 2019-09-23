/**
 * External dependencies
 */
import { map, zipObject } from 'lodash';

export const parseResponse = ( response ) => ( {
	media: map( response.data, ( { caption, file, height, id, meta, title, width } ) => ( {
		id,
		title,
		caption,
		meta,
		file,
		width,
		height,
	} ) ),
} );
