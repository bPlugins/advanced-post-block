<?php
/**
 * Plugin bootstrap: constants, version, block category and the plugin-list link.
 *
 * @package APB
 */

/**
 * Loads the plugin the way WordPress does and checks what it hooks in.
 */
class PluginTest extends WP_UnitTestCase {

	/**
	 * The constants every other file relies on.
	 */
	public function test_constants() {
		$this->assertTrue( defined( 'APB_VERSION' ) );
		$this->assertTrue( defined( 'APB_DIR_URL' ) );
		$this->assertTrue( defined( 'APB_DIR_PATH' ) );
		$this->assertTrue( defined( 'APB_OPTIONS_KEY' ) );
		$this->assertFileExists( APB_DIR_PATH . 'plugin.php' );
		$this->assertFileExists( APB_DIR_PATH . 'build/block.json' );
		$this->assertFileExists( APB_DIR_PATH . 'build/render.php' );
	}

	/**
	 * WordPress.org reads the readme, the plugin list reads the header: they must agree.
	 */
	public function test_version_header_matches_readme_stable_tag() {
		$header = get_file_data( APB_DIR_PATH . 'plugin.php', [ 'Version' => 'Version' ] )['Version'];
		$readme = file_get_contents( APB_DIR_PATH . 'readme.txt' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents

		$this->assertSame( 1, preg_match( '/^Stable tag:\s*(\S+)/mi', $readme, $m ) );
		$this->assertSame( $m[1], $header );
	}

	/**
	 * The block's own inserter category comes first.
	 */
	public function test_block_category() {
		$categories = apply_filters( 'block_categories_all', [ [ 'slug' => 'text', 'title' => 'Text' ] ], null );

		$this->assertSame( 'APBlock', $categories[0]['slug'] );
		$this->assertContains( 'text', array_column( $categories, 'slug' ), 'Core categories are kept' );
	}

	/**
	 * "Help & Demos" is added to this plugin's row only.
	 */
	public function test_plugin_action_link() {
		$basename = plugin_basename( APB_DIR_PATH . 'plugin.php' );
		$links    = apply_filters( 'plugin_action_links', [], $basename );

		$this->assertArrayHasKey( 'help-and-demos', $links );
		$this->assertStringContainsString( 'page=advanced-post-block', $links['help-and-demos'] );
		$this->assertSame( [], apply_filters( 'plugin_action_links', [], 'other/other.php' ), 'Only this plugin gets the link' );
	}
}
