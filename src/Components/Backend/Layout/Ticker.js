import { useEffect, useRef } from 'react';
const $ = jQuery;

import SubLayout from '../../Common/SubLayout/SubLayout';
import { tickerConfig } from '../../../utils/configs';
import { prefix } from '../../../utils/data';

const Ticker = ({ posts, attributes, id }) => {
	const { subLayout, rowGap } = attributes;

	const tickerRef = useRef(null);
	const tickerWrapperRef = useRef(null);

	const mainSl = `#${id}`;

	useEffect(() => {
		const tickerWrapEl = tickerWrapperRef.current;
		if (tickerWrapEl) {
			// Re init ticker
			tickerWrapEl.innerHTML = '';
			tickerWrapEl.innerHTML = tickerRef.current.outerHTML;

			$(`${mainSl} .${prefix}TickerWrapper .${prefix}TickerPosts`).easyTicker(tickerConfig(attributes));
		}
	}, [subLayout, rowGap]);

	return <>
		<div className={`${prefix}TickerWrapper`} ref={tickerWrapperRef}></div>
		<div className={`${prefix}TickerPosts`} ref={tickerRef}>
			<div>
				{posts.map(post => <SubLayout key={post.id} {...{ post, attributes }} />)}
			</div>
		</div>
	</>;
}
export default Ticker;