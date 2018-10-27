/**
 * External dependencies
 */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';

/**
 * Internal dependencies
 */
import App from 'components/app';
import store from 'state';

render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById( 'app' )
);
