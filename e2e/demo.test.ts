import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
  // The paper elements
	await expect(page.locator('h1')).toBeVisible();
});
