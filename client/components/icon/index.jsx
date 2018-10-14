/**
 * External dependencies
 */
import React from 'react';
import { concat } from 'lodash';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faFacebookF,
	faInstagram,
	faTwitter,
	faSlackHash,
} from '@fortawesome/free-brands-svg-icons';
import {
	faBars,
	faRss,
	faSearch,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';

library.add(
	faBars,
	faFacebookF,
	faInstagram,
	faRss,
	faSearch,
	faTimes,
	faTwitter,
	faSlackHash
);

const Icon = ( props ) => <FontAwesomeIcon { ...props } />;

export default Icon;
