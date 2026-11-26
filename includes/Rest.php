<?php
namespace APB;

if ( ! defined( 'ABSPATH' ) ) {
	exit; }

/**
 * Rest class
 * Serves posts to the block over the REST API.
 *
 * GET /wp-json/apb/v1/posts
 * - Visitors send the query string the block printed (`q`) with its signature (`sig`). No nonce
 *   is involved, so the request works from a cached page.
 * - The editor sends unsaved attributes (`attrs`) and must be logged in as someone who can edit posts.
 *
 * @package APB
 */
class Rest {
	const REST_NAMESPACE = 'apb/v1';
	const ROUTE = '/posts';

	/**
	 * Constructor.
	 * Registers the route.
	 */
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'registerRoutes' ] );
	}

	/**
	 * The full URL of the posts route.
	 *
	 * @return string
	 */
	public static function url() {
		return rest_url( self::REST_NAMESPACE . self::ROUTE );
	}

	/**
	 * Registers the posts route.
	 *
	 * @return void
	 */
	public function registerRoutes() {
		register_rest_route(
			self::REST_NAMESPACE,
			self::ROUTE,
			[
				'methods'				=> \WP_REST_Server::READABLE,
				'callback'				=> [ $this, 'getPosts' ],
				'permission_callback'	=> [ $this, 'canRead' ],
				'args'					=> [
					'q'			=> [ 'type' => 'string' ],
					'sig'		=> [ 'type' => 'string' ],
					'attrs'		=> [ 'type' => 'string' ],
					'page'		=> [
						'type' => 'integer',
						'default' => 1,
						'minimum' => 1,
					],
					'facets'	=> [
						'type' => 'boolean',
						'default' => false,
					],
				],
			]
		);
	}

	/**
	 * A signed query is public. Unsigned attributes are only accepted from editors.
	 *
	 * @param \WP_REST_Request $request Request.
	 * @return bool|\WP_Error
	 */
	public function canRead( $request ) {
		if ( null !== $request->get_param( 'attrs' ) ) {
			return current_user_can( 'edit_posts' ) ? true : new \WP_Error( 'apb_forbidden', __( 'Invalid Request', 'advanced-post-block' ), [ 'status' => rest_authorization_required_code() ] );
		}

		if ( Filter::verify( $request->get_param( 'q' ), $request->get_param( 'sig' ) ) ) {
			return true;
		}

		return new \WP_Error( 'apb_invalid_signature', __( 'Invalid Request', 'advanced-post-block' ), [ 'status' => 403 ] );
	}

	/**
	 * Returns one page of posts, narrowed by the visitor's filter pick.
	 *
	 * @param \WP_REST_Request $request Request.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function getPosts( $request ) {
		$isEditor = null !== $request->get_param( 'attrs' );
		$payload = json_decode( (string) $request->get_param( $isEditor ? 'attrs' : 'q' ), true );

		if ( ! is_array( $payload ) ) {
			return new \WP_Error( 'apb_invalid_query', __( 'Invalid Request', 'advanced-post-block' ), [ 'status' => 400 ] );
		}

		$queryAttr = isset( $payload['query'] ) && is_array( $payload['query'] ) ? $payload['query'] : [];
		$queryAttr = $isEditor ? Functions::sanitize_array( $queryAttr ) : $queryAttr;

		$postType = $queryAttr['postType'] ?? 'post';
		if ( ! is_string( $postType ) || ! is_post_type_viewable( $postType ) ) {
			return new \WP_Error( 'apb_invalid_post_type', __( 'Invalid post type', 'advanced-post-block' ), [ 'status' => 400 ] );
		}

		$filter = Filter::normalize( $payload['filter'] ?? [], $postType );
		$selection = Filter::selection( [ 'tax' => $request->get_param( 'tax' ) ], $filter );

		$pageNumber = max( 1, (int) $request->get_param( 'page' ) );
		$withFacets = $filter['enabled'] && rest_sanitize_boolean( $request->get_param( 'facets' ) );

		// Random order must stay random, so it is never cached.
		$isRandom = 'rand' === ( $queryAttr['postsOrderBy'] ?? '' );
		$cacheKey = Filter::cacheKey( 'posts', [ $queryAttr, $filter, $selection, $pageNumber, $withFacets, get_locale() ] );
		$data = $isRandom ? false : wp_cache_get( $cacheKey, Filter::CACHE_GROUP );

		if ( ! is_array( $data ) ) {
			$data = Posts::queryPosts(
				$queryAttr,
				$pageNumber,
				function ( $args ) use ( $filter, $selection ) {
					return Filter::apply( $args, $filter, $selection );
				}
			);

			if ( $withFacets ) {
				$data['facets'] = Filter::facets( $queryAttr, $filter );
			}

			if ( ! $isRandom ) {
				wp_cache_set( $cacheKey, $data, Filter::CACHE_GROUP, 5 * MINUTE_IN_SECONDS );
			}
		}

		return rest_ensure_response( $data );
	}
}
new Rest();
