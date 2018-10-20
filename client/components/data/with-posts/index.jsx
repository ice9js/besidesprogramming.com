/**
 * External dependencies
 */
import React, { Component } from 'react';
import { isEqual } from 'lodash';

/**
 * Internal dependencies
 */
import { fetchPosts } from 'data/posts';

class WithPosts extends Component {

	state = {
		isLoading: false,
		posts: [],
		status: null,
		total: null,
	};

	componentDidMount() {
		this.fetchPosts();
	}

	componentDidUpdate( prevProps ) {
		if ( isEqual( this.props.query, prevProps.query ) ) {
			return;
		}

		this.fetchPosts();
	}

	fetchPosts() {
		this.setState( { isLoading: true } );

		fetchPosts(
			this.props.query,
			( response ) => this.setState( {
				isLoading: false,
				posts: response.data,
				status: response.status,
				total: response.headers.get( 'x-wp-total' ),
			} ),
			( error ) => this.setState( {
				isLoading: false,
				statusCode: 500,
			} ),
		);
	}

	render() {
		return this.props.children( { ...this.state } );
	}
}

export default WithPosts;
