/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import { thru } from 'lodash';

/**
 * Internal dependencies
 */
import Archive from 'views/archive';
import Category from 'views/category';
import Home from 'views/home';
import MobileNavigation from 'components/navigation/mobile';
import Navigation from 'components/navigation';
import Post from 'views/post';
import Search from 'views/search';
import { getLink, isLocalLink } from './utils';

class App extends PureComponent {

	static propTypes = {
		history: PropTypes.shape( {
			push: PropTypes.func.isRequired,
		} ).isRequired,
	};

	componentDidMount() {
		window && window.addEventListener( 'click', this.handleClick );
	}

	componentWillUnmount() {
		window && window.removeEventListener( 'click', this.handleClick );
	}

	handleClick = ( event ) => {
		const link = getLink( event.target );

		if ( link && isLocalLink( link ) ) {
			event.preventDefault();
			this.props.history.push( thru( new URL( link.href ), ( url ) => url.pathname ) );
		}
	};

	render() {
		return (
			<div className="app">
				<Navigation />
				<MobileNavigation />

				<main className="app__content">
					<Switch>
						<Route path="/" exact component={ Home } />
						<Route path="/:category(thoughts|programming|travel|photos)/:page(\d+)?" exact component={ Category } />
						<Route path="/all/:page(\d+)?" exact component={ Archive } />
						<Route path="/search" exact component={ Search } />
						<Route path="/:slug" component={ Post } />
					</Switch>
				</main>
			</div>
		);
	}
}

export default withRouter( App );
