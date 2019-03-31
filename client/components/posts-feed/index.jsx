/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { map, times } from 'lodash';

/**
 * Internal dependencies
 */
import ErrorCode from 'components/error-code';
import Pagination from 'components/pagination';
import PostExcerpt from 'components/post-excerpt';
import PostPlaceholder from 'components/post-placeholder';
import ErrorView from 'views/error';

const PostsFeed = ( { currentPage, error, loading, paginationBase, posts, total, totalPages } ) => {
	if ( loading ) {
		return times( 3, ( n ) => <PostPlaceholder key={ n } /> );
	}

	if ( error ) {
		return <ErrorView status={ error } />;
	}

	return (
		<React.Fragment>
			{ map( posts, ( post ) => <PostExcerpt key={ post.slug } post={ post } /> ) }

			{ paginationBase && total !== 0 && (
				<Pagination
					currentPage={ currentPage }
					pages={ totalPages }
					paginationBase={ paginationBase } />
			) }
		</React.Fragment>
	);
};

PostsFeed.propTypes = {
	query: PropTypes.object,
};

export default PostsFeed;
