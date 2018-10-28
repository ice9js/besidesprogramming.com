/**
 * External dependencies
 */
import React, { Component } from 'react';
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import PageHeader from 'components/page-header';
import PageMeta from 'components/page-meta';
import Pagination from 'components/pagination';
import PostsFeed from 'components/posts-feed';
import SearchForm from 'components/search-form';
import ErrorView from 'views/error';
import { parseQuery } from 'lib/url';

const getSearchUrl = ( search ) => ( n ) => `/search?q=${ encodeURIComponent( search ) }&p=${ n }`;

const postsPerPage = 10;

const Search = ( { location, match } ) => {
	const values = parseQuery( location.search );
	const search = values.q || '';
	const page = parseInt( values.p ) || 1;

	const title = search ? `Search results for "${ search }" - Page ${ page }` : 'Search';
	const query = {
		per_page: postsPerPage,
		offset: ( page - 1 ) * postsPerPage,
		search,
	};

	return (
		<React.Fragment>
			<PageMeta title={ `${ title } - Besides Programming` } />
			<PageHeader text="Search" />
			<SearchForm query={ search } />
			{ search && (
				<PostsFeed query={ query }>
					{ ( { isLoading, status, total } ) => {
						const pages = Math.ceil( total / postsPerPage );
						const urlFormat = getSearchUrl( search );

						if ( isLoading || total == 0 ) {
							return null;
						}

						if ( status !== 200 ) {
							return <ErrorView status={ status } />
						}

						return <Pagination currentPage={ page } pages={ pages } urlFormat={ urlFormat } />;
					} }
				</PostsFeed>
			) }
		</React.Fragment>
	);
};

export default Search;
