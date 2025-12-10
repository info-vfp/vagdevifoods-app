import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/contact');
    });

    test('should display contact form', async ({ page }) => {
        await expect(page.getByLabel('Name')).toBeVisible();
        await expect(page.getByLabel('Email')).toBeVisible();
        await expect(page.getByLabel('Message')).toBeVisible();
        await expect(page.getByRole('button', { name: /send/i })).toBeVisible();
    });
});
