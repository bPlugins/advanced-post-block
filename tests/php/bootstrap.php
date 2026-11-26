<?php
/**
 * PHPUnit bootstrap: loads the plugin into the WordPress test suite.
 *
 * wp-env ships the suite at WP_TESTS_DIR (/wordpress-phpunit) in its containers;
 * anywhere else, point WP_TESTS_DIR at a checkout of wordpress-develop/tests/phpunit.
 *
 * @package APB
 */

$apbTestsDir = getenv( 'WP_TESTS_DIR' );
if ( ! $apbTestsDir ) {
	$apbTestsDir = '/wordpress-phpunit';
}

if ( ! file_exists( $apbTestsDir . '/includes/functions.php' ) ) {
	echo "WordPress test suite not found at $apbTestsDir. Set WP_TESTS_DIR.\n";
	exit( 1 );
}

// Yoast polyfills: the core suite refuses to start without them.
require_once __DIR__ . '/vendor/autoload.php';

require_once $apbTestsDir . '/includes/functions.php';

tests_add_filter(
	'muplugins_loaded',
	function () {
		require dirname( __DIR__, 2 ) . '/plugin.php';
	}
);

require $apbTestsDir . '/includes/bootstrap.php';
