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

const postsPerPage = 10;

const query = {
	per_page: postsPerPage,
};

const Home = () => (
	<React.Fragment>
		<PageMeta title={ 'Home - Besides Programming' } />
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
