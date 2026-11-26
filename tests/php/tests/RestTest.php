<?php
/**
 * The posts REST route.
 *
 * @package APB
 */

use APB\Filter;

/**
 * GET /apb/v1/posts answers two callers: visitors, who send back the query the page was
 * signed with (`q` + `sig`), and the editor, which sends raw attributes (`attrs`) and must
 * be able to edit posts.
 */
class RestTest extends WP_Test_REST_TestCase {

	const ROUTE = '/apb/v1/posts';

	/**
	 * REST server.
	 *
	 * @var WP_REST_Server
	 */
	private $server;

	/**
	 * Five published posts and a fresh REST server.
	 */
	public function set_up() {
		parent::set_up();

		self::factory()->post->create_many( 5, [ 'post_status' => 'publish' ] );

		global $wp_rest_server;
		$wp_rest_server = new WP_REST_Server();
		$this->server   = $wp_rest_server;
		do_action( 'rest_api_init' );
	}

	/**
	 * Drops the server and the posts cache between tests.
	 */
	public function tear_down() {
		global $wp_rest_server;
		$wp_rest_server = null;
		wp_cache_flush();

		parent::tear_down();
	}

	/**
	 * Sends a GET request to the route.
	 *
	 * @param array $params Query parameters.
	 * @return WP_REST_Response
	 */
	private function get( $params ) {
		$request = new WP_REST_Request( 'GET', self::ROUTE );
		$request->set_query_params( $params );

		return $this->server->dispatch( $request );
	}

	/**
	 * The query a block prints, as JSON.
	 *
	 * @param array $query Query attributes.
	 * @return string
	 */
	private function payload( $query = [] ) {
		return wp_json_encode(
			[
				'query'  => array_merge(
					[
						'postType'     => 'post',
						'postsPerPage' => 2,
					],
					$query
				),
				'filter' => [],
			]
		);
	}

	/**
	 * The route exists.
	 */
	public function test_route_is_registered() {
		$this->assertArrayHasKey( self::ROUTE, $this->server->get_routes() );
	}

	/**
	 * A visitor's signed query is answered, one page at a time.
	 */
	public function test_signed_query() {
		$q = $this->payload();

		$response = $this->get(
			[
				'q'    => $q,
				'sig'  => Filter::sign( $q ),
				'page' => 2,
			]
		);

		$this->assertSame( 200, $response->get_status() );
		$data = $response->get_data();
		$this->assertSame( 5, $data['totalPosts'] );
		$this->assertCount( 2, $data['posts'] );
	}

	/**
	 * A changed query, or none, is refused.
	 */
	public function test_unsigned_or_tampered_query_is_refused() {
		$q = $this->payload();

		$this->assertErrorResponse( 'apb_invalid_signature', $this->get( [ 'q' => $q ] ), 403 );
		$this->assertErrorResponse(
			'apb_invalid_signature',
			$this->get(
				[
					'q'   => $this->payload( [ 'postsPerPage' => 99 ] ),
					'sig' => Filter::sign( $q ),
				]
			),
			403
		);
		$this->assertErrorResponse( 'apb_invalid_signature', $this->get( [] ), 403 );
	}

	/**
	 * Raw attributes need a user who can edit posts.
	 */
	public function test_editor_attributes_need_edit_posts() {
		$attrs = $this->payload();

		$this->assertErrorResponse( 'apb_forbidden', $this->get( [ 'attrs' => $attrs ] ), 401 );

		wp_set_current_user( self::factory()->user->create( [ 'role' => 'subscriber' ] ) );
		$this->assertErrorResponse( 'apb_forbidden', $this->get( [ 'attrs' => $attrs ] ), 403 );

		wp_set_current_user( self::factory()->user->create( [ 'role' => 'contributor' ] ) );
		$response = $this->get( [ 'attrs' => $attrs ] );
		$this->assertSame( 200, $response->get_status() );
		$this->assertSame( 5, $response->get_data()['totalPosts'] );
	}

	/**
	 * Booleans from the editor's JSON keep their meaning.
	 */
	public function test_editor_booleans() {
		wp_set_current_user( self::factory()->user->create( [ 'role' => 'editor' ] ) );

		$response = $this->get( [ 'attrs' => $this->payload( [ 'isPostsPerPageAll' => true ] ) ] );
		$this->assertCount( 5, $response->get_data()['posts'], 'true means every post' );

		$response = $this->get( [ 'attrs' => $this->payload( [ 'isPostsPerPageAll' => false ] ) ] );
		$this->assertCount( 2, $response->get_data()['posts'], 'false keeps the page size' );
	}

	/**
	 * Broken JSON and post types visitors cannot see are rejected.
	 */
	public function test_invalid_payloads() {
		$broken = '{not json';
		$this->assertErrorResponse(
			'apb_invalid_query',
			$this->get(
				[
					'q'   => $broken,
					'sig' => Filter::sign( $broken ),
				]
			),
			400
		);

		register_post_type( 'apb_private_type', [ 'public' => false ] );
		$q = $this->payload( [ 'postType' => 'apb_private_type' ] );
		$this->assertErrorResponse(
			'apb_invalid_post_type',
			$this->get(
				[
					'q'   => $q,
					'sig' => Filter::sign( $q ),
				]
			),
			400
		);
		unregister_post_type( 'apb_private_type' );
	}
}
