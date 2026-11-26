// Editor → front end, the way a user meets the block:
//  1. insert "Advanced Posts", pick the Grid layout, the preview lists the posts; turn on
//     pagination and publish
//  2. the published page renders the posts and pages through them over REST
//  3. a page with the frontend filter narrows the posts by category
//
// Every post, term and page made here is deleted again by id, so the suite can also run
// against a real development site (WP_BASE_URL), not only the throwaway wp-env one.
const { test, expect } = require('@playwright/test');

const PREFIX = 'APB e2e';
const created = { posts: [], pages: [], categories: [] };

// The post editor renders blocks inside an iframe when every registered block supports it; fall back to the page otherwise.
const canvas = async page => {
	const iframe = page.locator('iframe[name="editor-canvas"]');
	return (await iframe.count()) ? page.frameLocator('iframe[name="editor-canvas"]') : page;
};

const collectPageErrors = page => {
	const errors = [];
	page.on('pageerror', err => errors.push(err.message));
	return errors;
};

// ?rest_route= works with plain permalinks too (wp-env's default), /wp-json/ does not
const rest = async (page, method, route, data) => {
	if (!rest.nonce) {
		await page.goto('/wp-admin/');
		rest.nonce = (await (await page.request.get('/wp-admin/admin-ajax.php?action=rest-nonce')).text()).trim();
	}
	// Some servers (nginx on Local) refuse DELETE on "/"; WordPress honours the override header on a POST.
	const headers = { 'X-WP-Nonce': rest.nonce, ...('DELETE' === method ? { 'X-HTTP-Method-Override': 'DELETE' } : {}) };
	const response = await page.request.fetch(`/?rest_route=${route}`, { method: 'DELETE' === method ? 'POST' : method, headers, data });
	expect(response.ok(), `${method} ${route}: ${await response.text()}`).toBeTruthy();
	return response.json();
};

const pageMarkup = attrs => `<!-- wp:ap-block/posts ${JSON.stringify(attrs)} /-->`;

// beforeAll/afterAll get a bare browser: give their context the project's site and admin session
const adminPage = async browser => {
	const { baseURL, storageState, ignoreHTTPSErrors } = test.info().project.use;
	const context = await browser.newContext({ baseURL, storageState, ignoreHTTPSErrors });
	return context.newPage();
};

// Titles of the posts the block is showing
const titles = block => block.locator('.apbTitle').allInnerTexts();

test.describe.configure({ mode: 'serial' });

