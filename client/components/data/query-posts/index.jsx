/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

/**
 * Internal dependencies
 */
import { fetchPosts } from 'data/besidesprogramming/posts';
import { requestPosts, requestPostsError, updatePosts } from 'state/posts/actions';
import { getPostsLoadingStatus, getPostsError, getQuery } from 'state/posts/selectors';

const QueryPosts = ( {
	lastQuery,
	error,
	loading,
	query,
	requestPosts,
	requestPostsError,
	updatePosts
} ) => {
	if ( ! isEqual( query, lastQuery ) && ! loading ) {
		requestPosts( query );
		fetchPosts( query ).then(
			( { items, total, totalPages } ) => updatePosts( items, total, totalPages ),
			( { status } ) => requestPostsError( status ),
		);
	}

	return null;
};

QueryPosts.propTypes = {
	query: PropTypes.object,
};

export default connect(
	( state ) => ( {
		lastQuery: getQuery( state ),
		error: getPostsError( state ),
		loading: getPostsLoadingStatus( state ),
	} ),
	{ requestPosts, requestPostsError, updatePosts }
)( QueryPosts );
