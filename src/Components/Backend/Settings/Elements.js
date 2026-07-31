import Sorting from './Elements/Sorting';
import FeatureImage from './Elements/FeatureImage';
import Title from './Elements/Title';
import MetaData from './Elements/MetaData';
import Excerpt from './Elements/Excerpt';
import ReadMore from './Elements/ReadMore';

const Elements = (props) => {
	const { attributes } = props;
	const { layout, isTitle, isMeta, isExcerpt } = attributes;
	const isNewsTicker = 'newsTicker' === layout;
	const isAccordion = 'accordion' === layout;

	return <>
		{(isTitle || isMeta || isExcerpt) && !isNewsTicker && <Sorting />}
		{!isNewsTicker && !isAccordion && <FeatureImage {...props} />}
		<Title {...props} />
		{!isNewsTicker && <MetaData {...props} />}
		{!isNewsTicker && <Excerpt {...props} />}
		{!isNewsTicker && <ReadMore {...props} />}
	</>
}
export default Elements;