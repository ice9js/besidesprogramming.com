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
import App from 'blocks/app';
import store from 'state';

render(
	<BrowserRouter>
		<Provider store={ store }>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById( 'app' )
);
