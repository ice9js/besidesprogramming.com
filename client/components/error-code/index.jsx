/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const defaultHeader = `Yikes! That didn't work`;

const errors = {
	[ 404 ]: {
		header: 'Oops! This page does not exist.',
	},
	[ 503 ]: {
		header: 'Oh no! \nThe service seems to be offline.',
		message: `Fortunately, it's likely that at least some of this site's content is available to you, even offline.\n` +
			`Feel free to look around and check back here once you're connected again.`,
	}
};

const ErrorCode = ( { code } ) => (
	<div className="error-code">
		<div className="error-code__header">
			{ get( errors, [ code, 'header' ], defaultHeader ) }
		</div>
		{ errors[ code ] && errors[ code ].message && (
			<div className="error-code__message">{ errors[ code ].message }</div>
		) }
		<div className="error-code__code">{ code }</div>
	</div>
);

ErrorCode.propTypes = {
	code: PropTypes.number.isRequired,
}

export default ErrorCode;
