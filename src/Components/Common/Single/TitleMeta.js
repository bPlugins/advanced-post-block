import { Fragment } from 'react';
import Meta from './Meta';
import Title from './Title';
import Excerpt from './Excerpt';

const TitleMeta = ({ post, attributes }) => {
	const { subLayout } = attributes;

	const isShowExcerpt = !['title-meta', 'overlay-box', 'overlay-half-content'].includes(subLayout);

	return <>
		<Title post={post} attributes={attributes} />
		<Meta post={post} attributes={attributes} />
		{isShowExcerpt ? <Excerpt post={post} attributes={attributes} /> : null}
	</>
}
export default TitleMeta;