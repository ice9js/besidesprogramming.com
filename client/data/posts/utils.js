/**
 * External dependencies
 */
import { get, map, merge, pick } from 'lodash';

export const fromApi = ( data ) => map( data, ( post ) => merge(
	pick( post, [ 'id', 'slug', 'date', 'link', 'next', 'previous' ] ),
	{
		title: post.title.rendered,
		image: get( post, [ '_embedded', 'wp:featuremedia', 0, 'source_url' ], null ),
		content: post.content.rendered,
		excerpt: post.excerpt.rendered,
	}
) );
