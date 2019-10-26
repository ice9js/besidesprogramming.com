/**
 * External dependencies
 */
import React from 'react';
import { Helmet } from 'react-helmet';
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

const renderPage = ( url ) => renderToString(
	<Provider store={ store }>
		<StaticRouter location={ url } context={ {} }>
			<App />
		</StaticRouter>
	</Provider>
);

const renderDocument = ( appHTML, head, preloadedState ) => renderToString(
	<Document
		appHTML={ appHTML }
		head={ head }
		preloadedState={ preloadedState } />
);

const waitForPendingRequests = () => {
	if ( getPendingRequests().length === 0 ) {
		return Promise.resolve();
	}

	return Promise.all( map(
		getPendingRequests(),
		( request ) => request.catch( () => Promise.resolve() )
	) ).then( waitForPendingRequests );
};

export default ( req, res, next ) => {
	// First render to trigger any async requests
	renderPage( req.url, {} );

	waitForPendingRequests().then( () => {
		res.send( renderHTML(
			renderDocument(
				{
					__html: renderPage( req.url )
				},
				Helmet.renderStatic(),
				store.getState(),
			)
		) );

		next();
	} );
};
