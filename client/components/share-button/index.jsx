/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ShareButton = ( { className, compact, icon, label, url } ) => {
	const buttonClass = classNames( 'share-button', className, { 'is-compact': compact } );

	return (
		<a className={ buttonClass } href={ url } rel="noopener" target="_blank">
			{ icon }
			{ ! compact && (
				<span className="share-button__label">{ label }</span>
			) }
			<span className="sr-only">{ `${ label } (Opens a new window)` }</span>
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
