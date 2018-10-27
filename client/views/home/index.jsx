/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import PageMeta from 'components/page-meta';
import PostsFeed from 'components/posts-feed';

const query = {
	per_page: 10,
};

const Home = () => (
	<React.Fragment>
		<PageMeta title={ 'Home - Besides Programming' } />
		<PostsFeed query={ query } />
	</React.Fragment>
);

export default Home;
