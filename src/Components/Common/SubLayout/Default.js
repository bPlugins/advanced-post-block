import FeatureImage from '../Single/FeatureImage';
import TitleMeta from '../Single/TitleMeta';
import MetaCategoryBadge from '../Single/MetaCategoryBadge';
import ReadMore from '../Single/ReadMore';
import { classNames } from '../../../utils/functions';
import { prefix } from '../../../utils/data';

const Default = ({ post, attributes, postClass }) => {
	const { subLayout } = attributes;

	const className = classNames(postClass, `${prefix}Default`);

	return <article className={className}>
		<FeatureImage post={post} attributes={attributes} />

		<div className={`${prefix}Text`}>
			<MetaCategoryBadge post={post} attributes={attributes} location='aboveContent' />

			<TitleMeta post={post} attributes={attributes} />

			{'title-meta' !== subLayout && <>
				<ReadMore post={post} attributes={attributes} />
			</>}
		</div>
	</article>;
};
export default Default;