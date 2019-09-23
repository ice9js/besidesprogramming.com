/**
 * External dependencies
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import Icon from 'components/icon';
import { getImageUrl, getSizes, getSrcSet } from './utils';

const ImagePreview = ( { image, next, onClose, previous } ) => {
	const url = `https://besidesprogramming.com/wp-content/uploads/${ image.file }`;

	// Disable scrolling while preview is active
	useEffect( () => {
		if ( ! document ) {
			return;
		}

		document.body.style = 'overflow: hidden;';
		return () => document.body.style = '';
	} );

	return (
		<div className="image-preview">
			<figure className="image-preview__frame">
				<img
					className="image-preview__image"
					src={ getImageUrl( image.file, 380 ) }
					srcSet={ getSrcSet( image.file, image.width ) }
					sizes={ getSizes( image.width ) } />

				<figcaption className="image-preview__caption">{ image.title }</figcaption>
			</figure>

			<nav>
				<button className="image-preview__button image-preview__button-close" onClick={ onClose }>
					<span className="sr-only">Close image preview</span>
					<Icon icon="times" />
				</button>

				{ previous && (
					<a className="image-preview__button image-preview__button-prev" href={ previous.id }>
						<span className="sr-only">Previous image</span>
						<Icon icon="arrow-left" />
					</a>
				) }
				{ next && (
					<a className="image-preview__button image-preview__button-next" href={ next.id }>
						<span className="sr-only">Next image</span>
						<Icon icon="arrow-right" />
					</a>
				) }
			</nav>
		</div>
	);
};

ImagePreview.propTypes = {
	image: PropTypes.shape( {
		file: PropTypes.string.isRequired,
	} ),
	next: PropTypes.shape( {
		id: PropTypes.number.isRequired,
	} ),
	onClose: PropTypes.func.isRequired,
	previous: PropTypes.shape( {
		id: PropTypes.number.isRequired,
	} ),
};

export default ImagePreview;
