/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import Icon from 'components/icon';

const SocialButton = ( { icon, title, url } ) => (
	<a className="social-button" href={ url } rel="noopener" target="_blank">
		<span className="sr-only">{ `${ title } (Opens in a new window)` } </span>
		<Icon icon={ icon } />
	</a>
);

SocialButton.propTypes = {
	icon: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.array,
	] ).isRequired,
	title: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};

export default SocialButton;
