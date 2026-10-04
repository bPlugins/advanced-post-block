import { __, sprintf } from '@wordpress/i18n';
import MetaImage from './MetaImage';

const MetaComment = ({ post, attributes, separatorEl }) => {
	const { link, title, commentCount, commentStatus } = post;

	const { isMetaComment } = attributes;

	return (isMetaComment && 'open' === commentStatus) ? <>
		{separatorEl}
		<span className='metaItem'>
			<MetaImage item='comment' />

			<a href={`${link}/#comments`} target='_blank' rel='noreferrer' aria-label={sprintf( /* translators: %s: Post title. */ __('Comments of %s', 'advanced-post-block'), title)}>{commentCount}</a>
		</span>
	</> : null;
};
export default MetaComment;