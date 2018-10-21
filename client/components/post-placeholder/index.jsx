/**
 * External dependencies
 */
import React from 'react';
import { times } from 'lodash';

const PostPlaceholder = () => (
	<div className="post-placeholder">
		<div className="post-placeholder__title"></div>
		<div className="post-placeholder__meta">
			{ times( 3, ( n ) => (
				<div key={ n } className="post-placeholder__meta-button"></div>
			) ) }
			<div className="post-placeholder__meta-date"></div>
		</div>
		{ times( 4, ( n ) => (
			<div key={ n } className="post-placeholder__content-line"></div>
		) ) }
	</div>
);

export default PostPlaceholder;
