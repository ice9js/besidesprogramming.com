/**
 * External dependencies
 */
import React from 'react';
import { map } from 'lodash';

/**
 * Internal dependencies
 */
import SocialButton from 'components/social-button';
import { config } from 'config';

const socialLinks = config( 'socialLinks' );

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
