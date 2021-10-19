import { updateCategory } from '@wordpress/blocks';
import { registerBlockType, createBlock } from '@wordpress/blocks';

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

    transforms: {
        from: [
            { type: 'block', blocks: ['b-blocks/posts'], transform: attributes => createBlock('ap-block/posts', attributes) },
            { type: 'prefix', prefix: 'apb', transform: () => createBlock('ap-block/posts') },
            { type: 'prefix', prefix: 'posts', transform: () => createBlock('ap-block/posts') }
        ],

        to: [
            {
                type: 'block', blocks: ['b-blocks/posts'], isMatch: attributes => {
                    if (attributes) return true;
                    return false;
                },
                transform: attributes => createBlock('b-blocks/posts', attributes)
            }
        ]
    },

    // Build In Functions
    edit: Edit,

    save: () => null
});