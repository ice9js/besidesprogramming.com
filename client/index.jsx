/**
 * External dependencies
 */
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

/**
 * Internal dependencies
 */
import store from 'state';

render(
	<Provider store={ store }>
		<div>Hello World</div>
	</Provider>,
	document.getElementById( 'app' )
);
