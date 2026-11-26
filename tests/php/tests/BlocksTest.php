<?php
/**
 * Block registration and the server-rendered wrapper.
 *
 * @package APB
 */

/**
 * The posts are drawn by React; the server prints the wrapper, the signed request and the
 * attributes the script reads. That output is what gets escaped, so it is pinned here.
 */
class BlocksTest extends WP_UnitTestCase {

	/**
	 * Renders one posts block and returns its HTML.
	 *
	 * @param array $attrs Block attributes.
	 * @return string
	 */
	private function render( $attrs = [] ) {
		// An empty array would serialise as "[]", which is not valid block markup.
		$json = $attrs ? serialize_block_attributes( $attrs ) . ' ' : '';

		return do_blocks( '<!-- wp:ap-block/posts ' . $json . '/-->' );
	}

	/**
	 * Reads a JSON data attribute printed with single quotes.
	 *
	 * @param string $html HTML.
	 * @param string $name Attribute name.
	 * @return mixed
	 */
	private function dataAttr( $html, $name ) {
		$this->assertSame( 1, preg_match( "/$name='([^']*)'/", $html, $m ), "$name is printed" );
		return json_decode( html_entity_decode( $m[1], ENT_QUOTES ), true );
	}

	/**
	 * One dynamic block, rendered by render.php.
	 */
	public function test_block_is_registered() {
		$block = WP_Block_Type_Registry::get_instance()->get_registered( 'ap-block/posts' );

		$this->assertInstanceOf( WP_Block_Type::class, $block );
		$this->assertTrue( $block->is_dynamic(), 'ap-block/posts renders through render.php' );
		$this->assertArrayHasKey( 'dateQuery', $block->attributes );
		$this->assertArrayHasKey( 'maxPages', $block->attributes['loadMore']['default'] );
	}

	/**
	 * The wrapper carries a unique id and the request the frontend sends back.
	 */
	public function test_wrapper_and_signed_request() {
		$html = $this->render( [ 'postsPerPage' => 2 ] );

		$this->assertStringContainsString( 'wp-block-ap-block-posts', $html );
		$this->assertMatchesRegularExpression( "/id='apbAdvancedPosts-\d+'/", $html );

		$request = $this->dataAttr( $html, 'data-request' );
		$this->assertIsArray( $request );
		$this->assertStringContainsString( 'apb/v1/posts', $request['url'] );
		$this->assertTrue( APB\Filter::verify( $request['query'], $request['sig'] ), 'The printed query is signed' );

		$query = json_decode( $request['query'], true );
		$this->assertSame( 2, $query['query']['postsPerPage'] );
		$this->assertArrayNotHasKey( 'readMore', $query['query'], 'Only query keys are signed and sent back' );
	}

	/**
	 * Two blocks on one page never share an id.
	 */
	public function test_ids_are_unique() {
		preg_match_all( "/id='(apbAdvancedPosts-\d+)'/", $this->render() . $this->render(), $m );

		$this->assertCount( 2, $m[1] );
		$this->assertNotSame( $m[1][0], $m[1][1] );
	}

	/**
	 * A Contributor can save any attribute value. Markup in an icon is cleaned before it is
	 * printed, and nothing in the JSON can close the attribute or open a tag.
	 */
	public function test_attributes_are_sanitized_and_escaped() {
		$html = $this->render(
			[
				'readMore'  => [ 'icon' => '<svg viewBox="0 0 1 1" onload="alert(1)"><script>alert(2)</script><path d="M0 0"/></svg>' ],
				'accordion' => [ 'indicatorIconUp' => '<img src=x onerror=alert(3)>' ],
				'postsSearch' => "'><script>alert(4)</script>",
			]
		);

		$this->assertStringNotContainsString( '<script', $html );
		$this->assertStringNotContainsString( 'onerror', $html );

		$attributes = $this->dataAttr( $html, 'data-attributes' );
		$this->assertStringNotContainsString( 'onload', $attributes['readMore']['icon'] );
		$this->assertStringNotContainsString( 'script', $attributes['readMore']['icon'] );
		$this->assertStringContainsString( '<path', $attributes['readMore']['icon'], 'The harmless part of the SVG stays' );
		$this->assertSame( '', $attributes['accordion']['indicatorIconUp'], 'A non-SVG icon is dropped' );
	}

	/**
	 * The loading placeholder is printed server-side so the layout does not jump.
	 */
	public function test_loading_placeholder() {
		$html = $this->render( [ 'layout' => 'grid' ] );

		$this->assertStringContainsString( 'LoadingPlaceholder-', $html );
	}
}
