<?php
/**
 * Plugin Name: Advanced Post Block
 * Description: Advanced Post Block - Display Posts in Gutenberg Editor.
 * Version: 1.1
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: advanced-post-block
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

// Constant
define( 'AP_BLOCK_PLUGIN_VERSION', '1.1' );
define( 'AP_BLOCK_ASSETS_DIR', plugin_dir_url( __FILE__ ) . 'assets/' );

// Register Block Category
function ap_block_category( $categories ) {
    return array_merge(
        array(
            array(
                'slug'  => 'APBlock',
                'title' => 'Advanced Post Block',
            ),
        ),
        $categories
    );
}
add_filter( 'block_categories', 'ap_block_category' );

// Register Blocks
function ap_block_wp_register_script( $block, $options = array() ) {
    register_block_type(
        'ap-block/' . $block,
        array_merge(
            array(
                'editor_script' => 'ap_block_editor_script',
                'editor_style'  => 'ap_block_editor_style',
                'script'        => 'ap_block_script',
                'style'         => 'ap_block_style',
            ),
            $options
        )
    );
}

// Enqueue Assets
function ap_block_assets( $screen ) {
    wp_enqueue_style( 'swiper-slider', AP_BLOCK_ASSETS_DIR . 'css/swiper-bundle.min.css', '', '6.4.10', 'all' );
}
add_action( 'enqueue_block_assets', 'ap_block_assets' );

// Block Initializer
function ap_block_init() {
    // Resister script in editor
    wp_register_script( 'ap_block_editor_script', plugins_url( 'dist/editor.js', __FILE__ ), array( 'wp-blocks', 'wp-element', 'wp-data', 'wp-i18n', 'wp-editor', 'wp-components', 'wp-blob', 'wp-html-entities', 'wp-compose', 'wp-rich-text' ), null, false );
    // Register style in editor
    wp_register_style( 'ap_block_editor_style', plugins_url( 'dist/editor.css', __FILE__ ), array( 'wp-edit-blocks' ), null );

    // Register script in frontend
    wp_register_script( 'ap_block_script', plugins_url( 'dist/script.js', __FILE__ ), array( 'jquery' ), null, true );
    // Register style in frontend
    wp_register_style( 'ap_block_style', plugins_url( 'dist/style.css', __FILE__ ), array( 'wp-editor' ), null );

    // Register Blocks
    ap_block_wp_register_script( 'posts', array(
        'render_callback' => 'render_ap_block_posts',
        // 'attributes'      => array(
        //     'postsPerPage'   => array( 'type' => 'number', 'default' => 5 ),
        // ),
    ) );

    // WP Localized globals.
    wp_localize_script(
        'ap_block_editor_script',
        'APBlockAdmin', // Array containing dynamic data for a JS Global.
        array(
            'pluginDirPath' => plugin_dir_path( __DIR__ ),
            'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
            'siteUrl'       => get_site_url(),
            'postTypes'     => ap_block_post_types(),
        )
    );
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
require_once plugin_dir_path( __FILE__ ) . 'inc/posts.php';

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