<?php

abstract class Andromeda_REST_Controller extends WP_REST_Controller {

	/**
	 * API vendor namespace
	 */
	const NAMESPACE = 'andromeda';

	/**
	 * Returns the endpoint version
	 *
	 * @return int
	 */
	abstract public function version() : int;

	/**
	 * Returns the endpoint path
	 *
	 * @return string
	 */
	abstract public function path() : string;

	/**
	 * Returns the endpoint url
	 *
	 * @return string
	 */
	public function url() : string {
		return sprintf( '%s/v%d%s', self::NAMESPACE, $this->version(), $this->path() );
	}

	/**
	 * Returns a set of actions supported by the route
	 *
	 * @return array
	 */
	abstract public function actions() : array;

	public function register_routes() {
		register_rest_route( $this->url(), $this->actions() );
	}
}
