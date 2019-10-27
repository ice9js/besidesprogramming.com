/**
 * External dependencies
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import HeaderMeta from 'components/header-meta';
import PostsFeed from 'components/posts-feed';
import QueryPosts from 'components/data/query-posts';
import { config } from 'config';
import { getAllPosts, getPostsError, getPostsLoadingStatus } from 'state/posts/selectors';

const postsPerPage = config( 'posts.perPage' );

const query = {
	per_page: postsPerPage,
};

const Home = ( props ) => (
	<React.Fragment>
		<HeaderMeta title="Home" url={ config( 'app.host' ) } />

		<QueryPosts query={ query } />
		<PostsFeed { ...props } />
	</React.Fragment>
);

export default connect(
	( state ) => ( {
		error: getPostsError( state ),
		loading: getPostsLoadingStatus( state ),
		posts: getAllPosts( state ),
	} )
)( Home );
