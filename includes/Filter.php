<?php
namespace APB;

if ( ! defined( 'ABSPATH' ) ) {
	exit; }

/**
 * Filter class
 * The frontend filter: cleans the block's filter settings, signs the query a block prints,
 * lists the terms the filter offers and narrows the query by the term a visitor picked.
 *
 * A visitor never sends query arguments. The block's own query travels as a signed string,
 * and a visitor's pick is only accepted when the block's filter settings allow it, so the
 * pick can narrow the author's query but never widen it.
 *
 * @package APB
 */
class Filter {
	const CACHE_GROUP = 'apb_filter';

	/**
	 * Taxonomies the filter can be built on.
	 *
	 * @return array
	 */
	public static function taxonomies() {
		return [ 'category', 'post_tag' ];
	}

	/**
	 * Layouts the filter can sit above. The two tickers scroll a fixed run of posts.
	 *
	 * @param string $layout Block layout.
	 * @return bool
	 */
	public static function supportsLayout( $layout ) {
		return ! in_array( $layout, [ 'ticker', 'newsTicker' ], true );
	}

	/**
	 * Cleans the `frontendFilter` attribute: one single-choice pill filter on categories or tags.
	 *
	 * @param mixed  $filter     Raw attribute value.
	 * @param string $postType   The block's post type.
	 * @return array Clean settings, without the `styles` key.
	 */
	public static function normalize( $filter, $postType = 'post' ) {
		$filter = is_array( $filter ) ? $filter : [];

		$text = function ( $value, $default = '' ) {
			return is_string( $value ) ? sanitize_text_field( $value ) : $default;
		};
		$bool = function ( $value, $default = false ) {
			return null === $value ? $default : ( true === $value || 'true' === $value || 1 === $value || '1' === $value );
		};
		$section = function ( $key ) use ( $filter ) {
			return isset( $filter[ $key ] ) && is_array( $filter[ $key ] ) ? $filter[ $key ] : [];
		};

		$alignment = $text( $filter['alignment'] ?? '', 'left' );
		$alignment = in_array( $alignment, [ 'left', 'center', 'right' ], true ) ? $alignment : 'left';

		$taxonomies = [];
		$rawTaxonomies = isset( $filter['taxonomies'] ) && is_array( $filter['taxonomies'] ) ? $filter['taxonomies'] : [];

		foreach ( $rawTaxonomies as $facet ) {
			if ( ! is_array( $facet ) ) {
				continue;
			}

			$taxonomy = sanitize_key( $facet['taxonomy'] ?? '' );

			if ( ! in_array( $taxonomy, self::taxonomies(), true ) || ! self::isTaxonomyAllowed( $taxonomy, $postType ) ) {
				continue;
			}

			$taxonomies[] = [
				'taxonomy'	=> $taxonomy,
				'label'		=> $text( $facet['label'] ?? '' ),
				'allLabel'	=> $text( $facet['allLabel'] ?? null, __( 'All', 'advanced-post-block' ) ),
				'terms'		=> array_values( array_filter( array_map( 'absint', (array) ( $facet['terms'] ?? [] ) ) ) ),
				'hideEmpty'	=> $bool( $facet['hideEmpty'] ?? null, true ),
			];

			// One taxonomy filter per block.
			break;
		}

		$resultCount = $section( 'resultCount' );
		$reset = $section( 'reset' );
		$noResults = $section( 'noResults' );

		return [
			'enabled'		=> $bool( $filter['enabled'] ?? null, false ),
			'alignment'		=> $alignment,
			'taxonomies'	=> $taxonomies,
			'resultCount'	=> [ 'enabled' => $bool( $resultCount['enabled'] ?? null, true ) ],
			'reset'			=> [
				'enabled'	=> $bool( $reset['enabled'] ?? null, true ),
				'label'		=> $text( $reset['label'] ?? null, __( 'Clear all', 'advanced-post-block' ) ),
			],
			'noResults'		=> [
				'text'	=> $text( $noResults['text'] ?? null, __( 'No posts found', 'advanced-post-block' ) ),
			],
		];
	}

	/**
	 * Whether a taxonomy can be offered as a filter for a post type.
	 *
	 * @param string $taxonomy Taxonomy slug.
	 * @param string $postType Post type slug.
	 * @return bool
	 */
	public static function isTaxonomyAllowed( $taxonomy, $postType ) {
		return taxonomy_exists( $taxonomy )
			&& is_taxonomy_viewable( $taxonomy )
			&& is_object_in_taxonomy( $postType, $taxonomy );
	}

	/**
	 * Signs a string with the site's own secret. Unlike a nonce the result never expires,
	 * so a cached page keeps working.
	 *
	 * @param string $data The string to sign.
	 * @return string
	 */
	public static function sign( $data ) {
		return hash_hmac( 'sha256', (string) $data, wp_salt( 'nonce' ) );
	}

