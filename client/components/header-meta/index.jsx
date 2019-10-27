/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

/**
 * Internal dependencies
 */
import { config } from 'config';

const HeaderMeta = ( { title, url } ) => (
	<Helmet>
		<title>{ `${ title } - ${ config( 'app.name' ) }` }</title>
		<meta name="description" content={ config( 'app.description' ) } />

		<meta property="og:url" content={ url } />
		<meta property="og:title" content={ title } />
		<meta property="og:description" content={ config( 'app.description' ) } />
		<meta property="og:image" content={ config( 'app.openGraphImage' ) } />
	</Helmet>
);

HeaderMeta.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};

export default HeaderMeta;
