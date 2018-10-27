/**
 * External dependencies
 */
import React from 'react';
import { first } from 'lodash';

/**
 * Internal dependencies
 */
import WithPosts from 'components/data/with-posts';
import PostComponent from 'components/post';
import PostPlaceholder from 'components/post-placeholder';
import ErrorView from 'views/error';

const Post = ( { match } ) => {
	const postQuery = {
		_embed: true,
		per_page: 1,
		slug: match.params.slug,
	};

	return (
		<WithPosts query={ postQuery }>
			{ ( { isLoading, posts, status } ) => {
				if ( isLoading ) {
					return <PostPlaceholder />;
				}

				return (
					<React.Fragment>
						{ status !== 200 && <ErrorView status={ status } /> }
						{ status === 200 && posts.length === 0 && <ErrorView status={ 404 } /> }

						{ status === 200 && !! posts.length && <PostComponent post={ first( posts ) } /> }
					</React.Fragment>
				);
			} }
		</WithPosts>
	);
};

export default Post;
