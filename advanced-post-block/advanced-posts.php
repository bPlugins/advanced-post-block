<?php
function ap_block_posts_init() {
    // Posts callback
    register_block_type( 'ap-block/posts', [
        'render_callback' => 'render_ap_block_posts',
    ] );
}
add_action( 'init', 'ap_block_posts_init' );

function render_ap_block_posts( $attributes ) {
    extract( $attributes );

    $align ?? $align = 'wide';
    $cId ?? $cId = '';

    $layout ?? $layout = 'grid';
    $subLayout ?? $subLayout = 'default';
    $columns ?? $columns = array(
        'desktop' => 3,
        'tablet'  => 2,
        'mobile'  => 1,
    );
    $columnGap ?? $columnGap = 10;
    $rowGap ?? $rowGap = 10;
    $isContentEqualHight ?? $isContentEqualHight = 'true';
    $sliderContentHeight ?? $sliderContentHeight = 350;

    $postType ?? $postType = 'post';
    $selectedCategories ?? $selectedCategories = [];
    $isPostsPerPageAll ?? $isPostsPerPageAll = 'false';
    $postsPerPage ?? $postsPerPage = 12;
    $postsOrderBy ?? $postsOrderBy = 'date';
    $postsOrder ?? $postsOrder = 'desc';

    $contentAlign ?? $contentAlign = 'left';
    $contentBGColor ?? $contentBGColor = '#f4f2fc';
    $postTextPTB ?? $postTextPTB = 15;
    $postTextPLR ?? $postTextPLR = 25;
    $borderColor ?? $borderColor = '#4527a400';

    $sliderIsLoop ?? $sliderIsLoop = true;
    $sliderIsAutoplay ?? $sliderIsAutoplay = true;
    $sliderSpeed ?? $sliderSpeed = .5;
    $sliderIsFade ?? $sliderIsFade = false;
    $sliderIsTouchMove ?? $sliderIsTouchMove = false;
    $sliderIsPage ?? $sliderIsPage = true;
    $sliderIsPageClickable ?? $sliderIsPageClickable = true;
    $sliderIsPageDynamic ?? $sliderIsPageDynamic = true;
    $sliderPageColor ?? $sliderPageColor = '#8344c5';
    $sliderPageWidth ?? $sliderPageWidth = 15;
    $sliderPageHeight ?? $sliderPageHeight = 15;
    $sliderPageRadius ?? $sliderPageRadius = 50;
    $sliderPageRadiusType ?? $sliderPageRadiusType = '%';
    $sliderIsPrevNext ?? $sliderIsPrevNext = true;
    $sliderPrevNextColor ?? $sliderPrevNextColor = '#4527a4';

    $isFImg ?? $isFImg = 'true';
    $isFImgLink ?? $isFImgLink = 'false';

    $isTitle ?? $isTitle = 'true';
    $isTitleLink ?? $isTitleLink = 'true';
    $titleFontSize ?? $titleFontSize = 25;
    $titleColor ?? $titleColor = '#4527a4';
    $titleMB ?? $titleMB = 15;

    $isMeta ?? $isMeta = 'true';
    $isMetaAuthor ?? $isMetaAuthor = 'true';
    $isMetaDate ?? $isMetaDate = 'true';
    $isMetaCategory ?? $isMetaCategory = 'true';
    $metaCategoryIn ?? $metaCategoryIn = 'content';
    $isMetaComment ?? $isMetaComment = 'false';
    $metaFontSize ?? $metaFontSize = 13;
    $metaTransform ?? $metaTransform = 'uppercase';
    $metaTextColor ?? $metaTextColor = '#333';
    $metaLinkColor ?? $metaLinkColor = '#8344c5';
    $metaIconColor ?? $metaIconColor = '#4527a4';
    $metaMB ?? $metaMB = 15;

    $isExcerpt ?? $isExcerpt = 'true';
    $excerptLength ?? $excerptLength = 25;
    $excerptAlign ?? $excerptAlign = 'justify';
    $excerptColor ?? $excerptColor = '#333';
    $excerptMB ?? $excerptMB = 15;

    $isReadMore ?? $isReadMore = 'true';
    $readMoreLabel ?? $readMoreLabel = 'Read More';
    $isLinkNewTab ?? $isLinkNewTab = 'false';
    $readMoreAlign ?? $readMoreAlign = 'left';
    $readMoreFontSize ?? $readMoreFontSize = 14;
    $readMoreTransform ?? $readMoreTransform = 'uppercase';
    $readMoreFontWeight ?? $readMoreFontWeight = '600';
    $readMoreColor ?? $readMoreColor = '#4527a4';
    $readMoreHovColor ?? $readMoreHovColor = '#8344c5';

    // All Posts
    $posts = get_posts( [
        'post_type'      => $postType,
        'category'       => $selectedCategories,
        'posts_per_page' => 'true' == $isPostsPerPageAll ? -1 : $postsPerPage,
        'orderby'        => $postsOrderBy,
        'order'          => $postsOrder,
    ] );

    $alignClass = '' == $align ? '' : 'align' . $align;

    ob_start();
    echo '<div class="b_blocks_advanced_posts ' . $alignClass . '">';

    if ( 'grid' == $layout ) {
        $alignItems = 'false' == $isContentEqualHight ? 'start' : 'initial';

        echo '<div id="bBlocksGridAdvancedPosts-' . $cId . '" class="bBlocksGridPosts" style="grid-gap: ' . $rowGap . 'px ' . $columnGap . 'px; align-items: ' . $alignItems . '">';
        foreach ( $posts as $post ) {
            if ( 'default' == $subLayout || 'title-meta' == $subLayout ) {
                echo APBlockLDefault( $attributes, $post );
            } else if ( 'left-image' == $subLayout || 'right-image' == $subLayout ) {
                echo APBlockLSideImage( $attributes, $post );
            } else if ( 'overlay-content' == $subLayout || 'overlay-content-hover' == $subLayout || 'overlay-box' == $subLayout ) {
                echo APBlockLOverlay( $attributes, $post );
            } else {
                echo '<p>Please, select a sub layout</p>';
            }
        }
        echo '
            <style>
                #bBlocksGridAdvancedPosts-' . $cId . '{
                    grid-template-columns: repeat(' . $columns['desktop'] . ', 1fr);
                }

                @media (max-width: 767px) {
                    #bBlocksGridAdvancedPosts-' . $cId . '{
                        grid-template-columns: repeat(' . $columns['tablet'] . ', 1fr);
                    }
                }
                @media (max-width: 575px) {
                    #bBlocksGridAdvancedPosts-' . $cId . '{
                        grid-template-columns: repeat(' . $columns['mobile'] . ', 1fr);
                    }
                }
            </style>
        </div>';

    } else if ( 'masonry' == $layout ) {
        echo '<div id="bBlocksMasonryAdvancedPosts-' . $cId . '" class="bBlocksMasonryPosts" style="gap: ' . $columnGap . 'px;">';
        foreach ( $posts as $post ) {
            if ( 'default' == $subLayout || 'title-meta' == $subLayout ) {
                echo APBlockLDefault( $attributes, $post );
            } else if ( 'left-image' == $subLayout || 'right-image' == $subLayout ) {
                echo APBlockLSideImage( $attributes, $post );
            } else if ( 'overlay-content' == $subLayout || 'overlay-content-hover' == $subLayout || 'overlay-box' == $subLayout ) {
                echo APBlockLOverlay( $attributes, $post );
            } else {
                echo '<p>Please, select a sub layout</p>';
            }
        }
        echo '
            <style>
                #bBlocksMasonryAdvancedPosts-' . $cId . '{
                    columns: ' . $columns['desktop'] . ';
                }

                @media (max-width: 767px) {
                    #bBlocksMasonryAdvancedPosts-' . $cId . '{
                        columns: ' . $columns['tablet'] . ';
                    }
                }
                @media (max-width: 575px) {
                    #bBlocksMasonryAdvancedPosts-' . $cId . '{
                        columns: ' . $columns['mobile'] . ';
                    }
                }
            </style>
        </div>';
    } else if ( 'slider' == $layout ) {
        $paginationDiv = $sliderIsPage ? '<div class="swiper-pagination"></div>' : '';
        $prevNext = $sliderIsPrevNext ? '<div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>' : '';

        echo '<div id="bBlocksSliderAdvancedPosts-' . $cId . '" class="bBlocksSliderPosts" style="height: ' . $sliderContentHeight . 'px;" data-id=' . $cId . ' data-layout=' . $layout . ' data-columns=' . wp_json_encode( $columns ) . ' data-column_gap=' . $columnGap . ' data-slider_is_loop="' . $sliderIsLoop . '" data-slider_is_autoplay="' . $sliderIsAutoplay . '" data-slider_speed=' . $sliderSpeed . ' data-slider_is_fade="' . $sliderIsFade . '"  data-slider_is_touch_move="' . $sliderIsTouchMove . '" data-slider_is_page_clickable="' . $sliderIsPageClickable . '" data-slider_is_page_dynamic="' . $sliderIsPageDynamic . '">
        <div class="swiper-wrapper">';
        foreach ( $posts as $post ) {
            if ( 'default' == $subLayout || 'title-meta' == $subLayout ) {
                echo APBlockLDefault( $attributes, $post );
            } else if ( 'left-image' == $subLayout || 'right-image' == $subLayout ) {
                echo APBlockLSideImage( $attributes, $post );
            } else if ( 'overlay-content' == $subLayout || 'overlay-content-hover' == $subLayout || 'overlay-box' == $subLayout ) {
                echo APBlockLOverlay( $attributes, $post );
            } else {
                echo '<p>Please, select a sub layout</p>';
            }
        }
        echo '</div>

            <style>
                #bBlocksSliderAdvancedPosts-' . $cId . ' .swiper-pagination .swiper-pagination-bullet{
                    background: ' . $sliderPageColor . ';
                    width: ' . $sliderPageWidth . 'px;
                    height: ' . $sliderPageHeight . 'px;
                    border-radius: ' . $sliderPageRadius . $sliderPageRadiusType . ';
                }
                #bBlocksSliderAdvancedPosts-' . $cId . ' .swiper-pagination .swiper-pagination-bullet:focus{
                    outline: 0;
                }

                #bBlocksSliderAdvancedPosts-' . $cId . ' .swiper-button-prev, .swiper-button-next{
                    color: ' . $sliderPrevNextColor . ';
                }
            </style>

        ' . $paginationDiv . $prevNext . '
        </div>';
    } else {
        echo '';
    }

    echo '</div>';
    return ob_get_clean();
}
// layout Component
// Default
function APBlockLDefault( $attributes, $post ) {
    extract( $attributes );
    $layout ?? $layout = 'grid';
    $subLayout ?? $subLayout = 'default';
    $rowGap ?? $rowGap = 10;
    $contentAlign ?? $contentAlign = 'left';
    $contentBGColor ?? $contentBGColor = '#f4f2fc';
    $postTextPTB ?? $postTextPTB = 15;
    $postTextPLR ?? $postTextPLR = 25;
    $borderColor ?? $borderColor = '#4527a400';

    $articleMB = 'masonry' == $layout ? $rowGap . 'px' : 0;

    $titleMetaFilter = 'title-meta' != $subLayout ? APBlockSExcerpt( $attributes, $post ) . APBlockSReadMore( $attributes, $post ) : '';

    $slideClass = 'slider' == $layout ? ' swiper-slide' : '';

    return '<article class="bBlocksPostArticle bBlocksPostArticleDefault ' . $slideClass . '" style="margin-bottom: ' . $articleMB . '; text-align: ' . $contentAlign . '; background-color: ' . $contentBGColor . '; border: 1px solid ' . $borderColor . ';">
        ' . APBlockSFeatureImg( $attributes, $post ) . '

        <div class="bBlocksPostText" style="padding: ' . $postTextPTB . 'px ' . $postTextPLR . 'px;">
        ' . APBlockSTitle( $attributes, $post ) . APBlockSMetaData( $attributes, $post ) . $titleMetaFilter . '
        </div>
    </article>';
}

