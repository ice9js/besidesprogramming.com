/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import Icon from 'components/icon';
import ScreenReaderText from 'components/screen-reader-text';

const SocialButton = ( { icon, title, url } ) => (
	<a className="social-button" href={ url } rel="noopener" target="_blank">
		<ScreenReaderText>{ `${ title } (Opens in a new window)` }</ScreenReaderText>
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
