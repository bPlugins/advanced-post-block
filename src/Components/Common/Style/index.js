import { prefix } from '../../../utils/data';

import Base from './Base';
import Typography from './Typography';
import Title from './Title';
import Meta from './Meta';
import Image from './Image';
import CategoryBadge from './CategoryBadge';
import Excerpt from './Excerpt';
import ReadMore from './ReadMore';

import Grid from './Layouts/Grid';
import Slider from './Layouts/Slider';
import Accordion from './Layouts/Accordion';

const Style = ({ attributes, id }) => {
	const { contentAlign } = attributes;
	const contentFlexAlign = 'left' === contentAlign ? 'flex-start' : 'right' === contentAlign ? 'flex-end' : 'center' === contentAlign ? 'center' : 'flex-start';

	const mainSl = `#${id}`;
	const newsTickerSl = `${mainSl} .${prefix}NewsTicker`;
	const postSl = `${mainSl} .${prefix}Post`;
	const sliderPostsSl = `${mainSl} .${prefix}SliderPosts`;
	const postReadMoreSl = `${postSl} .${prefix}ReadMore`;
	const postTitleSl = `${postSl} .${prefix}Title`;
	const postMetaSl = `${postSl} .${prefix}Meta`;

	const props = {
		attributes,
		prefix,
		mainSl,
		newsTickerSl,
		postSl,
		sliderPostsSl,
		postReadMoreSl,
		postTitleSl,
		postMetaSl,
		contentFlexAlign
	};

	return <style dangerouslySetInnerHTML={{
		__html: `
			${Typography(props)}
			${Base(props)}
			${Title(props)}
			${Meta(props)}
			${Image(props)}
			${CategoryBadge(props)}
			${Excerpt(props)}
			${ReadMore(props)}
			${Grid(props)}
			${Slider(props)}
			${Accordion(props)}
		`.replace(/\s+/g, ' ')
	}} />
}
export default Style;
