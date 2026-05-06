import { useEffect, useRef } from 'react';
const $ = jQuery;

import SubLayout from '../../Common/SubLayout/SubLayout';
import { tickerConfig } from '../../../utils/configs';
import { prefix } from '../../../utils/data';

const Ticker = ({ posts, attributes }) => {
	const { subLayout, rowGap } = attributes;

	const tickerRef = useRef(null);
	const tickerWrapperRef = useRef(null);

	useEffect(() => {
		const tickerWrapEl = tickerWrapperRef.current;
		if (tickerWrapEl && posts?.length) {
			// Re init ticker
			tickerWrapEl.innerHTML = '';
			const cloned = tickerRef.current.cloneNode(true);
			tickerWrapEl.appendChild(cloned);

			$(cloned).easyTicker(tickerConfig(attributes));
		}
	}, [posts, subLayout, rowGap]);

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