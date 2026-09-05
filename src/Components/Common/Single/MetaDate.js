import { getTimeAgo } from '../../../utils/functions';

import MetaImage from './MetaImage';

const PostMetaDate = ({ post, attributes, separatorEl }) => {
	const { date: postDate, dateGMT } = post;

	const { isMetaDate, meta = {} } = attributes;
	const { date = {} } = meta || {};
	const { timeAgo = false } = date || {};

	const displayDate = timeAgo ? getTimeAgo(dateGMT || postDate) : postDate;

	return (isMetaDate && postDate) ? <>
		{separatorEl}
		<span className='metaItem'>
			<MetaImage item='date' />

			<span>{displayDate}</span>
		</span>
	</> : null;
};
export default PostMetaDate;