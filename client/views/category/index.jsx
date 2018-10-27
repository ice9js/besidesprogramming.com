/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import PageHeader from 'components/page-header';
import PageMeta from 'components/page-meta';
import PostsFeed from 'components/posts-feed';

const query = {
	per_page: 10,
};

const categories = {
	photos: {
		id: 5,
		label: 'Photos',
	},
	programming: {
		id: 3,
		label: 'Programming',
	},
	thoughts: {
		id: 2,
		label: 'Thoughts',
	},
	travel: {
		id: 4,
		label: 'Travel',
	},
};

const Category = ( { match } ) => {
	const category = categories[ match.params.category ];
	const query = {
		categories: category.id,
		per_page: 10,
	};

	return (
		<React.Fragment>
			<PageMeta title={ `${ category.label } - Besides Programming` } />
			<PageHeader text={ category.label } />
			<PostsFeed query={ query } />
		</React.Fragment>
	);
};

export default Category;
