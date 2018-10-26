/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import Icon from 'components/icon';
import ShareButton from 'components/share-button';
import { formatDate } from 'lib/date';
import { facebookShareUrl, pinterestShareUrl, twitterShareUrl } from 'lib/social';

const PostHeader = ( { date, image, link, slug, title } ) => (
	<div className="post-header">
		<h2 className="post-header__title">
			<a className="post-header__link" href={ `/${ slug }` }>{ title }</a>
		</h2>

		<div className="post-header__meta">
			<ShareButton
				compact
				className={ 'facebook' }
				icon={ <Icon icon={ [ 'fab', 'facebook-f' ] } /> }
				label={ 'Share' }
				url={ facebookShareUrl( link ) } />
			<ShareButton
				compact
				className={ 'twitter' }
				icon={ <Icon icon={ [ 'fab', 'twitter' ] } /> }
				label={ 'Tweet' }
				url={ twitterShareUrl( link, title ) } />
			<ShareButton
				compact
				className={ 'pinterest' }
				icon={ <Icon icon={ [ 'fab', 'pinterest' ] } /> }
				label={ 'Pin' }
				url={ pinterestShareUrl( link, title, image ) } />

			<span className="post-header__date">{ formatDate( date ) }</span>
		</div>
	</div>
);

PostHeader.propTypes = {
	date: PropTypes.string.isRequired,
	image: PropTypes.string,
	link: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default PostHeader;
