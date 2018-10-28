/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import PageMeta from 'components/page-meta';
import PostsFeed from 'components/posts-feed';
import { config } from 'config';

const postsPerPage = config( 'posts.perPage' );

const query = {
	per_page: postsPerPage,
};

const Home = () => (
	<React.Fragment>
		<PageMeta title={ `Home - ${ config( 'app.name' ) }` } />
		<PostsFeed query={ query }>
			{ ( { isLoading, total } ) => (
				! isLoading && postsPerPage < total && (
					<Button className="home-view__view-all" href="/all">View All Posts</Button>
				)
			) }
		</PostsFeed>
	</React.Fragment>
);

export default Home;
