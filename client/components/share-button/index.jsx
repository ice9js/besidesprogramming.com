/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import ScreenReaderText from 'components/screen-reader-text';

const ShareButton = ( { className, compact, icon, label, url } ) => {
	const buttonClass = classNames( 'share-button', className, { 'is-compact': compact } );

	return (
		<a className={ buttonClass } href={ url } rel="noopener" target="_blank">
			{ icon }
			{ ! compact && (
				<span className="share-button__label">{ label }</span>
			) }
			<ScreenReaderText>{ `${ label } (Opens a new window)` }</ScreenReaderText>
		</a>
	);
}

ShareButton.propTypes = {
	className: PropTypes.string,
	compact: PropTypes.bool,
	icon: PropTypes.element.isRequired,
	label: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};

export default ShareButton;
