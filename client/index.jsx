/**
 * External dependencies
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';

/**
 * Internal dependencies
 */
import App from 'components/app';

render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById( 'app' )
);
