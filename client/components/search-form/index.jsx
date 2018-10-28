/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/**
 * Internal dependencies
 */
import Icon from 'components/icon';

class SearchForm extends Component {

	static propTypes = {
		query: PropTypes.string,
	};

	state = {
		query: '',
	};

	constructor( props ) {
		super( props );

		this.state.query = props.query || '';
	}

	updateQuery = ( event ) => this.setState( { query: event.target.value } );

	handleSubmit = ( event ) => {
		event.preventDefault();
		this.state.query && this.props.history.push( `/search?q=${ encodeURIComponent( this.state.query ) }` );
	};

	render() {
		return (
			<form className="search-form" autoComplete="off" action="/search" method="get" onSubmit={ this.handleSubmit }>
				<input
					className="search-form__input"
					name="q"
					placeholder="Search..."
					defaultValue={ this.props.query }
					onChange={ this.updateQuery } />
				<button className="search-form__button" type="submit" title="Search">
					<Icon icon="search" />
				</button>
			</form>
		);
	}
}

export default withRouter( SearchForm );
