import { updateCategory } from '@wordpress/blocks';
import { registerBlockType } from '@wordpress/blocks';

// Import Files
import Edit from './edit';
import './editor.scss';

// Icons
import icons from './Const/icons';

// Update Block Category Icon
updateCategory('APBlock', { icon: icons.advancedPosts(20) });

// Metadata
import metadata from '../block.json';

registerBlockType(metadata, {
	icon: icons.advancedPosts(24),

	// Build in Functions
	edit: Edit,

	save: () => null
});