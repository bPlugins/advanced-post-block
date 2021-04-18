<?php
/**
 * Plugin Name: Advanced Post Block
 * Description: Advanced Post Block - Display Posts in Gutenberg Editor.
 * Version: 1.0
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: advanced-post-block
 */

// Constant
define( 'AP_BLOCK_PLUGIN_VERSION', '1.0.0' );
define( "AP_BLOCK_ASSETS_DIR", plugin_dir_url( __FILE__ ) . 'assets/' );

// Public Assets
function ap_block_assets() {
    wp_enqueue_style( 'swiper-slider', AP_BLOCK_ASSETS_DIR . 'css/swiper-bundle.min.css', '', '6.4.10', 'all' );

    wp_enqueue_script( 'swiper-slider', AP_BLOCK_ASSETS_DIR . 'js/swiper-bundle.min.js', array( 'jquery' ), '6.4.10', true );
    wp_enqueue_script( 'ap-block-script', AP_BLOCK_ASSETS_DIR . 'js/script.js', array( 'jquery', 'swiper-slider' ), AP_BLOCK_PLUGIN_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'ap_block_assets' );

// Admin Assets
function ap_block_admin_assets( $screen ) {
    wp_enqueue_style( 'swiper-slider', AP_BLOCK_ASSETS_DIR . 'css/swiper-bundle.min.css', '', '6.4.10', 'all' );
}
add_action( 'enqueue_block_editor_assets', 'ap_block_admin_assets' );

// Block Initializer
function ap_block_init() {
    // Custom Block Category
    function ap_block_category( $categories ) {
        return array_merge( [
            array(
                'slug'  => 'APBlock',
                'title' => 'Advanced Post Block',
            ),
        ], $categories );
    }
    add_filter( 'block_categories', 'ap_block_category', 10, 2 );

    // Register block styles for both frontend + backend.
    wp_register_style( 'ap_block-style-css', plugins_url( 'dist/blocks.style.build.css', __FILE__ ), is_admin() ? array( 'wp-editor' ) : null, null );

    // Register block editor script for backend.
    wp_register_script( 'ap_block-js', plugins_url( 'dist/blocks.build.js', __FILE__ ), array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components', 'wp-block-editor', 'wp-api' ), null, true );

    // Register block editor styles for backend.
    wp_register_style( 'ap_block-editor-css', plugins_url( 'dist/blocks.editor.build.css', __FILE__ ), array( 'wp-edit-blocks' ), null );

    // WP Localized globals. Use dynamic PHP stuff in JavaScript via `bBlocksAdmin` object.
    wp_localize_script(
        'ap_block-js',
        'bBlocksProAdmin', // Array containing dynamic data for a JS Global.
        [
            'pluginDirPath' => plugin_dir_path( __DIR__ ),
            'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
            'siteUrl'       => get_site_url(),
            'postTypes'     => ap_block_post_types(),
        ]
    );

    // Register Gutenberg block on server-side.
    register_block_type( 'ap-block/advanced-posts', array(
        'style'         => 'ap_block-style-css',
        'editor_script' => 'ap_block-js',
        'editor_style'  => 'ap_block-editor-css',
    ) );
}
// add_action( 'admin_init', 'ap_block_init' );
add_action( 'wp_loaded', 'ap_block_init' );

// Post Types
function ap_block_post_types() {
    $post_types = get_post_types(
        array(
            'public'       => true,
            'show_in_rest' => true,
        ),
        'objects'
    );

    $options = array();
    foreach ( $post_types as $post_type ) {
        if ( 'product' === $post_type->name ) {
            continue;
        }
        if ( 'attachment' === $post_type->name ) {
            continue;
        }
        if ( 'page' === $post_type->name ) {
            continue;
        }

        $options[] = array(
            'value' => $post_type->name,
            'label' => $post_type->label,
        );
    }
    return $options;
}

// Posts Block
require_once plugin_dir_path( __FILE__ ) . 'advanced-posts.php';

function ap_block_after_setup_theme() {
    add_theme_support( 'align-wide' );

    add_image_size( 'ap_block_large', 1200, 800, true );
    add_image_size( 'ap_block_medium', 525, 350, true );
    add_image_size( 'ap_block_square', 300, 300, true );
    add_image_size( 'ap_block_thumbnail', 150, 100, true );
}
add_action( 'after_setup_theme', 'ap_block_after_setup_theme' );

// Post API update
function ap_block_custom_rest() {
    $post_type = ap_block_post_types();

    foreach ( $post_type as $key => $value ) {

        register_rest_field( $value['value'], 'wbImage', array(
            'get_callback'    => function ( $obj ) {
                $f_images = array();
                if ( !isset( $obj['featured_media'] ) ) {
                    return $f_images;
                } else {
                    $image = wp_get_attachment_image_src( $obj['featured_media'], 'full', false );
                    if ( is_array( $image ) ) {
                        $f_images['full'] = $image;
                        $f_images['large'] = wp_get_attachment_image_src( $obj['featured_media'], 'ap_block_large', false );
                        $f_images['medium'] = wp_get_attachment_image_src( $obj['featured_media'], 'ap_block_medium', false );
                        $f_images['square'] = wp_get_attachment_image_src( $obj['featured_media'], 'ap_block_square', false );
                        $f_images['thumbnail'] = wp_get_attachment_image_src( $obj['featured_media'], 'ap_block_thumbnail', false );

                        return $f_images;
                    }
                }
            },
            'update_callback' => null,
            'schema'          => array(
                'description' => __( 'Different sizes featured images', 'advanced-post-block' ),
                'type'        => 'array',
            ),
        ) );

        register_rest_field( $value['value'], 'wbAuthor', array(
            'get_callback'    => function ( $obj ) {
                $author['name'] = get_the_author_meta( 'display_name', $obj['author'] );
                $author['link'] = get_author_posts_url( $obj['author'] );
                return $author;
            },
            'update_callback' => null,
            'schema'          => array(
                'description' => __( 'Author name and link', 'advanced-post-block' ),
                'type'        => 'string',
            ),
        ) );

        register_rest_field( $value['value'], 'wbDate', array(
            'get_callback'    => function ( $obj ) {
                return get_the_date( 'M j, Y', $obj['id'] );
            },
            'update_callback' => null,
            'schema'          => array(
                'description' => __( 'Author name and link', 'advanced-post-block' ),
                'type'        => 'string',
            ),
        ) );

        register_rest_field( $value['value'], 'wbCategories', array(
            'get_callback'    => function ( $obj ) {
                $catsLink['space'] = get_the_category_list( esc_html__( ' ' ), '', $obj['id'] );
                $catsLink['coma'] = get_the_category_list( esc_html__( ', ' ), '', $obj['id'] );
                return $catsLink;
            },
            'update_callback' => null,
            'schema'          => array(
                'description' => __( 'Category link lists', 'advanced-post-block' ),
                'type'        => 'string',
            ),
        ) );

        register_rest_field( $value['value'], 'wbComment', array(
            'get_callback'    => function ( $obj ) {
                return wp_count_comments( $obj['id'] )->total_comments;
            },
            'update_callback' => null,
            'schema'          => array(
                'description' => __( 'Comment', 'advanced-post-block' ),
                'type'        => 'number',
            ),
        ) );
    }
}
add_action( 'rest_api_init', 'ap_block_custom_rest' );