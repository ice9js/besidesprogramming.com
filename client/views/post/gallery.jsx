/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import ImagePreview from 'components/image-preview';
import QueryPostMedia from 'components/data/query-post-media';
import {
	getPostImage,
	getNextPostImage,
	getPreviousPostImage,
	isPostMediaLoading,
	isPostMediaRequested
} from 'state/media/selectors';

const Gallery = ( { history, currentImage, loading, nextImage, previousImage, postSlug, requested } ) => {
	if ( requested && ! loading && ! currentImage ) {
		return <Redirect to={ `/${ postSlug }` } />;
	}

	const redirectToPost = () => history.push( `/${ postSlug }` );

	return (
		<React.Fragment>
			<QueryPostMedia postSlug={ postSlug } />

			{ currentImage && (
				<ImagePreview
					image={ currentImage }
					next={ nextImage }
					previous={ previousImage }
					onClose={ redirectToPost } />
			) }
		</React.Fragment>
	);
};

Gallery.propTypes = {
	postSlug: PropTypes.string.isRequired,
};

const connectComponent = connect(
	( state, { match, postSlug } ) => ( {
		currentImage: getPostImage( state, postSlug, parseInt( match.params.imageId ) ),
		loading: isPostMediaLoading( state, postSlug ),
		nextImage: getNextPostImage( state, postSlug, parseInt( match.params.imageId ) ),
		previousImage: getPreviousPostImage( state, postSlug, parseInt( match.params.imageId ) ),
		requested: isPostMediaRequested( state, postSlug ),
	} )
);

export default withRouter( connectComponent( Gallery ) );
