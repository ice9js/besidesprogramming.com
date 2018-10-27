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
import MobileNavigation from 'components/navigation/mobile';
import Navigation from 'components/navigation';
import Category from 'views/category';
import Home from 'views/home';
import Post from 'views/post';
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

				<div className="app__content">
					<Switch>
						<Route path="/" exact component={ Home } />
						<Route path="/:category(thoughts|programming|travel|photos)" exact component={ Category } />
						<Route path="/search" exact component={ Home } />
						<Route path="/archive" exact component={ Home } />
						<Route path="/:slug" component={ Post } />
					</Switch>
				</div>
			</div>
		);
	}
}

export default withRouter( App );
