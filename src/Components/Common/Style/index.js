import { prefix } from '../../../utils/data';

import Base from './Base';
import Typography from './Typography';
import Title from './Title';
import Meta from './Meta';
import Image from './Image';
import CategoryBadge from './CategoryBadge';
import Excerpt from './Excerpt';
import ReadMore from './ReadMore';
import Pagination from './Pagination';

import Grid from './Layouts/Grid';
import Slider from './Layouts/Slider';
import Magazine from './Layouts/Magazine';
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
	const loadMoreSl = `${mainSl} .${prefix}LoadMore`;

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
		loadMoreSl,
		contentFlexAlign
	};

	return <style dangerouslySetInnerHTML={{
		__html: `
			${Typography(props)}
			${Pagination(props)}
			${Base(props)}
			${Title(props)}
			${Meta(props)}
			${Image(props)}
			${CategoryBadge(props)}
			${Excerpt(props)}
			${ReadMore(props)}
			${Grid(props)}
			${Slider(props)}
			${Magazine(props)}
			${Accordion(props)}
		`.replace(/\s+/g, ' ')
	}} />
}
export default Style;
