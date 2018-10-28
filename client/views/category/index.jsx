/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import PageHeader from 'components/page-header';
import PageMeta from 'components/page-meta';
import Pagination from 'components/pagination';
import PostsFeed from 'components/posts-feed';
import ErrorView from 'views/error';

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

const getCategoryUrl = ( category ) => ( n ) => `/${ category }/${ n }`;

const postsPerPage = 10;

const Category = ( { match } ) => {
	const page = ( match.params.page && parseInt( match.params.page ) ) || 1;
	const category = categories[ match.params.category ];
	const query = {
		categories: [ category.id ],
		per_page: postsPerPage,
		offset: ( page - 1 ) * postsPerPage,
	};

	return (
		<React.Fragment>
			<PageMeta title={ `${ category.label } - Page ${ page } - Besides Programming` } />
			<PageHeader text={ category.label } />
			<PostsFeed query={ query }>
				{ ( { isLoading, status, total } ) => {
					const pages = Math.max( Math.ceil( total / postsPerPage ), 1 );
					const urlFormat = getCategoryUrl( match.params.page );

					if ( isLoading ) {
						return null;
					}

					if ( pages < page || status !== 200 ) {
						return <ErrorView status={ status !== 200 ? status : 404 } />
					}

					return <Pagination currentPage={ page } pages={ pages } urlFormat={ urlFormat } />;
				} }
			</PostsFeed>
		</React.Fragment>
	);
};

export default Category;
