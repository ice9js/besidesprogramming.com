/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

const PostContent = ( { content } ) => (
	<div
		className="post-content"
		dangerouslySetInnerHTML={ { __html: content } }>
	</div>
);

PostContent.propTypes = {
	content: PropTypes.string.isRequired,
}

export default PostContent;