// Side Image
function APBlockLSideImage( $attributes, $post ) {
    extract( $attributes );
    $layout ?? $layout = 'grid';
    $subLayout ?? $subLayout = 'default';
    $rowGap ?? $rowGap = 10;
    $contentAlign ?? $contentAlign = 'left';
    $contentBGColor ?? $contentBGColor = '#f4f2fc';
    $postTextPTB ?? $postTextPTB = 15;
    $postTextPLR ?? $postTextPLR = 25;
    $borderColor ?? $borderColor = '#4527a400';

    $articleMB = 'masonry' == $layout ? $rowGap . 'px' : 0;

    $leftImage = 'left-image' == $subLayout ? APBlockSFeatureImg( $attributes, $post ) : '';
    $rightImage = 'right-image' == $subLayout ? APBlockSFeatureImg( $attributes, $post ) : '';

    $leftImgClass = 'left-image' == $subLayout ? ' leftImage' : '';
    $rightImgClass = 'right-image' == $subLayout ? ' rightImage' : '';

    $displayCSS = get_the_post_thumbnail_url( $post->ID ) ? 'grid' : 'flex';

    $slideClass = 'slider' == $layout ? ' swiper-slide' : '';

    return '<article class="bBlocksPostArticle bBlocksPostArticleSideImage ' . $leftImgClass . $rightImgClass . $slideClass . '" style="display: ' . $displayCSS . '; margin-bottom: ' . $articleMB . '; text-align: ' . $contentAlign . '; background-color: ' . $contentBGColor . '; border: 1px solid ' . $borderColor . ';">
        ' . $leftImage . '

        <div class="bBlocksPostText" style="padding: ' . $postTextPTB . 'px ' . $postTextPLR . 'px;">
        ' . APBlockSTitle( $attributes, $post ) . APBlockSMetaData( $attributes, $post ) . APBlockSExcerpt( $attributes, $post ) . APBlockSReadMore( $attributes, $post ) . '
        </div>

        ' . $rightImage . '
    </article>';
}

