/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { map, times } from 'lodash';

/**
 * Internal dependencies
 */
import ErrorCode from 'components/error-code';
import PostExcerpt from 'components/post-excerpt';
import PostPlaceholder from 'components/post-placeholder';
import WithPosts from 'components/data/with-posts';

const PostsFeed = ( { children, query } ) => (
	<WithPosts query={ query }>
		{ ( { isLoading, posts, status, total } ) => {
			if ( isLoading ) {
				return times( 3, ( n ) => <PostPlaceholder key={ n } /> );
			}

			return (
				<React.Fragment>
					{ status !== 200 && <ErrorCode code={ status } /> }
					{ status === 200 && map( posts, ( post ) => <PostExcerpt key={ post.slug } post={ post } /> ) }

					{ children && children( { isLoading, posts, status, total } ) }
				</React.Fragment>
			);
		} }
	</WithPosts>
);

PostsFeed.propTypes = {
	query: PropTypes.object,
};

export default PostsFeed;
