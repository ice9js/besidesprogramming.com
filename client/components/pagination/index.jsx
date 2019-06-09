/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { filter, flatten, map, range } from 'lodash';

/**
 * Internal dependencies
 */
import Icon from 'components/icon';
import Controls from './controls';
import PageNumber from './page-number';
import Placeholder from './placeholder';
import { formatPageUrl } from './utils';

const Pagination = ( { currentPage, pages, paginationBase } ) => {
	const currentRange = range( Math.max( 0, currentPage - 2 ), Math.min( pages, currentPage + 2 ) + 1 );
	const totalRange = filter( flatten( [
		3 < currentPage && 1,
		4 < currentPage && ( currentPage === 5 ? 2 : Infinity ),
		currentRange,
		currentPage < pages - 3 && ( currentPage === pages - 3 ? pages - 1 : Infinity ),
		currentPage < pages - 2 && pages,
	] ) );

	return (
		<div className="pagination">
			<Controls
				disabled={ currentPage === 1 }
				className="pagination__button"
				href={ formatPageUrl( paginationBase, currentPage - 1 ) }
				icon={ <Icon icon="angle-double-left" /> }
				label="Previous page" />

			{ map( totalRange, ( n, index ) => (
				! isFinite( n )
					? <Placeholder key={ index } />
					: <PageNumber key={ index } className="pagination__button" active={ n === currentPage } page={ n } paginationBase={ paginationBase } />
			) ) }

			<Controls
				disabled={ currentPage === pages }
				className="pagination__button"
				href={ formatPageUrl( paginationBase, currentPage + 1 ) }
				icon={ <Icon icon="angle-double-right" /> }
				label="Next page" />
		</div>
	);
};

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	pages: PropTypes.number.isRequired,
	paginationBase: PropTypes.string.isRequired,
};

export default Pagination;
