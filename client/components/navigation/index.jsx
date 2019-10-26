/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Logo from 'components/logo';
import ScreenReaderText from 'components/screen-reader-text';
import Links from './links';
import Search from './search';
import Social from './social';

const Navigation = () => (
	<div className="navigation">
		<a className="navigation__logo" href="/">
			<Logo size={ 120 } />
			<ScreenReaderText>Logo (Go to homepage)</ScreenReaderText>
		</a>
		<Links />
		<Search />
		<Social />
	</div>
);

export default Navigation;
