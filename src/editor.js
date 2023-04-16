import { registerBlockType, updateCategory } from '@wordpress/blocks';

import metadata from '../block.json';
import Edit from './Edit';
import './editor.scss';
import { postsIcon } from './utils/icons';

// Update Block Category Icon
updateCategory('APBlock', { icon: postsIcon(20) });

registerBlockType(metadata, {
	icon: postsIcon(24),

	// Build in Functions
	edit: Edit,

	save: () => null
});