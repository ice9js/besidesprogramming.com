/**
 * External dependencies
 */
import React, { Component } from 'react';
import { isEqual, pick } from 'lodash';

/**
 * Internal dependencies
 */
import { fetchPosts } from 'data/posts';
import { fromApi } from 'data/posts/utils';

class WithPosts extends Component {

	state = {
		isLoading: false,
		posts: [],
		ready: false,
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
		this.setState( { isLoading: true, ready: true } );

		fetchPosts(
			this.props.query,
			( response ) => this.setState( {
				isLoading: false,
				posts: fromApi( response.data ),
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
		if ( ! this.state.ready ) {
			return null;
		}

		return this.props.children( pick( this.state, [ 'isLoading', 'posts', 'status', 'total' ] ) );
	}
}

export default WithPosts;
