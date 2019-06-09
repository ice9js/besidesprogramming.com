/**
 * External dependencies
 */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';

/**
 * Internal dependencies
 */
import App from 'components/app';
import store from 'state';

hydrate(
	<Provider store={ store }>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById( 'app' )
);
