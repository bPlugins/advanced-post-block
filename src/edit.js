import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { useState, useEffect, createContext, useRef } from '@wordpress/element';
import { Spinner } from '@wordpress/components';

// Components
import Default from './Layout/Default';
import SideImage from './Layout/SideImage';
import Overlay from './Layout/Overlay';
import func from './Const/functions';
const { mediaUrl } = func;

const $ = jQuery;

import Settings from './settings';

export const ExcerptLengthCtx = createContext();

const Edit = props => {
    const { attributes, setAttributes, className, clientId, getPostTypes, posts, categories, isEditorSidebarOpened } = props;

    const { align, layout, columns, columnGap, rowGap, isContentEqualHight, sliderHeight, contentAlign, contentBG, contentPadding, border, sliderIsLoop, sliderIsTouchMove, sliderIsAutoplay, sliderSpeed, sliderEffect, sliderIsPage, sliderIsPageClickable, sliderIsPageDynamic, sliderPageColor, sliderPageWidth, sliderPageHeight, sliderPageBorder, sliderIsPrevNext, sliderPrevNextColor, isFImg, isTitleLink, titleTypo, titleColor, titleMargin, metaTypo, metaTextColor, metaLinkColor, metaIconColor, metaColorsOnImage, metaMargin, excerptAlign, excerptTypo, excerptColor, excerptMargin, readMoreAlign, readMoreTypo, readMoreColors, readMoreHovColors, readMorePadding, readMoreBorder } = attributes;

    // Posts and Categories Check
    if (!posts || !categories) {
        return <h3 className='apbLoading'><Spinner /> {__('Loading...', 'advanced-post-block')}</h3>;
    }

    useEffect(() => { clientId && setAttributes({ cId: clientId }); }, [clientId]); // Set & Update clientId to cId
    const sliderRef = useRef(null);
    const sliderWrapperRef = useRef(null);
    const tickerRef = useRef(null);
    const tickerWrapperRef = useRef(null);

    // Components
    const noPosts = () => <h3 className='apbNoPosts'>{__('No posts found!! Please add some posts', 'advanced-post-block')}</h3>;

    const currentBlock = document.querySelector(`#block-${clientId} .wp-block`);
    useEffect(() => {
        // Slider Posts
        if ('slider' === layout) {
            const currentSlider = document.querySelector(`#apbAdvancedPosts-${clientId} .apbSliderWrapper .apbSliderPosts`);

            const currentAll = currentSlider && currentBlock;

            currentAll ? currentBlock.style.display = 'block' : 'initial';
            align === 'full' && currentAll ? currentBlock.style.maxWidth = 'none' : '';
            align === 'wide' && currentAll ? currentBlock.style.maxWidth = 'none' : '';
            align === 'center' && currentAll ? currentBlock.style.maxWidth = '' : '';

            currentAll && isEditorSidebarOpened ? currentBlock.style.display = 'grid' : '';

            currentAll ? currentSlider.style.width = `${currentBlock.clientWidth}px` : '';

            // Re init slider
            sliderWrapperRef.current.innerHTML = '';
            sliderWrapperRef.current.innerHTML = sliderRef.current.outerHTML;

            new Swiper(`#apbAdvancedPosts-${clientId} .apbSliderWrapper .apbSliderPosts`, {
                // Optional parameters
                direction: 'horizontal',
                slidesPerView: columns?.mobile,
                breakpoints: {
                    // when window width is >= 576px
                    576: { slidesPerView: columns?.tablet },
                    // when window width is >= 768px
                    768: { slidesPerView: columns?.desktop },
                },
                spaceBetween: columnGap,
                loop: sliderIsLoop,
                allowTouchMove: sliderIsTouchMove,
                grabCursor: sliderIsTouchMove,
                autoplay: sliderIsAutoplay ? { delay: sliderSpeed * 1000 } : false,
                speed: sliderSpeed * 1000,
                effect: sliderEffect,
                fadeEffect: { crossFade: true },
                creativeEffect: {
                    prev: {
                        shadow: true,
                        translate: ['-120%', 0, -500],
                    },
                    next: {
                        shadow: true,
                        translate: ['120%', 0, -500],
                    }
                },
                allowSlideNext: true,
                allowSlidePrev: true,
                notificationClass: null,

                // Controllers
                pagination: {
                    el: '.swiper-pagination',
                    clickable: sliderIsPageClickable,
                    dynamicBullets: sliderIsPageDynamic
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });
        }

        let seen = {};
        $(`#apbAdvancedPosts-${clientId} .swiper-notification`).each(function () {
            let txt = $(this).attr('class');
            if (seen[txt])
                $(this).remove();
            else
                seen[txt] = true;
        });

        // Slider Height
        const slideHeightArray = [];
        const swiperSlide = document.querySelectorAll(`#apbAdvancedPosts-${clientId} .apbSliderPosts .swiper-slide`);
        const swiperSlideText = document.querySelectorAll(`#apbAdvancedPosts-${clientId} .apbSliderPosts .swiper-slide .apbPostText`);
        swiperSlideText.length && swiperSlideText.forEach(slideText => {
            slideHeightArray.push(slideText?.clientHeight);
        });
        swiperSlide.length && swiperSlide.forEach(slide => {
            slide.style.height = `${Math.max(...slideHeightArray)}px`;
        });

        // Ticker Posts
        if ('ticker' === layout) {
            // Re init ticker
            tickerWrapperRef.current.innerHTML = '';
            tickerWrapperRef.current.innerHTML = tickerRef.current.outerHTML;

            $(`#apbAdvancedPosts-${clientId} .apbTickerWrapper .apbTickerPosts`).easyTicker({
                direction: 'up',
                easing: 'swing',
                speed: 'slow',
                interval: 2000,
                height: 'auto',
                visible: 3,
                gap: rowGap,
                mousePause: true
            });
        }
    }, [attributes, posts]);

    // Set excerpt length
    const [maxExcerptLength, setMaxExcerptLength] = useState(50);
    useEffect(() => {
        const allMaxExcerptLength = [];
        posts.map(post => {
            allMaxExcerptLength.push(post?.excerpt?.rendered.replace(/(<p class='?"?read-more'?"?(.*?)<\/p>)/g, '').trim().split(' ').length);

            setMaxExcerptLength(Math.max(...allMaxExcerptLength));
        });
    }, [posts]);

    return <>
        <ExcerptLengthCtx.Provider value={maxExcerptLength}>
            <Settings attributes={attributes} setAttributes={setAttributes} posts={posts} getPostTypes={getPostTypes} categories={categories} />
        </ExcerptLengthCtx.Provider>

        {posts && 0 !== posts.length ? <div className={`${className} apbAdvancedPosts`} id={`apbAdvancedPosts-${clientId}`}>
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url(${titleTypo?.googleFontLink || 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'}); @import url(${metaTypo?.googleFontLink}); @import url(${excerptTypo?.googleFontLink}); @import url(${readMoreTypo?.googleFontLink});
                
                #apbAdvancedPosts-${clientId} .apbPost{
                    margin-bottom: ${'masonry' === layout ? `${rowGap}px` : '0px'};
                    ${border?.styles || 'border: 1px solid #4527a400; border-radius: 5px;'}
                }
                #apbAdvancedPosts-${clientId} .apbPostDefault, #apbAdvancedPosts-${clientId} .apbPostSideImage{
                    text-align: ${contentAlign};
                    ${contentBG?.styles || 'background-color: #f4f2fc;'}
                }

                #apbAdvancedPosts-${clientId} .apbPost .apbPostText{ padding: ${contentPadding?.styles || '20px 25px'}; }
                #apbAdvancedPosts-${clientId} .apbPostOverlay .apbPostText{
                    ${contentBG?.styles || 'background-color: #f4f2fc;'}
                    align-items: ${'left' === contentAlign ? 'flex-start' : 'right' === contentAlign ? 'flex-end' : 'center' === contentAlign ? 'center' : ''}
                }

                #apbAdvancedPosts-${clientId} .apbPost .apbPostTitle{
                    text-align: ${contentAlign};
                    ${!isTitleLink ? titleTypo?.styles || 'font-family: Roboto, sans-serif; font-size: 25px;' : ''}
                    color: ${titleColor};
                    margin: ${titleMargin?.styles || '0 0 15px 0'};
                }
                #apbAdvancedPosts-${clientId} .apbPost .apbPostTitle a{
                    ${titleTypo?.styles || 'font-family: Roboto, sans-serif; font-size: 25px;'}
                    color: ${titleColor};
                }
                #apbAdvancedPosts-${clientId} .apbPost .apbPostMeta{
                    text-align: ${contentAlign};
                    ${metaTypo?.styles || 'font-size: 13px; text-transform: uppercase;'}
                    color: ${metaTextColor};
                    margin: ${metaMargin?.styles || '0 0 15px 0'};
                }
                #apbAdvancedPosts-${clientId} .apbPost .apbPostMeta a{ color: ${metaLinkColor}; }
                #apbAdvancedPosts-${clientId} .apbPost .apbPostMeta .dashicons{ color: ${metaIconColor}; }
                #apbAdvancedPosts-${clientId} .apbPost .apbPostFImgCats{ ${metaTypo?.styles || 'font-size: 13px; text-transform: uppercase;'} }
                #apbAdvancedPosts-${clientId} .apbPost .apbPostFImgCats a{ ${metaColorsOnImage?.styles || 'color: #fff; background: #4527a4;'} }
                #apbAdvancedPosts-${clientId} .apbPost .apbPostExcerpt{
                    text-align: ${excerptAlign};
                    ${excerptTypo?.styles || 'font-size: 15px;'}
                    color: ${excerptColor};
                    margin: ${excerptMargin?.styles || '0 0 10px 0'};
                }
                #apbAdvancedPosts-${clientId} .apbPost .apbPostReadMore{ text-align: ${readMoreAlign}; }
                #apbAdvancedPosts-${clientId} .apbPost .apbPostReadMore a{
                    ${readMoreTypo?.styles || 'font-size: 14px; text-transform: uppercase; font-weight: 600;'}
                    ${readMoreColors?.styles || 'color: #fff; background: #8344c5;'}
                    padding: ${readMorePadding?.styles || '12px 35px'};
                    ${readMoreBorder?.styles || 'border-radius: 3px;'}
                }
                #apbAdvancedPosts-${clientId} .apbPost .apbPostReadMore a:hover{ ${readMoreHovColors?.styles || 'color: #fff; background: #4527a4;'} }

                #apbAdvancedPosts-${clientId} .apbGridPosts{
                    grid-gap: ${rowGap}px ${columnGap}px;
                    align-items: ${false === isContentEqualHight ? 'start' : 'initial'};
                }
                #apbAdvancedPosts-${clientId} .apbMasonryPosts{ gap: ${columnGap}px; }
                #apbAdvancedPosts-${clientId} .apbSliderPosts, #apbAdvancedPosts-${clientId} .apbSliderPosts .swiper-slide{ min-height: ${sliderHeight}; }
                #apbAdvancedPosts-${clientId} .apbSliderPosts .swiper-pagination .swiper-pagination-bullet{
                    background: ${sliderPageColor};
                    width: ${sliderPageWidth};
                    height: ${sliderPageHeight};
                    ${sliderPageBorder?.styles || 'border-radius: 50%;'}
                }
                #apbAdvancedPosts-${clientId} .apbSliderPosts .swiper-button-prev, #apbAdvancedPosts-${clientId} .apbSliderPosts .swiper-button-next{ color: ${sliderPrevNextColor}; }
            `}} />
            <style>
                {posts.map(post => {
                    const { id, featured_media } = post;
                    const fImgUrl = mediaUrl(featured_media);

                    const sideImgCSS = `#apbAdvancedPosts-${clientId} .apbPostSideImage.apbPost-${id}{ display: ${fImgUrl ? 'grid' : 'flex'}; }`;
                    const fImgCSS = isFImg && fImgUrl ? `#apbAdvancedPosts-${clientId} .apbPostOverlay.apbPost-${id}, #apbAdvancedPosts-${clientId} .apbPost .apbPostFImg-${id}{ background-image: url(${fImgUrl}); }` : '';

                    return sideImgCSS + fImgCSS;
                })}
            </style>

            {'grid' === layout ? <div className={`apbGridPosts columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile}`}>
                <MapPosts attributes={{ clientId, ...attributes }} posts={posts} />
            </div> /* Grid Layout */ :

                'masonry' === layout ? <div className={`apbMasonryPosts cols-${columns.desktop} cols-tablet-${columns.tablet} cols-mobile-${columns.mobile}`}>
                    <MapPosts attributes={{ clientId, ...attributes }} posts={posts} />
                </div> /* Masonry Layout */ :

                    'slider' === layout ? <>
                        <div className='apbSliderWrapper' ref={sliderWrapperRef}></div>
                        <div className='apbSliderPosts' ref={sliderRef}>
                            <div className='swiper-wrapper'>
                                <MapPosts attributes={{ clientId, ...attributes }} posts={posts} />
                            </div>

                            {sliderIsPage && <div className='swiper-pagination'></div>}

                            {sliderIsPrevNext && <>
                                <div className='swiper-button-prev'></div><div className='swiper-button-next'></div>
                            </>}
                        </div>
                    </>/* Slider Layout */ :
                        'ticker' === layout && <>
                            <div className='apbTickerWrapper' ref={tickerWrapperRef}></div>
                            <div className='apbTickerPosts' ref={tickerRef}>
                                <div>
                                    <MapPosts attributes={{ clientId, ...attributes }} posts={posts} />
                                </div>
                            </div>
                        </>/* Ticker Layout */
            }
        </div> : noPosts()}
    </>
}
export default withSelect((select, props) => {
    const { postType, selectedCategories, isPostsPerPageAll, postsPerPage, postsOrderBy, postsOrder } = props.attributes;

    const query = {
        categories: selectedCategories,
        per_page: isPostsPerPageAll ? -1 : postsPerPage, // -1 to display all
        orderby: postsOrderBy,
        order: postsOrder,
    }

    return {
        getPostTypes: select('core').getPostTypes({ per_page: -1 })?.filter(p => 'page' !== p.slug && 'attachment' !== p.slug && 'wp_block' !== p.slug && 'wp_template' !== p.slug)?.map(p => {
            return { label: p.name, value: p.slug }
        }),
        posts: select('core').getEntityRecords('postType', postType, query),
        categories: select('core').getEntityRecords('taxonomy', 'category', { post_type: postType, per_page: -1 }),
        media: id => select('core').getMedia(id),
        authors: select('core').getAuthors(),
        isEditorSidebarOpened: select('core/edit-post').isEditorSidebarOpened()
    };
})(Edit);


const MapPosts = ({ attributes, posts }) => {
    const { subLayout } = attributes;

    return posts.map(post => (
        'default' === subLayout || 'title-meta' === subLayout ? <Default atts={attributes} post={post} /> : 'left-image' === subLayout || 'right-image' === subLayout ? <SideImage atts={attributes} post={post} /> : 'overlay-content' === subLayout || 'overlay-content-hover' === subLayout || 'overlay-box' === subLayout ? <Overlay atts={attributes} post={post} /> : <p>{__('Please, select a sub layout', 'advanced-post-block')}</p>
    ));
}