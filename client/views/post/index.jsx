/**
 * External dependencies
 */
import React from 'react';
import { first } from 'lodash';

/**
 * Internal dependencies
 */
import DisqusThread from 'components/disqus-thread';
import ErrorCode from 'components/error-code';
import PageMeta from 'components/page-meta';
import PostContent from 'components/post-content';
import PostFooter from 'components/post-footer';
import PostHeader from 'components/post-header';
import PostPlaceholder from 'components/post-placeholder';
import WithPosts from 'components/data/with-posts';

const Post = ( { isLoading, post, status } ) => {
	if ( isLoading ) {
		return <PostPlaceholder />;
	}

	if ( status !== 200 || ! post ) {
		return (
			<div>
				<PageMeta title="Post doesn't exist - Besides Programming" />
				<ErrorCode code={ status !== 200 ? status : 404 } />
			</div>
		);
	}

	return (
		<div>
			<PageMeta title={ `${ post.title } - Besides Programming`  } />
			<PostHeader { ...post } />
			<PostContent content={ post.content } />
			<PostFooter { ...post } />
			<DisqusThread id={ post.id } title={ post.title } url={ post.link } />
		</div>
	);
};

const PostView = ( { match } ) => {
	const postQuery = {
		_embed: true,
		per_page: 1,
		slug: match.params.slug,
	};

	return (
		<WithPosts query={ postQuery }>
			{ ( { isLoading, posts, status } ) => (
				<Post
					isLoading={ isLoading }
					post={ first( posts ) }
					status={ status } />
			) }
		</WithPosts>
	);
};

export default PostView;
