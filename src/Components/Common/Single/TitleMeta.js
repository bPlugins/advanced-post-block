import { Fragment } from 'react';
import Meta from './Meta';
import Title from './Title';
import Excerpt from './Excerpt';

const TitleMeta = ({ post, attributes }) => {
	const { elementsSort = ['title', 'meta', 'excerpt'], subLayout } = attributes;

	const allPossible = ['title', 'meta', 'excerpt'];
	const finalSortingIds = [];
	elementsSort.forEach(id => {
		if (allPossible.includes(id) && !finalSortingIds.includes(id)) {
			finalSortingIds.push(id);
		}
	});
	allPossible.forEach(id => {
		if (!finalSortingIds.includes(id)) finalSortingIds.push(id);
	});

	const isShowExcerpt = !['title-meta', 'overlay-box', 'overlay-half-content'].includes(subLayout);

	const componentMap = {
		title: <Title post={post} attributes={attributes} />,
		meta: <Meta post={post} attributes={attributes} />,
		excerpt: isShowExcerpt ? <Excerpt post={post} attributes={attributes} /> : null
	};

	return finalSortingIds.map((key, index) => <Fragment key={index}>{componentMap[key]}</Fragment>);
}
export default TitleMeta;