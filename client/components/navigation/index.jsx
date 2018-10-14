/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Logo from 'components/logo';
import Links from './links';
import Search from './search';
import Social from './social';

const Navigation = () => (
	<div className="navigation">
		<a className="navigation__logo" href="/">
			<Logo size={ 120 } />
		</a>
		<Links />
		<Search />
		<Social />
	</div>
);

export default Navigation;
