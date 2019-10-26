/**
 * External dependencies
 */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useGesture } from 'react-use-gesture';
import { withRouter } from 'react-router-dom';

/**
 * Internal dependencies
 */
import Icon from 'components/icon';
import { getImageUrl, getSizes, getSrcSet } from './utils';

const ImagePreview = ( { history, image, nextUrl, onClose, previousUrl } ) => {
	const [ showControls, setShowControls ] = useState( true );
	const preview = useRef( null );

	// Disable window scrolling while preview is active
	useEffect( () => {
		if ( ! document ) {
			return;
		}

		document.body.style = 'overflow: hidden;';
		return () => document.body.style = '';
	} );

	// Set up gesture handlers
	const bind = useGesture( {
		onDrag: ( { last, vxvy: [ vx, vy ] } ) => {
			// Swipe down - close preview
			if ( last && Math.abs( vx ) < 0.3 && vy > 0.3 ) {
				return onClose();
			}

			// Swipe left - next image
			if ( nextUrl && last && Math.abs( vy ) < 0.3 && vx < -0.3 ) {
				return history.push( nextUrl );
			}

			// Swipe right - previous image
			if ( previousUrl && last && Math.abs( vy ) < 0.3 && vx > 0.3 ) {
				return history.push( previousUrl );
			}
		},
		onPinch: ( state ) => {

		},
	}, { domTarget: preview } );
	useEffect( bind, [ bind ] );

	const url = `https://besidesprogramming.com/wp-content/uploads/${ image.file }`;
	const classes = classNames( 'image-preview', {
		'with-controls': showControls,
	} );

	return (
		<div ref={ preview } className={ classes }>
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

				{ previousUrl && (
					<a className="image-preview__button image-preview__button-prev" href={ previousUrl }>
						<span className="sr-only">Previous image</span>
						<Icon icon="arrow-left" />
					</a>
				) }
				{ nextUrl && (
					<a className="image-preview__button image-preview__button-next" href={ nextUrl }>
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
	nextUrl: PropTypes.string,
	onClose: PropTypes.func.isRequired,
	previous: PropTypes.string,
};

export default withRouter( ImagePreview );
