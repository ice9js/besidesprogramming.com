/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import PageMeta from 'components/page-meta';
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
		<PageMeta title={ `Home - ${ config( 'app.name' ) }` } />

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
