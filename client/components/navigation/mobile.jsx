/**
 * External dependencies
 */
import React, { Component } from 'react';
import classNames from 'classnames';
import { thru } from 'lodash';

/**
 * Internal dependencies
 */
import Icon from 'components/icon';
import Logo from 'components/logo';
import Links from './links';
import Search from './search';
import Social from './social';

class MobileNavigation extends Component {

	state = {
		currentOffset: 0,
		showHeader: true,
		showMenu: false,
	};

	componentDidMount() {
		window.addEventListener( 'scroll', this.handleScroll );
	}

	componentWillUnmount() {
		window.removeEventListener( 'scroll', this.handleScroll );
	}

	handleScroll = () => this.setState( thru( window.pageYOffset, ( offset ) => ( {
		currentOffset: offset,
		showHeader: offset < Math.max( this.state.currentOffset, 100 )
	} ) ) );

	toggleNavigation = () => this.setState( { showMenu: ! this.state.showMenu } );

	render() {
		const { showHeader, showMenu } = this.state;

		const navClass = classNames( 'navigation', 'is-mobile', { 'is-active': showHeader });
		const menuClass = classNames( 'navigation__menu', { 'is-active': showMenu });
		const toggleClass = classNames( 'navigation__toggle', { 'is-active': showMenu });

		const navIcon = showMenu ? 'times' : 'bars';

		return (
			<div className={ navClass }>
				<a className="navigation__logo" href="/">
					<Logo size={ 30 } />
				</a>
				<button className={ toggleClass } title="Navigation" onClick={ this.toggleNavigation }>
					<Icon icon={ navIcon } />
				</button>

				<div className={ menuClass }>
					<Links onClick={ this.toggleNavigation } />
					<Search onClick={ this.toggleNavigation } />
					<Social />
				</div>
			</div>
		);
	}
}

export default MobileNavigation;
