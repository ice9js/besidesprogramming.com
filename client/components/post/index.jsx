/**
 * External dependencies
 */
import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * Internal dependencies
 */
import DisqusThread from 'components/disqus-thread';
import ErrorView from 'views/error';
import PostContent from 'components/post-content';
import PostFooter from 'components/post-footer';
import PostHeader from 'components/post-header';
import PostPlaceholder from 'components/post-placeholder';
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
			<Helmet>
				<title>{ `${ post.title } - ${ config( 'app.name' ) }`  }</title>
			</Helmet>

			<PostHeader { ...post } />
			<PostContent content={ post.content } />
			<PostFooter { ...post } />
			<DisqusThread id={ post.id } title={ post.title } url={ post.link } />
		</React.Fragment>
	);
};

export default Post;
