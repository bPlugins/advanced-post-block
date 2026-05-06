import { primaryColor, secondaryColor } from '../../../bpl-tools/utils/data';

export const subLayoutSwitch = (val, attributes) => {
	const { columns } = attributes;
	let newAttrs = {};

	switch (val) {
		case 'default':
		case 'title-meta':
		case 'left-image':
		case 'right-image':
			newAttrs = {
				contentBG: { color: '' },
				hoverContentBG: { color: '' },
				titleColor: primaryColor,
				metaCategoryIn: 'image',
				metaTextColor: '',
				metaLinkColor: secondaryColor,
				metaIconColor: primaryColor,
				excerptColor: ''
			};
			break;

		case 'overlay-content':
		case 'overlay-content-hover':
		case 'overlay-box':
		case 'overlay-content-box':
			newAttrs = {
				contentBG: { color: '#000000b3' },
				hoverContentBG: { color: '#000000b3' },
				titleColor: '#e7f0fe',
				metaCategoryIn: 'content',
				metaTextColor: '#fff',
				metaLinkColor: '#b6d2fc',
				metaIconColor: '#e7f0fe',
				excerptColor: '#fff'
			};
			break;

		case 'overlay-half-content':
			newAttrs = {
				contentBG: { type: 'gradient', gradient: 'linear-gradient(0deg, #000000bf 0%, #0000 100%)' },
				hoverContentBG: { type: 'gradient', gradient: 'linear-gradient(0deg, #000000bf 0%, #0000 100%)' },
				titleColor: '#fff',
				metaCategoryIn: 'content',
				metaTextColor: '#fff',
				metaLinkColor: '#b6d2fc',
				metaIconColor: '#e7f0fe',
				excerptColor: '#fff'
			};
			break;

		default:
			break;
	}

	if (['left-image', 'right-image'].includes(val)) {
		newAttrs.columns = { ...columns, desktop: 2 };
	} else {
		newAttrs.columns = { ...columns, desktop: 3 };
	}

	if (['overlay-box', 'overlay-content-box'].includes(val)) {
		newAttrs.contentAlign = 'center';
	} else {
		newAttrs.contentAlign = 'left';
	}

	return newAttrs;
}