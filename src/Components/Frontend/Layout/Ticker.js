import { useEffect } from 'react';
const $ = jQuery;

import SubLayout from '../../Common/SubLayout/SubLayout';
import { tickerConfig } from '../../../utils/configs';
import { prefix } from '../../../utils/data';

const Ticker = ({ posts, attributes, id }) => {
	const tickerSl = `#${id} .${prefix}TickerPosts`;

	useEffect(() => {
		if (posts?.length) {
			$(tickerSl).easyTicker(tickerConfig(attributes));
		}
	}, [posts?.length]);

	return <div className={`${prefix}TickerPosts`}>
		<div>
			{posts.map(post => <SubLayout key={post.id} {...{ post, attributes }} />)}
		</div>
	</div>;
}
export default Ticker;