/**
 * External dependencies
 */
import React from 'react';
import { first } from 'lodash';

/**
 * Internal dependencies
 */
import DisqusThread from 'components/disqus-thread';
import ErrorView from 'views/error';
import PageMeta from 'components/page-meta';
import PostContent from 'components/post-content';
import PostFooter from 'components/post-footer';
import PostHeader from 'components/post-header';
import PostPlaceholder from 'components/post-placeholder';
import withPosts from 'components/data/with-posts';
import { config } from 'config';

const Post = ( { error, loading, post } ) => {
	if ( loading ) {
		return <PostPlaceholder />;
	}

	if ( error ) {
		return <ErrorView status={ error } />
	}

	if ( ! post ) {
		return <ErrorView status={ 404 } />
	}

	return (
		<React.Fragment>
			<PageMeta title={ `${ post.title } - ${ config( 'app.name' ) }`  } />
			<PostHeader { ...post } />
			<PostContent content={ post.content } />
			<PostFooter { ...post } />
			<DisqusThread id={ post.id } title={ post.title } url={ post.link } />
		</React.Fragment>
	);
};

export default Post;