// Overlay
function APBlockLOverlay( $attributes, $post ) {
    extract( $attributes );
    $layout ?? $layout = 'grid';
    $subLayout ?? $subLayout = 'default';
    $rowGap ?? $rowGap = 10;
    $isFImg ?? $isFImg = 'true';
    $contentAlign ?? $contentAlign = 'left';
    $contentBGColor ?? $contentBGColor = '#00000080';
    $postTextPTB ?? $postTextPTB = 15;
    $postTextPLR ?? $postTextPLR = 25;
    $borderColor ?? $borderColor = '#4527a400';

    $articleMB = 'masonry' == $layout ? $rowGap . 'px' : 0;

    $imgUrl = get_the_post_thumbnail_url( $post->ID );
    $bgImg = 'true' === $isFImg && $imgUrl ? $imgUrl : '';

    $overlayHoverClass = 'overlay-content-hover' == $subLayout && $imgUrl ? ' bBlocksPostArticleOverlayHover' : '';
    $overlayBoxClass = 'overlay-box' == $subLayout ? ' bBlocksPostArticleOverlayBox' : '';

    $alignItems = 'left' == $contentAlign ? ( 'right' == $contentAlign ? ( 'centre' == $contentAlign ? 'center' : 'flex-end' ) : 'flex-start' ) : '';

    $overlayBoxFilter = 'overlay-box' != $subLayout ? APBlockSExcerpt( $attributes, $post ) . APBlockSReadMore( $attributes, $post ) : '';

    $slideClass = 'slider' == $layout ? ' swiper-slide' : '';

    return '<article class="bBlocksPostArticle bBlocksPostArticleOverlay ' . $overlayHoverClass . $overlayBoxClass . $slideClass . '" style="background-image: url(' . $bgImg . '); margin-bottom: ' . $articleMB . '; border: 1px solid ' . $borderColor . ';">

        <div class="bBlocksPostText" style="background-color: ' . $contentBGColor . '; padding: ' . $postTextPTB . 'px ' . $postTextPLR . 'px; align-items: ' . $alignItems . '">
        ' . APBlockSTitle( $attributes, $post ) . APBlockSMetaData( $attributes, $post ) . $overlayBoxFilter . '
        </div>

    </article>';
}

