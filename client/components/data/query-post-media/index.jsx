/**
 * External dependencies
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { fetchPostImages } from 'data/besidesprogramming/media';
import { requestPostMedia, requestPostMediaError, updatePostMedia } from 'state/media/actions';

const QueryPostMedia = ( {
	postSlug,
	requestPostMedia,
	requestPostMediaError,
	updatePostMedia,
} ) => {
	const [ currentPostSlug, setCurrentPostSlug ] = useState( '' );

	if ( postSlug && postSlug !== currentPostSlug ) {
		requestPostMedia( postSlug );
		fetchPostImages( postSlug ).then(
			( { media } ) => updatePostMedia( postSlug, media ),
			( { status } ) => requestPostMediaError( postSlug ),
		);

		setCurrentPostSlug( postSlug );
	}

	return null;
}

QueryPostMedia.propTypes = {
	postSlug: PropTypes.string.isRequired,
};

export default connect(
	null,
	{ requestPostMedia, requestPostMediaError, updatePostMedia }
)( QueryPostMedia );
