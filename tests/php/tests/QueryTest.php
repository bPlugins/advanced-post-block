<?php
/**
 * Building and running the posts query.
 *
 * @package APB
 */

use APB\Posts;

/**
 * Posts::queryAttr() decides what a block may ask for, Posts::dateClause() turns the
 * Date Range into a date_query, and Posts::queryPosts() returns one page and the total.
 *
 * Premium options are not licensed here, so they behave as on a free site.
 */
class QueryTest extends WP_UnitTestCase {

	/**
	 * Post IDs by month, created once for the class.
	 *
	 * @var int[]
	 */
	private static $posts = [];

	/**
	 * Eight posts: two in each month from March to June 2025.
	 *
	 * @param WP_UnitTest_Factory $factory Factory.
	 */
	public static function wpSetUpBeforeClass( $factory ) {
		foreach ( [ '2025-03', '2025-04', '2025-05', '2025-06' ] as $month ) {
			foreach ( [ '05', '25' ] as $day ) {
				self::$posts[] = $factory->post->create(
					[
						'post_date'   => "$month-$day 12:00:00",
						'post_status' => 'publish',
					]
				);
			}
		}
	}

	/**
	 * Total posts matching a set of attributes.
	 *
	 * @param array $attrs Query attributes.
	 * @return int
	 */
	private function total( $attrs ) {
		$attrs = array_merge(
			[
				'postType'     => 'post',
				'postsPerPage' => 3,
			],
			$attrs
		);

		return Posts::queryPosts( Posts::queryAttr( $attrs ), 1 )['totalPosts'];
	}

	/**
	 * Only the query keys pass; the date range is one of them.
	 */
	public function test_query_attr_allowlist() {
		$attr = Posts::queryAttr(
			[
				'postType'  => 'post',
				'dateQuery' => [ 'range' => 'last' ],
				'readMore'  => [ 'label' => 'x' ],
				'evil'      => 'x',
			]
		);

		$this->assertSame( 'post', $attr['postType'] );
		$this->assertSame( 'last', $attr['dateQuery']['range'] );
		$this->assertArrayNotHasKey( 'readMore', $attr );
		$this->assertArrayNotHasKey( 'evil', $attr );
		$this->assertSame( 'excerpt', $attr['excerptFrom'] );
	}

	/**
	 * Values the editor saves become date_query clauses that include both ends.
	 */
	public function test_date_clause_from_editor_values() {
		$this->assertSame( [], Posts::dateClause( [] ) );
		$this->assertSame( [], Posts::dateClause( null ) );
		$this->assertSame( [], Posts::dateClause( [ 'range' => '' ] ) );

		$this->assertSame(
			[
				'after'     => '30 days ago',
				'inclusive' => true,
				'column'    => 'post_date',
			],
			Posts::dateClause(
				[
					'range' => 'last',
					'after' => '30 days ago',
				]
			)
		);

		$clause = Posts::dateClause(
			[
				'range'  => 'custom',
				'after'  => '2025-04-01',
				'before' => '2025-05-31',
			]
		);
		$this->assertSame( '2025-04-01', $clause['after'] );
		$this->assertSame( '2025-05-31', $clause['before'] );
		$this->assertTrue( $clause['inclusive'] );
	}

	/**
	 * Anything the editor cannot produce means no range.
	 */
	public function test_date_clause_rejects_other_values() {
		$this->assertSame(
			[],
			Posts::dateClause(
				[
					'range' => 'last',
					'after' => "1 day ago' OR 1=1",
				]
			)
		);
		$this->assertSame(
			[],
			Posts::dateClause(
				[
					'range' => 'last',
					'after' => 'tomorrow',
				]
			)
		);
		$this->assertSame(
			[],
			Posts::dateClause(
				[
					'range' => 'nope',
					'after' => '2025-01-01',
				]
			)
		);
		$this->assertSame(
			[],
			Posts::dateClause(
				[
					'range'  => 'custom',
					'after'  => '2025-02-30',
					'before' => 'soon',
				]
			),
			'Impossible and non-dates are dropped'
		);

		// Premium: "this month" and the modified date. Unlicensed, they count as no range / the published date.
		$this->assertSame(
			[],
			Posts::dateClause(
				[
					'range' => 'this',
					'after' => 'first day of this month 00:00',
				]
			)
		);
		$this->assertSame(
			'post_date',
			Posts::dateClause(
				[
					'range'  => 'last',
					'after'  => '7 days ago',
					'column' => 'post_modified',
				]
			)['column']
		);
	}

	/**
	 * Dates picked the wrong way round are swapped.
	 */
	public function test_date_clause_swaps_reversed_dates() {
		$clause = Posts::dateClause(
			[
				'range'  => 'custom',
				'after'  => '2025-05-31',
				'before' => '2025-04-01',
			]
		);

		$this->assertSame( '2025-04-01', $clause['after'] );
		$this->assertSame( '2025-05-31', $clause['before'] );
	}

	/**
	 * The range reaches the database and counts both end days.
	 */
	public function test_query_posts_with_date_range() {
		$this->assertSame( 8, $this->total( [] ) );

		$range = [
			'range'  => 'custom',
			'after'  => '2025-04-05',
			'before' => '2025-05-25',
		];
		$this->assertSame( 4, $this->total( [ 'dateQuery' => $range ] ), '5 Apr and 25 May are both included' );

		$this->assertSame(
			2,
			$this->total(
				[
					'dateQuery' => [
						'range'  => 'custom',
						'before' => '2025-03-31',
					],
				]
			),
			'Open start'
		);
		$this->assertSame(
			2,
			$this->total(
				[
					'dateQuery' => [
						'range' => 'custom',
						'after' => '2025-06-01',
					],
				]
			),
			'Open end'
		);
	}

	/**
	 * One page of posts, with the total that drives the pager.
	 */
	public function test_query_posts_pages_and_offset() {
		$attr = Posts::queryAttr(
			[
				'postType'     => 'post',
				'postsPerPage' => 3,
			]
		);

		$first = Posts::queryPosts( $attr, 1 );
		$last  = Posts::queryPosts( $attr, 3 );

		$this->assertCount( 3, $first['posts'] );
		$this->assertCount( 2, $last['posts'] );
		$this->assertSame( 8, $first['totalPosts'] );
		$this->assertEmpty( array_intersect( array_column( $first['posts'], 'id' ), array_column( $last['posts'], 'id' ) ) );

		$this->assertSame( 6, $this->total( [ 'postsOffset' => 2 ] ), 'Skipped posts are not counted' );
	}

	/**
	 * Booleans survive in every form a request can carry them.
	 */
	public function test_posts_per_page_all_accepts_string_booleans() {
		foreach ( [ true, 'true', '1', 1 ] as $value ) {
			$result = Posts::queryPosts(
				Posts::queryAttr(
					[
						'postType'          => 'post',
						'postsPerPage'      => 3,
						'isPostsPerPageAll' => $value,
					]
				),
				1
			);
			$this->assertCount( 8, $result['posts'], var_export( $value, true ) . ' means all posts' );
		}
	}

	/**
	 * Excluded posts and sticky posts stay out.
	 */
	public function test_exclude_posts_and_sticky() {
		$this->assertSame( 6, $this->total( [ 'postsExclude' => [ self::$posts[0], self::$posts[1] ] ] ) );

		stick_post( self::$posts[2] );
		$this->assertSame( 7, $this->total( [ 'isExcludeSticky' => true ] ) );
		unstick_post( self::$posts[2] );
	}
}
