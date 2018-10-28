/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import DisqusThread from 'components/disqus-thread';
import PageMeta from 'components/page-meta';
import PostContent from 'components/post-content';
import PostFooter from 'components/post-footer';
import PostHeader from 'components/post-header';
import { config } from 'config';

const Post = ( { post } ) => (
	<React.Fragment>
		<PageMeta title={ `${ post.title } - ${ config( 'app.name' ) }`  } />
		<PostHeader { ...post } />
		<PostContent content={ post.content } />
		<PostFooter { ...post } />
		<DisqusThread id={ post.id } title={ post.title } url={ post.link } />
	</React.Fragment>
);

export default Post;
