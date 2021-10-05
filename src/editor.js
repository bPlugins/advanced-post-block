import { updateCategory } from '@wordpress/blocks';
import { registerBlockType } from '@wordpress/blocks';

//  Import Scss.
import './editor.scss';

import Edit from './edit';

// Icons
import icons from './Const/icons';
const icon = icons.advancedPosts(24);

// Update Block Category Icon
updateCategory('APBlock', { icon: icons.advancedPosts(20) });

// Metadata
import metadata from '../block.json';
const { name, title, description, category, keywords, supports, attributes, example } = metadata;

registerBlockType(name, {
    title, description, icon, category, keywords, supports, attributes, example,

    // Build In Functions
    edit: Edit,

    save: () => null
});