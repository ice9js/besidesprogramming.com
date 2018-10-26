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

const Post = ( { post } ) => (
	<React.Fragment>
		<PageMeta title={ `${ post.title } - Besides Programming`  } />
		<PostHeader { ...post } />
		<PostContent content={ post.content } />
		<PostFooter { ...post } />
		<DisqusThread id={ post.id } title={ post.title } url={ post.link } />
	</React.Fragment>
);

const ErrorView = ( { status } ) => {
	const message = status === 404 ? `Post doesn't exist` : 'Something went wrong';

	return (
		<React.Fragment>
			<PageMeta title={ `${ message } - Besides Programming` } />
			<ErrorCode code={ status } />
		</React.Fragment>
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
			{ ( { isLoading, posts, status } ) => {
				if ( isLoading ) {
					return <PostPlaceholder />;
				}

				return (
					<React.Fragment>
						{ status !== 200 && <ErrorView status={ status } /> }
						{ status === 200 && posts.length === 0 && <ErrorView status={ 404 } /> }

						{ status === 200 && !! posts.length && <Post post={ first( posts ) } /> }
					</React.Fragment>
				);
			} }
		</WithPosts>
	);
};

export default PostView;
