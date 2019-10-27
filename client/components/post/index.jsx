/**
 * External dependencies
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { trimEnd } from 'lodash';

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
				<title>{ `${ post.title }`  }</title>
				<meta name="description" content={ post.excerpt.replace( /(<[^<]*>)/gi, '' ) } />

				<meta property="og:type" content="article" />
				<meta property="og:url" content={ trimEnd( post.link, '/' ) } />
				<meta property="og:title" content={ post.title } />
				<meta property="og:description" content={ post.excerpt.replace( /(<[^<]*>)/gi, '' ) } />
				<meta property="og:image" content={ post.image || config( 'app.openGraphImage' ) } />
				<meta property="article:published_time" content={ post.date } />
				<meta property="article:modified_time" content={ post.modified } />
				<meta property="article:author" content={ post.author } />

				<meta property="twitter:site" content={ config( 'app.twitterHandle' ) } />
				<meta property="twitter:creator" content={ config( 'app.twitterHandle' ) } />
			</Helmet>

			<PostHeader { ...post } />
			<PostContent content={ post.content } />
			<PostFooter { ...post } />
			<DisqusThread id={ post.id } title={ post.title } url={ post.link } />
		</React.Fragment>
	);
};

export default Post;
