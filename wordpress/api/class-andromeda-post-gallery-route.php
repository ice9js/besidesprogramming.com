<?php

class Andromeda_Post_Gallery_Route extends Andromeda_REST_Controller {

	/**
	 * {@inheritdoc}
	 */
	public function version() : int {
		return 1;
	}

	/**
	 * {@inheritdoc}
	 */
	public function path() : string {
		return '/posts/(?P<id>[\d]+)/gallery';
	}

	/**
	 * {@inheritdoc}
	 */
	public function actions() : array {
		return array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => array( $this, 'get_post_gallery' ),
			'args' => array(
				'id' => array(
					'validate_callback' => 'is_numeric',
				),
			),
		);
	}

	/**
	 * @param  WP_REST_Request           $request
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_post_gallery( WP_REST_Request $request ) {
		$post_id = $request->getParam( 'id' );
		$post = get_post( $post_id );

		if ( ! $post ) {
			return new WP_Error(); // Not found
		}

		$content = apply_filters( 'the_content', $post->post_content );

		$gallery = array();

		// or maybe this is an error ?
		$images = get_posts( array(
			'post_type' => 'attachment',
			'post_mime_type' => 'image',
			'numberposts' => -1,
			'post_status' => null,
			'post_parent' => $post_id,
		) );

		foreach ( $images as $image ) {
			// maybe that's the error
			$index = strpos( $content, wp_get_attachment_url( $image->ID ) );

			if ( $index !== false ) {
				$gallery[ $index ] = $image;
			}
		}

		// something wrong here, doesn't work :(

		if ( empty( $gallery ) ) {
			return new WP_REST_Response( '[]' );
		}

		$data = array_map( function ( $image ) {
			return array(
				'url' => wp_get_attachment_url( $image->ID ),
			);
		}, array_values( $gallery ) );

		return new WP_REST_Response( serialize( $data ) );
	}
}
