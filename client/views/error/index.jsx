/**
 * External dependencies
 */
import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * Internal dependencies
 */
import ErrorCode from 'components/error-code';
import { config } from 'config';

const ErrorView = ( { status } ) => {
	const message = status === 404 ? `Page doesn't exist` : 'Something went wrong';

	return (
		<React.Fragment>
			<Helmet>
				<title>{ `${ message } - ${ config( 'app.name' ) }` }</title>
				<meta name="robots" content="noindex" />
			</Helmet>

			<ErrorCode code={ status } />
		</React.Fragment>
	);
};

export default ErrorView;
