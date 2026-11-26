<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; }

$prefix = 'apbAdvancedPosts';
$apbId = wp_unique_id( "$prefix-" );

// Icon attributes carry inline SVG. Clean them here so a Contributor can't
// store markup that runs when the frontend injects it. The JSON below is also
// hex-encoded so stored HTML entities can't decode back into tags.
if ( isset( $attributes['readMore'] ) && is_array( $attributes['readMore'] ) ) {
	$attributes['readMore']['icon'] = APB\Functions::sanitizeIcon( $attributes['readMore']['icon'] ?? '' );
}
if ( isset( $attributes['accordion'] ) && is_array( $attributes['accordion'] ) ) {
	$attributes['accordion']['indicatorIconUp'] = APB\Functions::sanitizeSvg( $attributes['accordion']['indicatorIconUp'] ?? '' );
	$attributes['accordion']['indicatorIconDown'] = APB\Functions::sanitizeSvg( $attributes['accordion']['indicatorIconDown'] ?? '' );
}

$layout = $attributes['layout'] ?? '';
$align = $attributes['align'] ?? 'wide';

// The frontend filter. Its settings are cleaned here, and the query is signed, so the browser
// can send the query back without being able to change it.
$apbPostType = is_string( $attributes['postType'] ?? null ) ? $attributes['postType'] : 'post';
$apbFilterStyles = $attributes['frontendFilter']['styles'] ?? null;
$apbFilter = APB\Filter::normalize( $attributes['frontendFilter'] ?? [], $apbPostType );
$apbFilter['enabled'] = $apbFilter['enabled'] && APB\Filter::supportsLayout( $layout );

$apbQueryAttr = APB\Posts::queryAttr( array_merge( $attributes ?? [], [ 'currentPostId' => get_the_ID() ] ) );
$apbQuery = wp_json_encode(
	[
		'query' => $apbQueryAttr,
		'filter' => $apbFilter,
	]
);
$apbRequest = [
	'url'		=> APB\Rest::url(),
	'query'		=> $apbQuery,
	'sig'		=> APB\Filter::sign( $apbQuery ),
	'facets'	=> $apbFilter['enabled'] ? APB\Filter::facets( $apbQueryAttr, $apbFilter ) : null,
];

$attributes['frontendFilter'] = is_array( $apbFilterStyles ) ? array_merge( $apbFilter, [ 'styles' => $apbFilterStyles ] ) : $apbFilter;

if ( 'ticker' === $layout ) {
	wp_enqueue_script( 'easyTicker' );
}

$skeletonAllowedTags = [
	'style'		=> [],
	'div'		=> [
		'class' => [],
		'id' => [],
		'role' => [],
		'style' => [],
		'aria-busy' => [],
		'aria-hidden' => [],
	],
	'article'	=> [
		'class' => [],
		'aria-hidden' => [],
	],
	'span'		=> [
		'class' => [],
		'style' => [],
	],
];
?>
<div
	<?php // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_block_wrapper_attributes() is properly escaped ?>
	<?php echo get_block_wrapper_attributes( [ 'class' => "align$align" ] ); ?>
	id='<?php echo esc_attr( $apbId ); ?>'
	data-nonce='<?php echo esc_attr( wp_json_encode( wp_create_nonce( 'wp_rest' ) ) ); ?>'
	data-attributes='<?php echo esc_attr( wp_json_encode( array_merge( $attributes ?? [], [ 'currentPostId' => get_the_ID() ] ), JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT ) ); ?>'
	data-request='<?php echo esc_attr( wp_json_encode( $apbRequest, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT ) ); ?>'
>
	<?php echo wp_kses( APB\Posts::loadingPlaceholder( $attributes ?? [], 'apb' ), $skeletonAllowedTags ); ?>
</div>