// Single Components
// Feature Image
function APBlockSFeatureImg( $attributes, $post ) {
    extract( $attributes );
    $isFImg ?? $isFImg = 'true';
    $isFImgLink ?? $isFImgLink = 'false';
    $isMetaCategory ?? $isMetaCategory = 'true';
    $metaCategoryIn ?? $metaCategoryIn = 'content';
    $metaFontSize ?? $metaFontSize = 13;
    $metaTransform ?? $metaTransform = 'uppercase';
    $isLinkNewTab ?? $isLinkNewTab = 'false';

    if ( 'true' == $isFImg ) {
        $imgUrl = get_the_post_thumbnail_url( $post->ID );

        $tab = 'true' == $isLinkNewTab ? '_blank' : '_self';

        $link = 'true' == $isFImgLink ? '<a href="' . get_post_permalink( $post->ID ) . '" target="' . $tab . '"></a>' : '';

        $catsInImg = 'true' === $isMetaCategory && 'image' == $metaCategoryIn ? '<div class="bBlocksPostFImgCats" style="font-size:' . $metaFontSize . 'px; text-transform: ' . $metaTransform . ';">' .
        get_the_category_list( esc_html__( ' ' ), '', $post->ID )
        . '</div>' : '';

        return $imgUrl ? '<figure class="bBlocksPostFImg" style="background-image: url(' . $imgUrl . '); margin: 0">' .
        $link .
        $catsInImg
        . '</figure>' : '';
    } else {
        return '';
    }
}

