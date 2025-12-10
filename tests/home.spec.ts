import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should have correct title', async ({ page }) => {
        await expect(page).toHaveTitle(/Vagdevi Foods/);
    });

    test('should display hero section', async ({ page }) => {
        const heroHeading = page.getByRole('heading', { level: 1 });
        await expect(heroHeading).toBeVisible();
        await expect(heroHeading).toHaveText(/Premium Quality/i);
    });

    test('should navigate to products page', async ({ page }) => {
        await page.getByRole('link', { name: 'Products' }).first().click();
        await expect(page).toHaveURL(/.*products/);
    });
});
