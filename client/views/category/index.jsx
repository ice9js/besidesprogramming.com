/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import PageHeader from 'components/page-header';
import PageMeta from 'components/page-meta';
import PostsFeed from 'components/posts-feed';
import QueryPosts from 'components/data/query-posts';
import { config } from 'config';
import { getAllPosts, getPostsError, getPostsLoadingStatus, getPostsTotal, getPostsTotalPages } from 'state/posts/selectors';

const categories = config( 'posts.categories' );
const postsPerPage = config( 'posts.perPage' );

const categoryUrl = ( category ) => `/${ category }/{{pageNumber}}`;

const Category = ( { match, ...props } ) => {
	const page = ( match.params.page && parseInt( match.params.page ) ) || 1;
	const category = categories[ match.params.category ];
	const query = {
		categories: [ category.id ],
		per_page: postsPerPage,
		offset: ( page - 1 ) * postsPerPage,
	};

	return (
		<React.Fragment>
			<PageMeta title={ `${ category.label } - Page ${ page } - ${ config( 'app.name' ) }` } />
			<PageHeader text={ category.label } />

			<QueryPosts query={ query } />
			<PostsFeed
				currentPage={ page }
				paginationBase={ categoryUrl( match.params.category ) }
				{ ...props } />
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
)( Category );
