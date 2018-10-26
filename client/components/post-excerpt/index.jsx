/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import Icon from 'components/icon';
import PostContent from 'components/post-content';
import PostHeader from 'components/post-header';

const PostExcerpt = ( { post } ) => (
	<div className="post-excerpt">
		<PostHeader { ...post } />
		<PostContent content={ post.excerpt } />

		<div className="post-excerpt__actions">
			<a className="post-excerpt__read-more" href={ `/${ post.slug }` }>
				{ 'Continue reading' }
				<Icon className="post-excerpt__read-more-icon" icon={ 'angle-double-right' } />
			</a>
		</div>
	</div>
);

PostExcerpt.propTypes = {
	post: PropTypes.shape( {
		excerpt: PropTypes.string.isRequired,
		slug: PropTypes.string.isRequired,
	} ),
};

export default PostExcerpt;