/**
 * External dependencies
 */
import { find, get } from 'lodash';

export const getPostsError = ( state ) =>
	get( state, 'posts.error', null );

export const getPostsLoadingStatus = ( state ) =>
	get( state, 'posts.loading', false );

export const getAllPosts = ( state ) =>
	get( state, 'posts.items', [] );

export const getPost = ( state, slug ) => find(
	getAllPosts( state ),
	( post ) => post.slug === slug,
);

export const getPostsTotal = ( state ) =>
	get( state, 'posts.total', 0 );

export const getPostsTotalPages = ( state ) =>
	get( state, 'posts.totalPages', 0 );

export const getQuery = ( state ) =>
	get( state, 'posts.query', {} );
