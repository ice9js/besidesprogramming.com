/**
 * External dependencies
 */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { highlightBlock } from 'highlight.js';
import { forEach } from 'lodash';

const PostContent = ( { content } ) => {
	const ref = useRef();

	useEffect( () => {
		if ( typeof window === 'undefined' || ! ref.current ) {
			return;
		}

		forEach( ref.current.querySelectorAll( 'pre code' ), highlightBlock );
	}, [ content ] );

	return (
		<div
			ref={ ref }
			className="post-content"
			dangerouslySetInnerHTML={ { __html: content } }>
		</div>
	);
}

PostContent.propTypes = {
	content: PropTypes.string.isRequired,
}

export default PostContent;
