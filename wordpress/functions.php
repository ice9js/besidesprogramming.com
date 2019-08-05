<?php

require_once __DIR__ . '/bootstrap.php';

/**
 * Enable wide-align for 'Image' Gutenberg blocks
 */
add_action( 'after_setup_theme', function () {
	add_theme_support( 'align-wide' );
} );

/**
 * Append 'previous' and 'next' properties to posts in REST API responses
 */
add_filter( 'rest_prepare_post', function( $response, $post, $request ) {
	global $post;

	if ( $request->get_param( 'per_page' ) !== 1 ) {
		return $response;
	}

	$adjacent_posts = array_filter(
		array(
			'next' => get_adjacent_post( false, '', false ),
			'previous' => get_adjacent_post( false, '', true )
		),
		function ( $value ) {
			return is_a( $value, 'WP_Post' );
		}
	);

	$response->data = array_merge(
		$response->data,
		array_map( function( $post ) {
			return array(
				'id' => $post->ID,
				'slug' => $post->post_name,
				'title' => $post->post_title
			);
		}, $adjacent_posts )
	);

	return $response;
}, 10, 3 );

/**
 * Initialize custom API routes
 */
call_user_func( function() {
	$rest_api_controllers = array(
		new Andromeda_Post_Gallery_Route(),
	);

	foreach( $rest_api_controllers as $controller ) {
		add_action( 'rest_api_init', array( $controller, 'register_routes' ) );
	}
} );
