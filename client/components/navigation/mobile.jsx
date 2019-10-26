/**
 * External dependencies
 */
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { thru } from 'lodash';

/**
 * Internal dependencies
 */
import Icon from 'components/icon';
import Logo from 'components/logo';
import Links from './links';
import Search from './search';
import Social from './social';

const MobileNavigation = () => {
	const [ showMenu, setShowMenu ] = useState( false );
	const [ headerState, setHeaderState ] = useState( {
		active: true,
		offset: 0,
	} );

	const handleScroll = () => setHeaderState( thru( document.body.scrollTop, ( offset ) => ( {
		active: showMenu || offset < Math.max( headerState.offset, 100 ),
		offset,
	} ) ) );

	useEffect( () => {
		document.body.addEventListener( 'scroll', handleScroll );

		return () => document.body.removeEventListener( 'scroll', handleScroll );
	} );

	const toggleNavigation = () => setShowMenu( ! showMenu );

	const classes = classnames( 'navigation', 'is-mobile', {
		'is-active': headerState.active,
		'is-expanded': showMenu,
	} );

	const navIcon = showMenu ? 'times' : 'bars';

	return (
		<div className={ classes }>
			<a className="navigation__logo" href="/">
				<Logo size={ 30 } />
			</a>
			<button className="navigation__toggle" title="Navigation" onClick={ toggleNavigation }>
				<Icon icon={ navIcon } />
			</button>

			<div className="navigation__menu">
				<Links onClick={ toggleNavigation } />
				<Search onClick={ toggleNavigation } />
				<Social />
			</div>
		</div>
	);
};

export default MobileNavigation;
