/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { map, noop } from 'lodash';

const links = [
	{
		label: 'Home',
		url: '/',
	},
	{
		label: 'Thoughts',
		url: '/thoughts',
	},
	{
		label: 'Programming',
		url: '/programming',
	},
	{
		label: 'Travel',
		url: '/travel',
	},
	{
		label: 'Photos',
		url: '/photos',
	},
	{
		label: 'About',
		url: '/about',
	},
];

const Links = ( { onClick } ) => (
	<ul className="navigation__links">
		{ map( links, ( link, index ) => (
			<li key={ index } className="navigation__link">
				<a className="navigation__link-anchor" href={ link.url } onClick={ onClick }>
					{ link.label }
				</a>
			</li>
		) ) }
	</ul>
);

Links.propTypes = {
	onClick: PropTypes.func,
};

Links.defaultProps = {
	onClick: noop,
}

export default Links;