test.describe('Advanced Post Block', () => {
	let pageUrl;

	test.beforeAll(async ({ browser }) => {
		const page = await adminPage(browser);
		rest.nonce = null;

		const news = await rest(page, 'POST', '/wp/v2/categories', { name: `${PREFIX} News ${Date.now()}` });
		const tips = await rest(page, 'POST', '/wp/v2/categories', { name: `${PREFIX} Tips ${Date.now()}` });
		created.categories.push(news.id, tips.id);

		// Five posts in the past (a future date would schedule them), so the order is predictable: 5, 4, 3, 2, 1
		for (let i = 1; i <= 5; i++) {
			const post = await rest(page, 'POST', '/wp/v2/posts', {
				title: `${PREFIX} post ${i}`,
				status: 'publish',
				date: `2020-01-0${i}T10:00:00`,
				categories: [i <= 3 ? news.id : tips.id]
			});
			created.posts.push(post.id);
		}
		await page.context().close();
	});

	test.afterAll(async ({ browser }) => {
		const page = await adminPage(browser);
		rest.nonce = null;
		for (const id of created.pages) await rest(page, 'DELETE', `/wp/v2/pages/${id}&force=true`);
		for (const id of created.posts) await rest(page, 'DELETE', `/wp/v2/posts/${id}&force=true`);
		for (const id of created.categories) await rest(page, 'DELETE', `/wp/v2/categories/${id}&force=true`);
		await page.context().close();
	});

	test('inserts the block, previews the posts and publishes', async ({ page }) => {
		const errors = collectPageErrors(page);

		await page.goto('/wp-admin/post-new.php?post_type=page');
		// Skip the welcome guide; both preference scopes have been used across WordPress versions
		await page.waitForFunction(() => window.wp?.data?.dispatch('core/preferences'));
		await page.evaluate(() => {
			const prefs = window.wp.data.dispatch('core/preferences');
			prefs.set('core/edit-post', 'welcomeGuide', false);
			prefs.set('core', 'welcomeGuide', false);
			// New pages open a "Choose a pattern" modal when the theme has starter patterns (Twenty Twenty-Five does)
			prefs.set('core', 'enableChoosePatternModal', false);
		});
		await page.getByRole('dialog', { name: /welcome/i }).getByRole('button', { name: /close/i }).click({ timeout: 3_000 }).catch(() => {});
		await page.getByRole('dialog', { name: /choose a pattern/i }).getByRole('button', { name: /close/i }).click({ timeout: 5_000 }).catch(() => {});

		await page.getByRole('button', { name: /block inserter/i }).first().click();
		await page.getByRole('searchbox', { name: /search/i }).fill('Advanced Posts');
		await page.getByRole('option', { name: 'Advanced Posts', exact: true }).click();

		const editor = await canvas(page);
		const block = editor.locator('[data-type="ap-block/posts"]').first();
		await expect(block).toBeVisible();

		// A new block asks for a layout first
		await block.locator('.apbLayout', { has: editor.locator('.label', { hasText: /^Grid$/ }) }).first().click();
		await expect(block.locator('.apbTitle').first(), 'the preview lists posts').toBeVisible({ timeout: 30_000 });

		// Two per page with numbered pages, and only this test's posts
		await page.evaluate(({ categories }) => {
			const { select, dispatch } = window.wp.data;
			const apb = select('core/block-editor').getBlocks().find(b => 'ap-block/posts' === b.name);
			dispatch('core/block-editor').updateBlockAttributes(apb.clientId, {
				postsPerPage: 2,
				selectedCategories: categories,
				loadMore: { ...apb.attributes.loadMore, type: 'pagination' }
			});
		}, { categories: created.categories });

		await expect.poll(() => titles(block), { message: 'the preview follows the query' }).toEqual([`${PREFIX} post 5`, `${PREFIX} post 4`]);
		await expect(block.locator('.apbPageNumber-3')).toBeVisible();

		await page.getByRole('button', { name: 'Publish', exact: true }).click();
		await page.getByLabel('Editor publish').getByRole('button', { name: 'Publish', exact: true }).click();
		await expect(page.getByRole('link', { name: /view page/i }).first()).toBeVisible();

		// The editor URL stays post-new.php for a while after publishing; the store knows the id straight away
		const postId = await page.evaluate(() => window.wp.data.select('core/editor').getCurrentPostId());
		expect(postId, 'editor store carries the page id after publishing').toBeTruthy();
		created.pages.push(postId);
		pageUrl = `/?page_id=${postId}`;

		expect(errors, 'uncaught JS errors in the editor').toEqual([]);
	});

	test('renders the published page and pages through the posts', async ({ page }) => {
		test.skip(!pageUrl, 'depends on the editor test');
		const errors = collectPageErrors(page);

		await page.goto(pageUrl);
		const block = page.locator('.wp-block-ap-block-posts').first();

		await expect.poll(() => titles(block)).toEqual([`${PREFIX} post 5`, `${PREFIX} post 4`]);
		await expect(block, 'view.js reads the signed request and removes it').not.toHaveAttribute('data-request', /.+/);

		await block.locator('.apbPageNumber-3').click();
		await expect.poll(() => titles(block), { message: 'page 3 comes from the REST route' }).toEqual([`${PREFIX} post 1`]);
		await expect(block.locator('.apbPageNumber-3')).toHaveClass(/apbActivePage/);

		expect(errors, 'uncaught JS errors on the front end').toEqual([]);
	});

	test('filters the posts by category on the front end', async ({ page }) => {
		const errors = collectPageErrors(page);

		const made = await rest(page, 'POST', '/wp/v2/pages', {
			title: `${PREFIX} filter page`,
			status: 'publish',
			content: pageMarkup({
				layout: 'grid',
				postsPerPage: 10,
				selectedCategories: created.categories,
				frontendFilter: { enabled: true, taxonomies: [{ taxonomy: 'category', allLabel: 'All', hideEmpty: true }] }
			})
		});
		created.pages.push(made.id);

		await page.goto(`/?page_id=${made.id}`);
		const block = page.locator('.wp-block-ap-block-posts').first();
		await expect.poll(() => titles(block)).toHaveLength(5);

		await block.locator('.apbFilterItem', { hasText: `${PREFIX} Tips` }).click();
		await expect.poll(() => titles(block), { message: 'only the Tips posts are left' }).toEqual([`${PREFIX} post 5`, `${PREFIX} post 4`]);
		await expect(block.locator('.apbFilterResultCount')).toHaveText(/^2 /);

		await block.locator('.apbFilterItem', { hasText: /^All$/ }).click();
		await expect.poll(() => titles(block)).toHaveLength(5);

		expect(errors, 'uncaught JS errors on the front end').toEqual([]);
	});
});
