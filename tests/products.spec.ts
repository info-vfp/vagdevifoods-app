import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/products');
    });

    test('should display products list', async ({ page }) => {
        const productsGrid = page.locator('.grid'); // Assuming a grid layout for products
        await expect(productsGrid).toBeVisible();
    });

    test('should show specific product details', async ({ page }) => {
        await expect(page.getByText('Sona Masoori')).toBeVisible();
    });
});