	/**
	 * Checks a signature made by sign().
	 *
	 * @param string $data		The signed string.
	 * @param string $signature	The signature sent with it.
	 * @return bool
	 */
	public static function verify( $data, $signature ) {
		return is_string( $data ) && is_string( $signature ) && '' !== $signature && hash_equals( self::sign( $data ), $signature );
	}

	/**
	 * Cleans what a visitor picked, keeping only what the filter settings allow.
	 *
	 * @param array $raw	Request values: tax (taxonomy => slug).
	 * @param array $filter	Clean filter settings from normalize().
	 * @return array [ 'tax' => [ taxonomy => [ slug ] ] ]
	 */
	public static function selection( $raw, $filter ) {
		$raw = is_array( $raw ) ? $raw : [];
		$selection = [ 'tax' => [] ];

		if ( empty( $filter['enabled'] ) ) {
			return $selection;
		}

		$rawTax = isset( $raw['tax'] ) && is_array( $raw['tax'] ) ? $raw['tax'] : [];

		foreach ( $filter['taxonomies'] as $facet ) {
			$value = $rawTax[ $facet['taxonomy'] ] ?? '';
			$value = is_array( $value ) ? implode( ',', array_filter( $value, 'is_scalar' ) ) : $value;

			if ( ! is_string( $value ) || '' === $value ) {
				continue;
			}

			// A single choice: only the first slug counts.
			$slugs = array_slice( array_values( array_filter( array_map( 'sanitize_title', explode( ',', $value ) ) ) ), 0, 1 );

			if ( $slugs ) {
				$selection['tax'][ $facet['taxonomy'] ] = $slugs;
			}
		}

		return $selection;
	}

	/**
	 * Narrows WP_Query arguments by a visitor's pick.
	 *
	 * @param array  $args       Arguments from Posts::arrangeQuery().
	 * @param array  $filter     Clean filter settings.
	 * @param array  $selection  Clean picks from selection().
	 * @param string $skipTax    A taxonomy to leave out, used when counting that taxonomy's terms.
	 * @return array
	 */
	public static function apply( $args, $filter, $selection, $skipTax = '' ) {
		$clauses = [];

		foreach ( $filter['taxonomies'] as $facet ) {
			$taxonomy = $facet['taxonomy'];

			if ( $taxonomy === $skipTax || empty( $selection['tax'][ $taxonomy ] ) ) {
				continue;
			}

			$termIds = get_terms(
				[
					'taxonomy'		=> $taxonomy,
					'slug'			=> $selection['tax'][ $taxonomy ],
					'fields'		=> 'ids',
					'hide_empty'	=> false,
				]
			);
			$termIds = is_wp_error( $termIds ) ? [] : array_map( 'absint', $termIds );

			if ( ! empty( $facet['terms'] ) ) {
				$termIds = array_values( array_intersect( $termIds, $facet['terms'] ) );
			}

			// A pick that matches no allowed term must return nothing, not everything.
			if ( empty( $termIds ) ) {
				$args['post__in'] = [ 0 ];
				continue;
			}

			$clauses[] = [
				'taxonomy'	=> $taxonomy,
				'field'		=> 'term_id',
				'terms'		=> $termIds,
				'operator'	=> 'IN',
			];
		}

		if ( $clauses ) {
			// The author's own tax query keeps its AND/OR relation as one nested group.
			$base = ! empty( $args['tax_query'] ) ? [ $args['tax_query'] ] : [];
			$args['tax_query'] = array_merge( [ 'relation' => 'AND' ], $base, $clauses ); // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
		}

		return $args;
	}

