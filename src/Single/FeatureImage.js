// Functions
import func from '../Const/functions';
const { renderHTML, mediaUrl } = func;

const FeatureImage = props => {
    const { atts: { layout, isFImg, isFImgLink, isMeta, isMetaCategory, metaCategoryIn, isLinkNewTab }, post: { id, link, wbCategories, featured_media } } = props;

    const condition = 'slider' === layout ? isFImg : isFImg && mediaUrl(featured_media);

    return condition ? <figure className={`apbPostFImg apbPostFImg-${id}`}>
        {mediaUrl(featured_media) && <>
            {isFImgLink ? <a href={link} target={isLinkNewTab ? '_blank' : '_self'} rel='noreferrer'></a> : ''}

            {isMeta && isMetaCategory && 'image' === metaCategoryIn && wbCategories ? <div className='apbPostFImgCats'>
                {renderHTML(wbCategories.space)}
            </div> : null}
        </>}
    </figure> : null;
};
export default FeatureImage;

// Categories in Images
// {isMetaCategory && 0 !== cats.length && 0 !== categories.length ? <div className='apbPostFImgCats'>
//     {categories.map(id => {
//         for (let key in cats) {
//             if (cats[key].id === id)
//                 return <a href={cats[key].link} target='_blank' rel='noreferrer'>{cats[key].name}</a>;
//         }
//     })}
// </div> : null}