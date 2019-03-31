/**
 * External dependencies
 */
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { map } from 'lodash';
import express from 'express';

/**
 * Internal dependencies
 */
import App from 'components/app';
import Document from 'document';
import { getPendingRequests } from 'lib/http';
import store from 'state';
import { renderHTML } from './utils';

const renderPage = ( url, preloadedState ) => renderToString(
	<Provider store={ store }>
		<Document preloadedState={ preloadedState }>
			<StaticRouter location={ url } context={ {} }>
				<App />
			</StaticRouter>
		</Document>
	</Provider>
);

export default ( req, res, next ) => {
	// First render to trigger any async requests
	renderPage( req.url, {} );

	// Ignore errors and wait until all requests have completed before rendering again and sending a response
	Promise.all( map(
		getPendingRequests(),
		( request ) => request.catch( () => Promise.resolve() )
	) ).then( () => {
		res.send( renderHTML( renderPage( req.url, store.getState() ) ) );
		next();
	} );
};
