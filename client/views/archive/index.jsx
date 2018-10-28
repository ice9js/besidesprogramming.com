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

const getArchiveUrl = ( n ) => `/all/${ n }`;

const postsPerPage = 10;

const Archive = ( { match } ) => {
	const page = ( match.params.page && parseInt( match.params.page ) ) || 1;
	const query = {
		per_page: postsPerPage,
		offset: ( page - 1 ) * postsPerPage,
	};

	return (
		<React.Fragment>
			<PageMeta title={ `Archive - Page ${ page } - Besides Programming` } />
			<PageHeader text="Archive" />
			<PostsFeed query={ query }>
				{ ( { isLoading, status, total } ) => {
					const pages = Math.ceil( total / postsPerPage );

					if ( isLoading ) {
						return null;
					}

					if ( pages < page || status !== 200 ) {
						return <ErrorView status={ status !== 200 ? status : 404 } />
					}

					return <Pagination currentPage={ page } pages={ pages } urlFormat={ getArchiveUrl } />;
				} }
			</PostsFeed>
		</React.Fragment>
	);
};

export default Archive;
