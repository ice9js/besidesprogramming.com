/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import PostComponent from 'components/post';
import QueryPosts from 'components/data/query-posts';
import { getPostsError, getPostsLoadingStatus, getPost } from 'state/posts/selectors';

const Post = ( { match, ...props } ) => {
	const postQuery = {
		_embed: true,
		per_page: 1,
		slug: match.params.slug,
	};

	return (
		<React.Fragment>
			<QueryPosts query={ postQuery } />
			<PostComponent { ...props } />
		</React.Fragment>
	);
};

export default connect(
	( state, { match } ) => ( {
		error: getPostsError( state ),
		loading: getPostsLoadingStatus( state ),
		post: getPost( state, match.params.slug ),
	} )
)( Post );
