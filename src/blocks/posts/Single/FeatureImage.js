import { useEffect } from '@wordpress/element';

// Functions
import func from '../../../Const/functions';
const { renderHTML } = func;

const FeatureImage = props => {
    const { atts: { layout, subLayout, columns, columnGap, rowGap, isFImg, isFImgLink, isMetaCategory, metaCategoryIn, metaFontSize, metaTransform, isLinkNewTab }, post: { link, wbImage, wbCategories } } = props;

    // const [img, setImg] = useState({});
    // const [cats, setCats] = useState({});

    // featured_media && useEffect(() => {
    //     fetch(`${bBlocksAdmin.siteUrl}/wp-json/wp/v2/media/${featured_media}`).then(res => res.json()).then(data => {
    //         setImg(data);
    //     });
    // }, [featured_media]);

    // categories && useEffect(() => {
    //     fetch(`${bBlocksAdmin.siteUrl}/wp-json/wp/v2/categories`).then(res => res.json()).then(data => {
    //         setCats(data);
    //     });
    // }, [categories]);

    useEffect(() => {
        const fImag = document.querySelectorAll('.bBlocksPostArticleDefault .bBlocksPostFImg');
        fImag.length && fImag.forEach(im => {
            im ? im.style.minHeight = `${im.clientWidth * .6}px` : null;
        });
    }, [layout, subLayout, columns, columnGap, rowGap]);

    return (
        'true' === isFImg && wbImage ? <figure className='bBlocksPostFImg' style={{ backgroundImage: `url(${wbImage.full[0]})`, margin: 0 }}>
            {'true' === isFImgLink ? <a href={link} target={'true' === isLinkNewTab ? '_blank' : '_self'} rel='noreferrer'></a> : ''}

            {/* {'true' === isMetaCategory && 0 !== cats.length && 0 !== categories.length ? <div className='bBlocksPostFImgCats'>
                {categories.map(id => {
                    for (let key in cats) {
                        if (cats[key].id == id)
                            return <a href={cats[key].link} target='_blank' rel='noreferrer'>{cats[key].name}</a>;
                    }
                })}
            </div> : null} */}

            {'true' === isMetaCategory && 'image' == metaCategoryIn && wbCategories ? <div className='bBlocksPostFImgCats' style={{ fontSize: `${metaFontSize}px`, textTransform: metaTransform }}>
                {renderHTML(wbCategories.space)}
            </div> : null}
        </figure> : null
    );
};
export default FeatureImage;