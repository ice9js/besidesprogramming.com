/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import ErrorCode from 'components/error-code';
import PageMeta from 'components/page-meta';
import { config } from 'config';

const ErrorView = ( { status } ) => {
	const message = status === 404 ? `Page doesn't exist` : 'Something went wrong';

	return (
		<React.Fragment>
			<PageMeta title={ `${ message } - ${ config( 'app.name' ) }` } />
			<ErrorCode code={ status } />
		</React.Fragment>
	);
};

export default ErrorView;
