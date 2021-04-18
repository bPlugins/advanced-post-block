const options = {
    fontSizes: [
        { name: 'Small', slug: 'small', size: 13 },
        { name: 'Normal', slug: 'normal', size: 16 },
        { name: 'Medium', slug: 'medium', size: 20 },
        { name: 'Large', slug: 'large', size: 36 },
        { name: 'Huge', slug: 'huge', size: 48 }
    ],

    colors: [
        { name: 'Black', color: '#000' },
        { name: 'White', color: '#fff' },
        { name: 'Purple Heart', color: '#4527a4' },
        { name: 'Dark Orchid', color: '#8344c5' },
    ],

    aligns: [
        { label: 'Left', value: 'left', icon: 'editor-alignleft' },
        { label: 'Center', value: 'center', icon: 'editor-aligncenter' },
        { label: 'Right', value: 'right', icon: 'editor-alignright' },
        { label: 'Justify', value: 'justify', icon: 'editor-justify' }
    ],

    fontWeights: [
        { label: 'Lighter', value: 'lighter' },
        { label: '100', value: '100' },
        { label: '200', value: '200' },
        { label: '300', value: '300' },
        { label: '400', value: '400' },
        { label: '500', value: '500' },
        { label: '600', value: '600' },
        { label: '700', value: '700' },
        { label: '800', value: '800' },
        { label: '900', value: '900' },
        { label: 'Bold', value: 'bold' },
        { label: 'Bolder', value: 'bolder' },
        { label: 'Normal', value: 'normal' },
        { label: 'Inherit', value: 'inherit' },
    ],

    textTransforms: [
        { label: 'Capitalize', value: 'capitalize', icon: 'Tt' },
        { label: 'Uppercase', value: 'uppercase', icon: 'TT' },
        { label: 'Lowercase', value: 'lowercase', icon: 'tt' },
        { label: 'None', value: 'none', icon: 'NO' },
    ],

    sizeTypes: [
        { label: 'Pixel', value: 'px', icon: 'px', def: 650 },
        { label: 'Percentage', value: '%', icon: '%', def: 100 }
    ],

    postsOrdersBy: [
        { label: 'Author', value: 'author' },
        { label: 'Title', value: 'title' },
        { label: 'Date', value: 'date' },
        { label: 'Last Modified', value: 'modified' },
    ],

    postsOrders: [
        { label: 'Ascending', value: 'asc' },
        { label: 'Descending', value: 'desc' }
    ]
}
export default options;