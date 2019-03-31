/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';


const PostsFeedPagination = ( { currentPage, paginationBase, pages, totalPosts } ) => {
	if ( totalPosts === 0 ) {
		return null;
	}

	return <Pagination currentPage={ currentPage } pages={ pages } />
};