// Title
function APBlockSTitle( $attributes, $post ) {
    extract( $attributes );
    $contentAlign ?? $contentAlign = 'left';
    $isTitle ?? $isTitle = 'true';
    $isTitleLink ?? $isTitleLink = 'true';
    $titleFontSize ?? $titleFontSize = 25;
    $titleColor ?? $titleColor = '#4527a4';
    $titleMB ?? $titleMB = 15;
    $isLinkNewTab ?? $isLinkNewTab = 'false';

    if ( 'true' == $isTitle ) {
        $tab = 'true' == $isLinkNewTab ? '_blank' : '_self';

        $title = 'true' == $isTitleLink ? '<a href="' . get_post_permalink( $post->ID ) . '" target="' . $tab . '" style="color: ' . $titleColor . ';">' . $post->post_title . '</a>' : $post->post_title;

        return '<h2 class="bBlocksPostTitle" style="text-align:' . $contentAlign . '; font-size:' . $titleFontSize . 'px; color: ' . $titleColor . '; margin: 0 0 ' . $titleMB . 'px 0">' . $title . '</h2>';
    } else {
        return '';
    }
}

// Meta Data
function APBlockSMetaData( $attributes, $post ) {
    extract( $attributes );
    $contentAlign ?? $contentAlign = 'left';
    $isMeta ?? $isMeta = 'true';
    $metaFontSize ?? $metaFontSize = 13;
    $metaTransform ?? $metaTransform = 'uppercase';
    $metaTextColor ?? $metaTextColor = '#333';
    $metaMB ?? $metaMB = 15;

    if ( 'true' == $isMeta ) {
        return '<div class="bBlocksPostMeta" style="text-align:' . $contentAlign . '; font-size:' . $metaFontSize . 'px; text-transform: ' . $metaTransform . '; color: ' . $metaTextColor . '; margin: 0 0 ' . $metaMB . 'px 0">
            ' . APBlockSMetaAuthor( $attributes, $post )
        . APBlockSMetaDate( $attributes, $post )
        . APBlockSMetaCategory( $attributes, $post )
        . APBlockSMetaComment( $attributes, $post ) . '
        </div>';
    } else {
        return '';
    }
}

