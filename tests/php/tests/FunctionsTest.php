<?php
/**
 * Request sanitising and SVG cleaning.
 *
 * @package APB
 */

use APB\Functions;

/**
 * Helpers that stand between saved or requested values and the page.
 */
class FunctionsTest extends WP_UnitTestCase {

	/**
	 * Booleans and null keep their type; strings are cleaned; nested arrays too.
	 */
	public function test_sanitize_array() {
		$clean = Functions::sanitize_array(
			[
				'yes'    => true,
				'no'     => false,
				'none'   => null,
				'strYes' => 'true',
				'strNo'  => 'false',
				'int'    => '12',
				'float'  => '1.5',
				'html'   => '<b>bold</b> text',
				'nested' => [ 'flag' => true ],
			]
		);

		$this->assertTrue( $clean['yes'], 'A JSON true must not become "1"' );
		$this->assertFalse( $clean['no'] );
		$this->assertNull( $clean['none'] );
		$this->assertTrue( $clean['strYes'] );
		$this->assertFalse( $clean['strNo'] );
		$this->assertSame( 12, $clean['int'] );
		$this->assertSame( 1.5, $clean['float'] );
		$this->assertSame( 'bold text', $clean['html'] );
		$this->assertTrue( $clean['nested']['flag'] );

		$this->assertFalse( Functions::sanitize_array( 'not an array' ) );
	}

	/**
	 * Only numeric IDs survive.
	 */
	public function test_filter_nan() {
		$this->assertSame( [ 3, 7 ], array_values( array_map( 'intval', Functions::filterNaN( [ 3, 'x', '7', null ] ) ) ) );
	}

	/**
	 * Scripts and event handlers go; the drawing stays.
	 */
	public function test_sanitize_svg() {
		$svg = Functions::sanitizeSvg( '<svg viewBox="0 0 10 10" onload="alert(1)"><script>alert(2)</script><path d="M0 0h10" fill="red"/><a href="javascript:alert(3)">x</a></svg>' );

		$this->assertStringNotContainsString( 'onload', $svg );
		$this->assertStringNotContainsString( '<script', $svg );
		$this->assertStringNotContainsString( 'javascript:', $svg );
		$this->assertStringContainsString( '<path d="M0 0h10" fill="red"', $svg );
		$this->assertStringContainsString( 'viewbox="0 0 10 10"', strtolower( $svg ) );

		$this->assertSame( '', Functions::sanitizeSvg( '' ) );
		$this->assertSame( '', Functions::sanitizeSvg( [ 'not', 'a', 'string' ] ) );
	}

	/**
	 * An icon is inline SVG or an image URL, nothing else.
	 */
	public function test_sanitize_icon() {
		$this->assertStringStartsWith( '<svg', Functions::sanitizeIcon( '<svg><path d="M0 0"/></svg>' ) );
		$this->assertSame( 'https://example.com/icon.png', Functions::sanitizeIcon( 'https://example.com/icon.png' ) );
		$this->assertSame( '', Functions::sanitizeIcon( '<img src=x onerror=alert(1)>' ), 'Other markup is dropped' );
		$this->assertSame( '', Functions::sanitizeIcon( '&lt;img src=x onerror=alert(1)&gt;' ), 'Entity-encoded markup too' );
		$this->assertStringNotContainsString( 'javascript', Functions::sanitizeIcon( 'javascript:alert(1)' ) );
		$this->assertSame( '', Functions::sanitizeIcon( null ) );
	}
}