	/**
	 * Lists the terms the filter offers.
	 *
	 * @param array $queryAttr	The block's query attributes.
	 * @param array $filter		Clean filter settings.
	 * @return array [ 'taxonomies' => [ taxonomy => [ 'name' => '', 'terms' => [] ] ] ]
	 */
	public static function facets( $queryAttr, $filter ) {
		$cacheKey = self::cacheKey( 'facets', [ $queryAttr, $filter, get_locale() ] );
		$cached = wp_cache_get( $cacheKey, self::CACHE_GROUP );

		if ( is_array( $cached ) ) {
			return $cached;
		}

		$facets = [ 'taxonomies' => [] ];

		foreach ( $filter['taxonomies'] as $facet ) {
			$taxonomy = $facet['taxonomy'];
			$taxObject = get_taxonomy( $taxonomy );

			$termArgs = [
				'taxonomy'		=> $taxonomy,
				'hide_empty'	=> $facet['hideEmpty'],
				'orderby'		=> 'name',
				'order'			=> 'ASC',
				'number'		=> 200,
			];
			if ( ! empty( $facet['terms'] ) ) {
				$termArgs['include'] = $facet['terms'];
			}

			$terms = get_terms( $termArgs );
			$terms = is_wp_error( $terms ) ? [] : $terms;

			// Counted under the block's own query, so terms the query can never show are left out.
			$counts = $facet['hideEmpty'] ? self::termCounts( $queryAttr, $filter, $facet, $terms ) : null;

			$list = [];
			foreach ( $terms as $term ) {
				if ( is_array( $counts ) && 0 === ( $counts[ $term->term_id ] ?? 0 ) ) {
					continue;
				}

				$list[] = [
					'id'	=> (int) $term->term_id,
					'slug'	=> $term->slug,
					'name'	=> html_entity_decode( $term->name, ENT_QUOTES, 'UTF-8' ),
				];
			}

			$facets['taxonomies'][ $taxonomy ] = [
				'name'	=> $taxObject ? $taxObject->labels->singular_name : $taxonomy,
				'terms'	=> $list,
			];
		}

		wp_cache_set( $cacheKey, $facets, self::CACHE_GROUP, 5 * MINUTE_IN_SECONDS );

		return $facets;
	}

	/**
	 * Counts the block's posts per term, so terms with no posts in its query can be hidden.
	 *
	 * @param array $queryAttr	The block's query attributes.
	 * @param array $filter		Clean filter settings.
	 * @param array $facet		The taxonomy filter being counted.
	 * @param array $terms		WP_Term objects to count.
	 * @return array|null term id => count, or null when there are too many posts to count.
	 */
	public static function termCounts( $queryAttr, $filter, $facet, $terms ) {
		global $wpdb;

		if ( empty( $terms ) ) {
			return [];
		}

		$taxonomy = $facet['taxonomy'];

		/**
		 * Filters how many matching posts term counts are worked out for. Above it counts are skipped.
		 *
		 * @param int $limit Default 5000.
		 */
		$limit = (int) apply_filters( 'apb_filter_count_limit', 5000 );

		$args = self::apply( Posts::arrangeQuery( $queryAttr ), $filter, [ 'tax' => [] ], $taxonomy );
		$args = array_merge(
			$args,
			[
				'fields'					=> 'ids',
				'posts_per_page'			=> $limit + 1,
				'offset'					=> 0,
				'orderby'					=> 'none',
				'no_found_rows'				=> true,
				'ignore_sticky_posts'		=> true,
				'update_post_meta_cache'	=> false,
				'update_post_term_cache'	=> false,
			]
		);
		unset( $args['order'] );

		$postIds = array_map( 'absint', get_posts( $args ) );

		if ( count( $postIds ) > $limit ) {
			return null;
		}

		$counts = array_fill_keys( wp_list_pluck( $terms, 'term_id' ), 0 );

		if ( empty( $postIds ) ) {
			return $counts;
		}

		$idList = implode( ',', $postIds );

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- $idList holds absint() values only; callers cache the result.
		$rows = $wpdb->get_results( $wpdb->prepare( "SELECT tr.object_id, tt.term_id FROM {$wpdb->term_relationships} AS tr INNER JOIN {$wpdb->term_taxonomy} AS tt ON tt.term_taxonomy_id = tr.term_taxonomy_id WHERE tt.taxonomy = %s AND tr.object_id IN ( {$idList} )", $taxonomy ) );

		$postsByTerm = [];
		foreach ( (array) $rows as $row ) {
			$postsByTerm[ (int) $row->term_id ][ (int) $row->object_id ] = true;
		}

		$isHierarchical = is_taxonomy_hierarchical( $taxonomy );

		foreach ( $counts as $termId => $unused ) {
			$posts = $postsByTerm[ $termId ] ?? [];

			// A parent term also matches posts filed under its children, the way the query does.
			if ( $isHierarchical ) {
				$children = get_term_children( $termId, $taxonomy );

				foreach ( is_wp_error( $children ) ? [] : $children as $childId ) {
					$posts += $postsByTerm[ (int) $childId ] ?? [];
				}
			}

			$counts[ $termId ] = count( $posts );
		}

		return $counts;
	}

	/**
	 * Builds a cache key that changes whenever posts or terms change.
	 *
	 * @param string $name   What is being cached.
	 * @param mixed  $parts  Everything the cached value depends on.
	 * @return string
	 */
	public static function cacheKey( $name, $parts ) {
		return $name . ':' . md5( wp_json_encode( $parts ) ) . ':' . wp_cache_get_last_changed( 'posts' ) . ':' . wp_cache_get_last_changed( 'terms' );
	}
}
