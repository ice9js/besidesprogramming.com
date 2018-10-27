/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PageNumber = ( { active, className, page, urlFormat } ) => {
	const buttonClass = classNames( 'pagination__page-number', { 'is-active': active }, className );

	return (
		<a className={ buttonClass } href={ urlFormat( page ) }>
			<span className="sr-only">Page</span>
			{ page }
		</a>
	);
};

PageNumber.propTypes = {
	active: PropTypes.bool,
	page: PropTypes.number.isRequired,
	urlFormat: PropTypes.func.isRequired,
};

export default PageNumber;
