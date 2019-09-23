/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import PostComponent from 'components/post';
import QueryPosts from 'components/data/query-posts';
import { getPostsError, getPostsLoadingStatus, getPost } from 'state/posts/selectors';
import Gallery from './gallery';

const Post = ( { match, post, ...props } ) => {
	const { slug } = match.params;

	const query = {
		_embed: true,
		per_page: 1,
		slug,
	};

	return (
		<Fragment>
			<QueryPosts query={ query } />

			<PostComponent post={ post } { ...props } />

			<Route
				path={ `${ match.path }/images/:imageId` }
				render={ ( props ) => <Gallery postSlug={ slug } { ...props } /> } />
		</Fragment>
	);
};

export default connect(
	( state, { match } ) => ( {
		error: getPostsError( state ),
		loading: getPostsLoadingStatus( state ),
		post: getPost( state, match.params.slug ),
	} )
)( Post );
