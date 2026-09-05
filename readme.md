# Advanced Post Block — Showcase Posts with Style

![Advanced Post Block Banner](https://ps.w.org/advanced-post-block/assets/banner-772x250.png)

[![WordPress Support](https://img.shields.io/badge/WordPress-6.5+-blue.svg?style=flat-square&logo=wordpress)](https://wordpress.org/plugins/advanced-post-block/)
[![PHP Support](https://img.shields.io/badge/PHP-7.1+-777bb4.svg?style=flat-square&logo=php)](./readme.txt)
[![GPLv3 License](https://img.shields.io/badge/License-GPLv3-green.svg?style=flat-square)](./readme.txt)
[![Stable Version](https://img.shields.io/badge/Version-2.5.0-blue.svg?style=flat-square)](./readme.txt)

**Advanced Post Block** is the ultimate Gutenberg block for displaying WordPress posts, pages, and custom content beautifully. It offers a wide range of layouts—including Grid, Masonry, Slider, and News Tickers—giving you total control over your site's content display without writing a single line of code.

---

## 🚀 Key Features

### 💎 Core Layouts (Free)
Everything you need to build a professional and modern content display:
- **Diverse Layouts:** Choose from professional **Grid, Masonry, Slider, Ticker, News Ticker, Magazine 1, and Accordion** views.
- **Flexible Sub-layouts:** Default, Title Meta, Left/Right Image, Overlay Content, and **Overlay Half Content**.
- **Post Query:** Filter by post type (posts, pages, or any custom post type), categories, **tags**, and authors, with **Post Offset** and **Include/Exclude Posts** by ID.
- **Pagination:** Numbered **Pagination** and prev/next **Navigation** with labels, alignment, colors, padding, spacing, and back-to-top.
- **Element Sorting:** Drag and drop to reorder the title, meta data, and excerpt.
- **Interactive Styling:** Apply **Hover Backgrounds, Borders, and Shadows** for engaging user experiences.
- **Image Controls:** Image **size**, a **fallback image**, width, height, border radius, hover radius, margins, and animations.
- **Post Title:** Control over title tags, word/character limits, and custom hover colors.
- **Meta Styling:** A custom **separator** plus full control over metadata hover colors for all elements.
- **Read More Styles:** Custom **Button Icons**, hover borders, and shadow effects for better CTAs.

### 👑 Premium Power (Pro)
Unlock advanced functionality for high-performing websites:
- **Exclusive Layouts:** **Grid 1**, **Magazine 2**, and **Timeline**, plus the **List Even/Odd** and **Overlay Content Box** sub-layouts.
- **Accordion & Ticker Pro:** Four extra accordion themes, multiple open panels, and the full **Ticker** and **News Ticker** option panels.
- **Advanced Query:** **Query Presets**, **Custom Taxonomies**, **Search Queries**, extra **Order By** options, and excluding the current or sticky posts.
- **More Load More Types:** **Infinite Scroll** and a **Load More** button.
- **Metadata Mastery:** Meta **gap**, drag-and-drop **sorting**, alignment, separator color, and **Time Ago** date formats.
- **SEO & Content:** Pull excerpts directly from **SEO Meta** (Yoast, Rank Math, All in One SEO) and toggle the excerpt ellipsis.
- **Post View Tracking:** Display **Popularity Counts** with customizable icons and metadata items.
- **Premium Badges:** Choose **Unique Positions** on images with pro padding and border radius settings.
- **Performance Optimized:** Professional **Lazy Loading** and normal/hover **grayscale** filters.
- **Advanced Read More:** Unlock **Premium Icons**, icon gap and positioning, an Auto/Bottom position, and pulse hover animations.

---

## 📸 Visual Showcase

### Interactive Layout Switching
Switch between any layout—Grid, Masonry, Slider, etc.—and see the changes update in real-time within the Gutenberg editor.

### Dynamic Sub-layouts
Adjust the relationship between images and text with a few clicks. Try "Overlay Box" for a cinematic feel or "Left/Right Even Odd" for an editorial look.

### Advanced Query Controls
Filter by category, tag, author, or search query. Use presets to instantly show "Popular" or "Related" posts.

---

## 🛠 Technical Stack

This project is built with modern web technologies to ensure performance and flexibility:

- **Frontend Framework:** [React](https://reactjs.org/) (used for both Gutenberg Editor components and frontend hydration).
- **Slider Library:** [Swiper.js](https://swiperjs.com/) for high-performance touch carousels and news tickers.
- **Masonry Layout:** [react-responsive-masonry](https://github.com/cedricdelpoux/react-responsive-masonry) for fluid, responsive post grids.
- **Build System:** `@wordpress/scripts` (Webpack) for block bundling and `Gulp` for asset management/deployment.
- **Styling:** SASS/SCSS with a custom design system for consistent UI.
- **Admin Dashboard:** Powered by `React Router` for a single-page app experience.
- **Backend:** PHP with custom WordPress REST API extensions.
- **Licensing & Analytics:** Custom **BPlugins SDK** (based on Freemius Lite) calling through `api.bplugins.com`.

---

## 📚 Third-Party Libraries

Advanced Post Block bundles or depends on the following high-quality libraries:

- **[Swiper](https://swiperjs.com/)** (MIT): Powering the touch-enabled sliders and vertical news tickers.
- **[jQuery Easy Ticker](https://github.com/vaakash/jquery-easy-ticker)** (MIT): Smooth vertical scrolling for the news ticker layout.
- **[react-responsive-masonry](https://github.com/cedricdelpoux/react-responsive-masonry)** (MIT): Fluid responsive masonry grid system.
- **[React Router](https://reactrouter.com/)** (MIT): Client-side routing for the plugin's admin dashboard.
- **[Freemius Lite SDK (Custom)](https://bplugins.com)**: A modified version of the Freemius SDK optimized for the bPlugins API to handle usage tracking and analytics.

---

## 💻 Developer Guide

### Directory Structure
- **`/src`**: Main source code (React, SCSS, Block Metadata).
	- **`/Components`**: React components for the Editor (Backend) and Frontend logic.
	- **`/admin`**: Code for the plugin's admin dashboard UI.
	- **`view.js`**: Frontend entry point that "hydrates" the static HTML with React interactivity.
- **`/includes`**: PHP logic, including query handlers, shortcodes, and AJAX endpoints.
- **`/build`**: Compiled assets (automatically generated; do not edit manually).
- **`plugin.php`**: The main WordPress plugin file.

### Development Workflow
1. **Clone the repository** into your local WordPress `plugins` directory.
2. **Install dependencies**:
	```bash
	npm install
	```
3. **Start development watch mode**:
	```bash
	npm start
	```
4. **Create a production build**:
	```bash
	npm run build
	```

### Data Flow & Lifecycle
1. **Editor:** `src/Components/Backend/Edit.js` manages block attributes.
2. **Database:** Attributes are saved as JSON within the `<!-- wp:ap-block/posts ... -->` comment.
3. **Frontend (PHP):** `src/render.php` reads attributes and generates initial HTML + Data Attributes.
4. **Frontend (JS):** `view.js` detects the block, reads `data-attributes`, and mounts the `APBPosts` React component to add AJAX/Swiper functionality.

---

## 🔌 Developer API

### Shortcode Support
Embed any block configuration using the generated ID:
```
[apb id="123"]
```

---

## 🔗 Useful Links
- [Live Demo](https://bplugins.com/products/advanced-post-block/#demos)
- [Support Forum](https://wordpress.org/support/plugin/advanced-post-block/)
- [Upgrade to Pro](https://bplugins.com/products/advanced-post-block/pricing/)

---
*Developed by [bPlugins](https://bplugins.com)*