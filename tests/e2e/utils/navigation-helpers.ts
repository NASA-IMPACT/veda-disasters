import { Page } from '@playwright/test';

/**
 * Helper function to navigate to a hazard from the header dropdown
 */
export async function navigateToHazard(page: Page, hazardName: string) {
  // Find and click the hazards dropdown button
  const hazardsButton = page
    .locator('[data-testid="navDropDownButton"]')
    .filter({ hasText: 'Hazards' });

  // Wait for the button to be visible and clickable
  await hazardsButton.waitFor({ state: 'visible', timeout: 10000 });
  await hazardsButton.click();

  // Wait for dropdown to open
  await page.waitForTimeout(1000);

  // Find and click the specific hazard link in the dropdown
  const hazardLink = page
    .getByTestId('header')
    .getByRole('link', { name: hazardName })
    .first();

  // Wait for the link to be visible and clickable
  await hazardLink.waitFor({ state: 'visible', timeout: 10000 });
  await hazardLink.click();

  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  return {
    url: page.url(),
    content: await page.textContent('.tablet\\:grid-col-9'),
  };
}

/**
 * Click-based navigation to a hazard without using page.goto
 */
export async function navigateToHazardByClick(page: Page, hazardName: string) {
  // Find and click the hazards dropdown button
  const hazardsButton = page
    .locator('[data-testid="navDropDownButton"]')
    .filter({ hasText: 'Hazards' });
  await hazardsButton.click();
  await page.waitForTimeout(500);

  // Find and click the specific hazard link in the dropdown
  const hazardLink = page
    .getByTestId('header')
    .getByRole('link', { name: hazardName })
    .first();

  await hazardLink.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  return {
    url: page.url(),
    content: await page.textContent('.tablet\\:grid-col-9'),
  };
}

/**
 * Helper function to check if content shows expected hazard
 */
export function showsHazardContent(
  content: string | null,
  hazardName: string,
): boolean {
  if (!content) return false;

  const hazardKeywords: Record<string, string[]> = {
    Wildfires: ['Wildfire', 'wildfire'],
    Floods: ['Flood', 'flood'],
    Earthquakes: ['Earthquake', 'earthquake'],
    'Tropical Cyclones': ['Hurricanes', 'Cyclones', 'hurricanes', 'cyclones'],
  };

  const keywords = hazardKeywords[hazardName] || [hazardName];
  return keywords.some((keyword) => content.includes(keyword));
}

/**
 * Helper function to get catalog content
 */
export async function getCatalogContent(page: Page): Promise<string | null> {
  return await page.textContent('.tablet\\:grid-col-9');
}

/**
 * Helper function to wait for page to be ready
 */
export async function waitForPageReady(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
}

/**
 * Helper function to navigate to events page from header
 */
export async function navigateToEvents(page: Page) {
  // Find and click the Events link in the navigation
  const eventsLink = page
    .locator('nav li')
    .filter({ hasText: 'Events' })
    .first();

  // Wait for the link to be visible and clickable
  await eventsLink.waitFor({ state: 'visible', timeout: 10000 });
  await eventsLink.click();

  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  return {
    url: page.url(),
    content: await page.textContent('body'),
  };
}
