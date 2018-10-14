/**
 * External dependencies
 */
import React from 'react';
import { map } from 'lodash';

/**
 * Internal dependencies
 */
import SocialButton from 'components/social-button';

const socialLinks = [
	{
		icon: 'rss',
		title: 'RSS Feed',
		url: 'https://besidesprogramming.com/feed/',
	},
	{
		icon: ['fab', 'slack-hash'],
		title: 'Slack',
		url: 'https://slackin.besidesprogramming.com/',
	},
	{
		icon: ['fab', 'instagram'],
		title: 'Instagram',
		url: 'https://www.instagram.com/ice9js/',
	},
	{
		icon: ['fab', 'twitter'],
		title: 'Twitter',
		url: 'https://twitter.com/ice9js',
	},
	{
		icon: ['fab', 'facebook-f'],
		title: 'Facebook',
		url: 'https://www.facebook.com/besidesprogramming/',
	},
];

const Social = () => (
	<ul className="navigation__social">
		{ map( socialLinks, ( link, index ) => (
			<li key={ index } className="navigation__social-link">
				<SocialButton { ...link } />
			</li>
		) ) }
	</ul>
);

export default Social;
