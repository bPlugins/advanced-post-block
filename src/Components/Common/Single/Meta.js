import PostMetaAuthor from './MetaAuthor';
import PostMetaDate from './MetaDate';
import PostMetaCategory from './MetaCategory';
import PostMetaComment from './MetaComment';
import { prefix } from '../../../utils/data';

const Meta = ({ post, attributes }) => {
	const { isMeta } = attributes;

	if (!isMeta) return null;

	return <div className={`${prefix}Meta`}>
		<PostMetaAuthor {...{ post, attributes }} />
		<PostMetaDate {...{ post, attributes }} />
		<PostMetaCategory {...{ post, attributes }} />
		<PostMetaComment {...{ post, attributes }} />
	</div>;
};
export default Meta;