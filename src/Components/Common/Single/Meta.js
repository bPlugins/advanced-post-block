import { Fragment } from 'react';

import PostMetaAuthor from './MetaAuthor';
import PostMetaDate from './MetaDate';
import PostMetaCategory from './MetaCategory';
import PostMetaReadTime from './MetaReadTime';
import PostMetaComment from './MetaComment';
import PostMetaViewCount from './MetaViewCount';
import { prefix } from '../../../utils/data';

const Meta = ({ post, attributes }) => {
	const { isMeta, isMetaAuthor, isMetaDate, isMetaCategory, metaCategoryIn, isMetaReadTime, isMetaComment, meta = {} } = attributes;
	const { sorting = ['author', 'date', 'category', 'readTime', 'comment', 'viewCount', 'taxonomy'], separator = '', gap = '10px' } = meta;

	const componentMap = (separatorEl) => ({
		author: <PostMetaAuthor {...{ post, attributes, separatorEl }} />,
		date: <PostMetaDate {...{ post, attributes, separatorEl }} />,
		category: <PostMetaCategory {...{ post, attributes, separatorEl }} />,
		readTime: <PostMetaReadTime {...{ post, attributes, separatorEl }} />,
		comment: <PostMetaComment {...{ post, attributes, separatorEl }} />,
		viewCount: <PostMetaViewCount {...{ post, attributes, separatorEl }} />
	});

	// Custom taxonomies are premium-only, so that sorting key is dropped here rather
	// than rendered — the saved order still round-trips.
	const visibleMetaElements = sorting.filter(key => {
		if (key === 'author') return isMetaAuthor;
		if (key === 'date') return isMetaDate;
		if (key === 'category') return isMetaCategory && !['image', 'aboveContent'].includes(metaCategoryIn);
		if (key === 'readTime') return isMetaReadTime;
		if (key === 'comment') return isMetaComment;
		if (key === 'viewCount') return meta.viewCount?.isVisible;

		return false;
	});

	if (!isMeta || visibleMetaElements.length === 0) return null;

	const isShowSeparator = separator && visibleMetaElements.length > 1;

	const separatorEl = (index) => (index && separator) ? <span className='metaSeparator'>{separator}</span> : null;

	return <div className={`${prefix}Meta`} style={{ columnGap: `${isShowSeparator ? `calc(${gap} / 2)` : gap}` }}>
		{visibleMetaElements.map((key, index) => <Fragment key={key}>
			{componentMap(separatorEl(index))[key]}
		</Fragment>)}
	</div>;
};
export default Meta;
