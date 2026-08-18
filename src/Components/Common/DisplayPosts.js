import SubLayout from './SubLayout/SubLayout';
import Masonry from './Layout/Masonry';
import NewsTicker from './Layout/NewsTicker';
import Accordion from './Layout/Accordion';

import { prefix } from '../../utils/data';

const DisplayPosts = ({ posts, attributes, id, Slider, Ticker }) => {
	const { layout, columns } = attributes;
	const { desktop = 3, tablet = 2, mobile = 1 } = columns;

	const PostsLoop = () => posts.map((post, index) => <SubLayout key={post.id} {...{ post, attributes, index }} />)

	switch (layout) {
		case 'grid':
			return <div className={`${prefix}GridPosts columns-${desktop} columns-tablet-${tablet} columns-mobile-${mobile}`}>
				<PostsLoop />
			</div>;

		case 'magazine1':
			return <div className={`${prefix}Magazine1Posts`}>
				{posts[0] && <SubLayout key={posts[0].id} {...{ post: posts[0], attributes, index: 0 }} />}
				{posts.length > 1 && <div className={`${prefix}Magazine1List`}>
					<div className={`${prefix}Magazine1ListInner`}>
						{posts.slice(1).map((post, index) => <SubLayout key={post.id} {...{ post, attributes: { ...attributes, subLayout: attributes.magazine?.subLayout || 'left-image' }, index: index + 1 }} />)}
					</div>
				</div>}
			</div>;

		case 'masonry':
			return <Masonry posts={posts} attributes={attributes} />;

		case 'slider':
			return <Slider posts={posts} attributes={attributes} id={id} />

		case 'ticker':
			return <Ticker posts={posts} attributes={attributes} id={id} />;

		case 'newsTicker':
			return <NewsTicker posts={posts} attributes={attributes} id={id} />;

		case 'accordion':
			return <Accordion posts={posts} attributes={attributes} id={id} />;

		default:
			return <div className={`${prefix}GridPosts columns-${desktop} columns-tablet-${tablet} columns-mobile-${mobile}`}>
				<PostsLoop />
			</div>;
	}
}
export default DisplayPosts;