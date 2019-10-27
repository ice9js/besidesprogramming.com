/**
 * External dependencies
 */
import { get, map, merge, pick, tap } from 'lodash';

export const parseResponse = ( response ) => tap(
	{},
	( posts ) => {
		posts.items = map( response.data, ( post ) => merge(
			pick( post, [ 'id', 'slug', 'date', 'link', 'modified', 'next', 'previous' ] ),
			{
				title: post.title.rendered,
				// add a default image as well
				image: get( post, [ '_embedded', 'wp:featuremedia', 0, 'source_url' ], null ),
				content: post.content.rendered,
				excerpt: post.excerpt.rendered,
				author: get( post, [ '_embedded', 'author', 0, 'name' ], '' ),
			}
		) );

		posts.total = parseInt( response.headers[ 'x-wp-total' ] );
		posts.totalPages = parseInt( response.headers[ 'x-wp-totalpages' ] );
	}
);
