/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import Icon from 'components/icon';

const Search = ( { onClick } ) => (
	<a className="navigation__search" href="/search" onClick={ onClick }>
		Search
		<Icon className="navigation__search-icon" icon="search" />
	</a>
);

Search.propTypes = {
	onClick: PropTypes.func,
};

Search.defaultProps = {
	onClick: noop,
}

export default Search;
