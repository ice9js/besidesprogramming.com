/**
 * External dependencies
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import PageHeader from 'components/page-header';
import PostsFeed from 'components/posts-feed';
import SearchForm from 'components/search-form';
import QueryPosts from 'components/data/query-posts';
import { config } from 'config';
import { parseQuery } from 'lib/url';
import { getAllPosts, getPostsError, getPostsLoadingStatus, getPostsTotal, getPostsTotalPages } from 'state/posts/selectors';

const postsPerPage = config( 'posts.perPage' );

const searchUrl = ( search ) => `/search?q=${ encodeURIComponent( search ) }&p={{pageNumber}}`;

const Search = ( { location, match, ...props } ) => {
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
			<Helmet>
				<title>{ `${ title } - ${ config( 'app.name' ) }` }</title>
				<meta name="description" content={ config( 'app.description' ) } />
				<meta property="og:image" content={ config( 'app.openGraphImage' ) } />
			</Helmet>

			<PageHeader text="Search" />
			<SearchForm query={ search } />

			{ search && (
				<React.Fragment>
					<QueryPosts query={ query } />
					<PostsFeed
						currentPage={ page }
						paginationBase={ searchUrl( search ) }
						{ ...props } />
				</React.Fragment>
			) }
		</React.Fragment>
	);
};

export default connect(
	( state ) => ( {
		error: getPostsError( state ),
		loading: getPostsLoadingStatus( state ),
		posts: getAllPosts( state ),
		total: getPostsTotal( state ),
		totalPages: getPostsTotalPages( state ),
	} )
)( Search );