function APBlockSMetaAuthor( $attributes, $post ) {
    extract( $attributes );
    $isMetaAuthor ?? $isMetaAuthor = 'true';
    $metaLinkColor ?? $metaLinkColor = '#8344c5';
    $metaIconColor ?? $metaIconColor = '#4527a4';

    if ( 'true' == $isMetaAuthor ) {
        return '<span>
            <span class="dashicons dashicons-admin-users" style="color: ' . $metaIconColor . ';"></span>&nbsp;
            <span style="color: ' . $metaLinkColor . ';">' . get_the_author_posts_link( $post->ID ) . '</span>
        </span>';
    } else {
        return '';
    }
}
function APBlockSMetaDate( $attributes, $post ) {
    extract( $attributes );
    $isMetaDate ?? $isMetaDate = 'true';
    $metaTextColor ?? $metaTextColor = '#333';
    $metaIconColor ?? $metaIconColor = '#4527a4';

    if ( 'true' == $isMetaDate ) {
        return '<span>
            <span class="dashicons dashicons-calendar" style="color: ' . $metaIconColor . ';"></span>&nbsp;
            <span style="color: ' . $metaTextColor . ';">' . get_the_date( 'M j, Y', $post->ID ) . '</span>
        </span>';
    } else {
        return '';
    }
}
function APBlockSMetaCategory( $attributes, $post ) {
    extract( $attributes );
    $isMetaCategory ?? $isMetaCategory = 'true';
    $metaCategoryIn ?? $metaCategoryIn = 'content';
    $metaLinkColor ?? $metaLinkColor = '#8344c5';
    $metaIconColor ?? $metaIconColor = '#4527a4';

    if ( 'true' == $isMetaCategory && 'content' == $metaCategoryIn ) {
        return '<span>
            <span class="dashicons dashicons-category" style="color: ' . $metaIconColor . ';"></span>&nbsp;
            <span style="color: ' . $metaLinkColor . ';">' . get_the_category_list( esc_html__( ', ' ), '', $post->ID ) . '</span>
        </span>';
    } else {
        return '';
    }
}
function APBlockSMetaComment( $attributes, $post ) {
    extract( $attributes );
    $isMetaComment ?? $isMetaComment = 'false';
    $metaLinkColor ?? $metaLinkColor = '#8344c5';
    $metaIconColor ?? $metaIconColor = '#4527a4';

    if ( 'true' == $isMetaComment ) {
        $comment_count = get_comments( array( 'post_id' => $post->ID, 'count' => true ) );
        return '<span>
            <span class="dashicons dashicons-admin-comments" style="color: ' . $metaIconColor . ';"></span>&nbsp;
            <a href="' . get_post_permalink( $post->ID ) . '/#comments" target="_blank" style="color: ' . $metaLinkColor . ';">' . wp_count_comments( $post->ID )->total_comments . '</a>
        </span>';
    } else {
        return '';
    }
}

// Excerpt
function APBlockSExcerpt( $attributes, $post ) {
    extract( $attributes );
    $isExcerpt ?? $isExcerpt = 'true';
    $excerptLength ?? $excerptLength = 25;
    $excerptAlign ?? $excerptAlign = 'justify';
    $excerptColor ?? $excerptColor = '#333';
    $excerptMB ?? $excerptMB = 15;

    if ( 'true' == $isExcerpt ) {
        return '<div class="bBlocksPostExcerpt b_blocks_inner_content" style="text-align:' . $excerptAlign . '; color: ' . $excerptColor . '; margin: 0 0 ' . $excerptMB . 'px 0"">' . implode( ' ', array_slice( explode( ' ', get_post_field( 'post_content', $post->ID ) ), 0, $excerptLength ) ) . '</div>';
    } else {
        return '';
    }
}

// Read More
function APBlockSReadMore( $attributes, $post ) {
    extract( $attributes );
    $isReadMore ?? $isReadMore = 'true';
    $readMoreLabel ?? $readMoreLabel = 'Read More';
    $isLinkNewTab ?? $isLinkNewTab = 'false';
    $readMoreAlign ?? $readMoreAlign = 'left';
    $readMoreFontSize ?? $readMoreFontSize = 14;
    $readMoreTransform ?? $readMoreTransform = 'uppercase';
    $readMoreFontWeight ?? $readMoreFontWeight = '600';
    $readMoreColor ?? $readMoreColor = '#4527a4';
    $readMoreHovColor ?? $readMoreHovColor = '#8344c5';

    if ( 'true' == $isReadMore ) {
        $tab = 'true' == $isLinkNewTab ? '_blank' : '_self';

        return '<div class="bBlocksPostReadMore" style="text-align: ' . $readMoreAlign . ';">
            <a href="' . get_post_permalink( $post->ID ) . '" target="' . $tab . '"
            style="display: inline-block; font-size:' . $readMoreFontSize . 'px; text-transform: ' . $readMoreTransform . '; font-weight: ' . $readMoreFontWeight . '; color: ' . $readMoreColor . '; transition: all .3s ease;"

            onMouseOver="this.style.color=\'' . $readMoreHovColor . '\';"
            onMouseOut="this.style.color=\'' . $readMoreColor . '\';">' . $readMoreLabel . '</a>
        </div>';
    } else {
        return '';
    }
}