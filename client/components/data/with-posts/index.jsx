/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import QueryPosts from 'components/data/query-posts';


const withPosts = ( WrappedComponent ) => {
	return ( { query, ...props } ) => {
		return (
			<React.Fragment>
				<QueryPosts query={ query } />
				<WrappedComponent query={ query } { ...props } />
			</React.Fragment>
		);
	};
};

export default withPosts;
