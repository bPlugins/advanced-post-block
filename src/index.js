import { registerBlockType, updateCategory } from '@wordpress/blocks';

import './editor.scss';
import metadata from './block.json';
import Edit from './Components/Backend/Edit';
import { postsIcon } from './utils/icons';

// Update Block Category Icon
updateCategory('APBlock', { icon: postsIcon(20) });

registerBlockType(metadata, {
	icon: postsIcon(),

	// Build in Functions
	edit: Edit,

	save: () => null
});