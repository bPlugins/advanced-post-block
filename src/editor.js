import { updateCategory } from '@wordpress/blocks';

// Import Blocks
import './blocks/posts';

//  Import CSS.
import './editor.scss';

// Icon
import icons from './Const/icons';

// Update Block Category Icon
updateCategory('APBlock', { icon: icons.advancedPosts(20) });