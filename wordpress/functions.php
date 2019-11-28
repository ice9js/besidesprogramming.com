<?php

/**
 * Custom excerpt ellipsis
 *
 * @param  string $more
 * @return string
 */
add_filter( 'excerpt_more', function ( $more ) {
	return '...';
} );


/**
 * Remove troublesome <p></p> wrappers from around <img /> tags.
 *
 * @param  string $content Post content markup
 * @return string
 */
add_filter( 'the_content', function ( $content ) {
	return preg_replace(
		'/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU',
		'$1$2$3',
		$content
	);
} );

/**
 * Turn regular images into links to the gallery.
 */
add_filter( 'the_content', function ( $content ) {
	$post = get_post();

	return preg_replace_callback(
		'/(<!-- wp:image (\{.*\}) -->(.*))(<a.*>)?(<img.*>(<\/a>)?.*<!-- \/wp:image -->)/isU',
		function ( $matches ) use ( $post ) {
			$data = json_decode( $matches[2], true );

			if ( ! isset( $data[ 'linkDestination' ] ) || $data[ 'linkDestination' ] !== 'attachment' ) {
				return $matches[0];
			}

			return sprintf(
				'%s%s%s',
				$matches[1], // Everything before the opening <a> tag
				sprintf( '<a href="/%s/images/%s">', $post->post_name, $data[ 'id' ] ),
				$matches[5] // Everything after the opening <a> tag
			);
		},
		$content
	);
}, 1 );


/**
 * Add 'next' and 'previous' properties to posts response data
 */
add_filter( 'rest_prepare_post', function ( $response, $post, $request ) {
	if ( $request->get_param( 'per_page' ) === 1 ) {
		global $post;

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
	}

	return $response;
}, 10, 3 );


function andromeda_get_post_images( $post_id ) {
	$media = get_attached_media( 'image', $post_id );

	return array_combine(
		array_map( function ( $attachment ) {
			return $attachment->ID;
		}, $media ),
		$media
	);
}

register_rest_route( 'andromeda/v1', '/posts/(?P<slug>[a-zA-Z0-9-]+)/images', [
	'methods' => [ 'GET' ],
	'callback' => function ( $request ) {
		// Get post by slug
		$posts = get_posts( [
			'name' => $request->get_param( 'slug' ),
			'post_type' => 'post',
			'post_status' => 'publish',
			'numberposts' => 1,
		] );

		if ( empty( $posts ) ) {
			return new WP_Error( 'resource_does_not_exist', __( 'No resource exists under this address.' ), [ 'status' => 404 ] );
		}

		$post = array_shift( $posts );

		preg_match_all( '/<!-- wp:image (.*) -->/', $post->post_content, $matches );
		$content_images = array_map( function ( $match ) {
			return json_decode( $match );
		}, $matches[ 1 ] );

		$gallery = array_filter( $content_images, function ( $image ) {
			return $image &&
				isset( $image->linkDestination ) &&
				$image->linkDestination === 'attachment';
		} );

		$post_images = andromeda_get_post_images( $post->ID );
		return array_map( function ( $gallery_image ) use ( $post_images ) {
			$image = $post_images[ $gallery_image->id ];
			$meta = wp_get_attachment_metadata( $image->ID );

			return [
				'id' => $image->ID,
				'slug' => $image->post_name,
				'title' => $image->post_title,
				'caption' => wp_get_attachment_caption( $image->ID ),
				'width' => $meta[ 'width' ],
				'height' => $meta[ 'height' ],
				'file' => $meta[ 'file' ],
				'meta' => $meta[ 'image_meta' ],
			];
		}, array_values( $gallery ) );
	},
] );
