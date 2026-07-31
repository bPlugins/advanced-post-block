import Article from './Style/Article';
import Content from './Style/Content';
import FeatureImage from './Style/FeatureImage';
import SliderOptions from './Style/SliderOptions';
import AccordionOptions from './Style/AccordionOptions';
import Title from './Style/Title';
import MetaData from './Style/MetaData';
import Excerpt from './Style/Excerpt';
import ReadMore from './Style/ReadMore';

const Style = (props) => {
	const { attributes } = props;
	const { layout } = attributes;

	const isNewsTicker = 'newsTicker' === layout;
	const isAccordion = 'accordion' === layout;

	return <>
		<Article {...props} />

		<Content {...props} />

		{!isNewsTicker && !isAccordion && <FeatureImage {...props} />}

		<SliderOptions {...props} />

		<AccordionOptions {...props} />

		<Title {...props} />

		{!isNewsTicker && <MetaData {...props} />}

		{!isNewsTicker && <Excerpt {...props} />}

		{!isNewsTicker && <ReadMore {...props} />}
	</>
}
export default Style;