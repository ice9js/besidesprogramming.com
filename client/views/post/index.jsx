/**
 * External dependencies
 */
import React from 'react';
import { first } from 'lodash';

/**
 * Internal dependencies
 */
import WithPosts from 'components/data/with-posts';

const Post = ( { isLoading, post, status } ) => {
	if ( isLoading ) {
		return ( <div>{ `Loading` }</div> );
	}

	if ( status !== 200 || ! post ) {
		return ( <div>{ `Error ${ status !== 200 ? status : 404 }` }</div> );
	}

	return (
		<div>{ `Post: ${ post.title.rendered }` }</div>
	);
};

const PostView = ( { match } ) => {
	const postQuery = {
		_embed: true,
		per_page: 1,
		slug: match.params.slug,
	};

	return (
		<WithPosts query={ postQuery }>
			{ ( { isLoading, posts, status } ) => (
				<Post
					isLoading={ isLoading }
					post={ first( posts ) }
					status={ status } />
			) }
		</WithPosts>
	);
};

export default PostView;
