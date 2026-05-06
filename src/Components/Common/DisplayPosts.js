import SubLayout from './SubLayout/SubLayout';
import Masonry from './Layout/Masonry';
import NewsTicker from './Layout/NewsTicker';

import { prefix } from '../../utils/data';

const DisplayPosts = ({ posts, attributes, id, Slider, Ticker }) => {
	const { layout, columns } = attributes;
	const { desktop = 3, tablet = 2, mobile = 1 } = columns;

	const PostsLoop = () => posts.map(post => <SubLayout key={post.id} {...{ post, attributes }} />)

	switch (layout) {
		case 'grid':
			return <div className={`${prefix}GridPosts columns-${desktop} columns-tablet-${tablet} columns-mobile-${mobile}`}>
				<PostsLoop />
			</div>;

		case 'masonry':
			return <Masonry posts={posts} attributes={attributes} />;

		case 'slider':
			return <Slider posts={posts} attributes={attributes} id={id} />

		case 'ticker':
			return <Ticker posts={posts} attributes={attributes} />;

		case 'newsTicker':
			return <NewsTicker posts={posts} attributes={attributes} id={id} />;

		default:
			return <div className={`${prefix}GridPosts columns-${desktop} columns-tablet-${tablet} columns-mobile-${mobile}`}>
				<PostsLoop />
			</div>;
	}
}
export default DisplayPosts;