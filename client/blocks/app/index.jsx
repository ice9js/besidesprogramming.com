/**
 * External dependencies
 */
import React from 'react';
import { Route, Switch } from 'react-router';

/**
 * Internal dependencies
 */
import MobileNavigation from 'components/navigation/mobile';
import Navigation from 'components/navigation';
import Home from 'views/home';
import Post from 'views/post';

const App = () => (
	<div className="app">
		<Navigation />
		<MobileNavigation />

		<div className="app__content">
			<Switch>
				<Route path="/" exact component={ Home } />
				<Route path="/thoughts" exact component={ Home } />
				<Route path="/programming" exact component={ Home } />
				<Route path="/travel" exact component={ Home } />
				<Route path="/photos" exact component={ Home } />
				<Route path="/search" exact component={ Home } />
				<Route path="/archive" exact component={ Home } />
				<Route path="/" component={ Post } />
			</Switch>
		</div>
	</div>
);

export default App;
