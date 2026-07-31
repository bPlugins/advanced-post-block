import { Fragment, useState, useEffect } from 'react';

import Title from '../Single/Title';
import Meta from '../Single/Meta';
import Excerpt from '../Single/Excerpt';
import ReadMore from '../Single/ReadMore';
import FeatureImage from '../Single/FeatureImage';
import MetaCategoryBadge from '../Single/MetaCategoryBadge';
import { classNames } from '../../../utils/functions';
import { prefix } from '../../../utils/data';

const AccordionItem = ({ post, attributes, index, id, theme, isOpen, onToggle }) => {
	const { accordion = {}, elementsSort = ['title', 'meta', 'excerpt'] } = attributes;
	const { showIcon = true, iconPosition = 'right', indicatorIconUp = '', indicatorIconDown = '' } = accordion || {};

	// Body respects the Elements → Sort order for meta/excerpt (title is in the header).
	const bodyOrder = [...new Set([...elementsSort, 'meta', 'excerpt'])].filter(key => ['meta', 'excerpt'].includes(key));

	const headerId = `${id}-accHeader-${index}`;
	const panelId = `${id}-accPanel-${index}`;


	// Custom indicator icons (up shown when open, down when closed); otherwise the CSS morph.
	// key forces a remount on toggle so the swap-in animation replays.
	const indicator = showIcon ?
		<span key={isOpen ? 'up' : 'down'} className={`${prefix}AccordionIndicator ${isOpen ? 'upIcon' : 'downIcon'}`} aria-hidden='true' dangerouslySetInnerHTML={{ __html: isOpen ? indicatorIconUp : indicatorIconDown }} /> :
		null;

	const onKeyDown = e => {
		if ('Enter' === e.key || ' ' === e.key || 'Spacebar' === e.key) {
			e.preventDefault();
			onToggle();
		}
	};

	return <div className={classNames(`${prefix}AccordionItem`, 'apbPost', `${prefix}Post-${post.id}`, { 'is-open': isOpen })}>
		<h3 className={`${prefix}AccordionHeader`}>
			<div
				role='button'
				tabIndex={0}
				id={headerId}
				className={`${prefix}AccordionTrigger`}
				aria-expanded={isOpen}
				aria-controls={panelId}
				onClick={onToggle}
				onKeyDown={onKeyDown}
			>
				{'left' === iconPosition && indicator}

				{'thumbnail' === theme && <FeatureImage post={post} attributes={{ ...attributes, metaCategoryIn: 'content' }} />}

				<span className={`${prefix}AccordionHeaderText`}>
					<Title post={post} attributes={attributes} />

					{/* Category on the right of the title when position is "With Title" */}
					<MetaCategoryBadge post={post} attributes={attributes} location='aboveContent' />
				</span>

				{'right' === iconPosition && indicator}
			</div>
		</h3>

		<div id={panelId} className={`${prefix}AccordionPanel`} role='region' aria-labelledby={headerId}>
			<div className={`${prefix}AccordionPanelInner`}>
				<div className={`${prefix}AccordionBody`}>
					{bodyOrder.map(key => <Fragment key={key}>
						{'meta' === key ?
							<Meta post={post} attributes={attributes} /> :
							<Excerpt post={post} attributes={attributes} />}
					</Fragment>)}

					<ReadMore post={post} attributes={attributes} />
				</div>
			</div>
		</div>
	</div>;
};

const Accordion = ({ posts, attributes, id }) => {
	const { accordion = {} } = attributes;
	const { theme = 'classic', openMode = 'single', firstOpen = true, duration = 350 } = accordion || {};

	const [openItems, setOpenItems] = useState(() => (firstOpen && posts?.length ? [posts[0].id] : []));

	// Posts load asynchronously (empty on first render), so the useState initializer
	// can miss the first item. Re-sync whenever firstOpen toggles or the posts arrive/change.
	const firstPostId = posts?.[0]?.id;
	useEffect(() => {
		setOpenItems(firstOpen && firstPostId ? [firstPostId] : []);
	}, [firstOpen, firstPostId]);

	const toggle = postId => {
		setOpenItems(prev => {
			const isOpen = prev.includes(postId);

			if ('single' === openMode) {
				return isOpen ? [] : [postId];
			}

			return isOpen ? prev.filter(item => item !== postId) : [...prev, postId];
		});
	};

	// Behavioral vars; visual tokens (colors, radius, shadow, fonts) come from the Style module.
	// Item spacing uses the shared Row Gap control (Layout panel).
	const styleVars = { '--apb-acc-dur': `${duration}ms` };

	return <div className={`${prefix}AccordionPosts theme-${theme}`} style={styleVars}>
		{posts.map((post, index) => <AccordionItem
			key={post.id}
			post={post}
			attributes={attributes}
			index={index}
			id={id}
			theme={theme}
			isOpen={openItems.includes(post.id)}
			onToggle={() => toggle(post.id)}
		/>)}
	</div>;
};
export default Accordion;
