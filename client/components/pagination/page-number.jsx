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
import { formatPageUrl } from './utils';

const PageNumber = ( { active, className, page, paginationBase } ) => {
	const buttonClass = classNames( 'pagination__page-number', { 'is-active': active }, className );

	return (
		<a className={ buttonClass } href={ formatPageUrl( paginationBase, page ) }>
			<ScreenReaderText>Page</ScreenReaderText>
			{ page }
		</a>
	);
};

PageNumber.propTypes = {
	active: PropTypes.bool,
	page: PropTypes.number.isRequired,
	paginationBase: PropTypes.string.isRequired,
};

export default PageNumber;
