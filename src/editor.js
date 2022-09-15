import { registerBlockType, updateCategory } from '@wordpress/blocks';

import metadata from '../block.json';
import Edit from './Edit';
import './editor.scss';
import icons from './utils/icons';

// Update Block Category Icon
updateCategory('APBlock', { icon: icons.advancedPosts(20) });

registerBlockType(metadata, {
	icon: icons.advancedPosts(24),

	// Build in Functions
	edit: Edit,

	save: () => null
});