import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import SubLayout from '../SubLayout/SubLayout';
import { prefix } from '../../../utils/data';

const MyMasonry = ({ posts, attributes }) => {
	const { columns, columnGap, rowGap } = attributes;
	const { desktop = 3, tablet = 2, mobile = 1 } = columns;

	return <ResponsiveMasonry className={`${prefix}MasonryPosts`} columnsCountBreakPoints={{ 0: mobile, 641: tablet, 1025: desktop }}>
		<Masonry style={{ gap: `${columnGap}px` }} itemStyle={{ gap: `${rowGap}px` }}>
			{posts.map(post => <SubLayout key={post.id} {...{ post, attributes }} />)}
		</Masonry>
	</ResponsiveMasonry>
}
export default MyMasonry;