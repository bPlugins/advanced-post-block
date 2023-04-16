import { renderHTML } from '../utils/functions';

const FeatureImage = ({ post, attributes }) => {
	const { id, link, thumbnail, categories } = post;
	const { layout, isFImg, isFImgLink, isMeta, isMetaCategory, metaCategoryIn, isLinkNewTab } = attributes;

	const condition = 'slider' === layout ? isFImg : isFImg && thumbnail;

	return condition ? <figure className={`apbPostFImg apbPostFImg-${id}`}>
		{thumbnail && <>
			{isFImgLink && <a href={link} target={isLinkNewTab ? '_blank' : '_self'} rel='noreferrer'></a>}

			{(isMeta && isMetaCategory && 'image' === metaCategoryIn) && <div className='apbPostFImgCats'>
				{renderHTML(categories.space)}
			</div>}
		</>}
	</figure> : null;
};
export default FeatureImage;

// Categories in Images
// {isMetaCategory && 0 !== cats.length && 0 !== categories.length ? <div className='apbPostFImgCats'>
// 	{categories.map(id => {
// 		for (let key in cats) {
// 			if (cats[key].id === id)
// 				return <a href={cats[key].link} target='_blank' rel='noreferrer'>{cats[key].name}</a>;
// 		}
// 	})}
// </div> : null}