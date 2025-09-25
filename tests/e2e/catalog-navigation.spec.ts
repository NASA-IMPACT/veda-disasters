import { test, expect } from '@playwright/test';
import {
  navigateToHazard,
  navigateToHazardByClick,
  navigateToEvents,
  waitForPageReady,
} from './utils/navigation-helpers';
import { TEST_CONSTANTS } from './utils/test-constants';

test.describe('Catalog Navigation', () => {
  test.describe.configure({ timeout: 60000 });

  test('basic catalog content sync works', async ({ page }) => {
    await page.goto(TEST_CONSTANTS.CATALOG_URL);
    await waitForPageReady(page);

    const initialUrl = page.url();
    const initialContent = await page.textContent(
      TEST_CONSTANTS.SELECTORS.CATALOG_CONTENT,
    );

    const { url: wildfiresUrl, content: wildfiresContent } =
      await navigateToHazard(page, 'Wildfires');

    expect(initialUrl).not.toBe(wildfiresUrl);
    expect(initialContent).not.toBe(wildfiresContent);
    expect(wildfiresContent).toContain('Wildfire');
  });

  test('navigation from events page works', async ({ page }) => {
    await page.goto(TEST_CONSTANTS.EVENTS_PAGE_URL);
    await waitForPageReady(page);

    const { url: tropicalCyclonesUrl, content: tropicalCyclonesContent } =
      await navigateToHazard(page, 'Tropical Cyclones');

    await page.waitForSelector('.tablet\\:grid-col-9', { timeout: 10000 });
    await page.waitForTimeout(3000);

    expect(tropicalCyclonesUrl).toContain('hurricanes_and_cyclones');
    expect(tropicalCyclonesContent).toContain('Hurricanes and Cyclones');
    expect(tropicalCyclonesContent).toContain('Datasets 2');

    const datasetItems = await page
      .locator('[data-testid="CardHeader"]')
      .count();
    expect(datasetItems).toBe(2);
  });

  test('home -> events -> catalog navigation works', async ({ page }) => {
    test.setTimeout(60000);

    await page.goto(TEST_CONSTANTS.HOME_PAGE_URL);
    await waitForPageReady(page);

    const { url: eventsUrl } = await navigateToEvents(page);
    expect(eventsUrl).toContain('/events');

    const { url: tropicalCyclonesUrl, content: tropicalCyclonesContent } =
      await navigateToHazard(page, 'Tropical Cyclones');

    await page.waitForSelector('.tablet\\:grid-col-9', { timeout: 10000 });
    await page.waitForTimeout(3000);

    expect(tropicalCyclonesUrl).toContain('hurricanes_and_cyclones');
    expect(tropicalCyclonesContent).toContain('Hurricanes and Cyclones');
    expect(tropicalCyclonesContent).toContain('Datasets 2');

    const datasetItems = await page
      .locator('[data-testid="CardHeader"]')
      .count();
    expect(datasetItems).toBe(2);
  });

  test('home -> hazards -> catalog navigation works', async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);

    const { url, content } = await navigateToHazardByClick(
      page,
      'Tropical Cyclones',
    );

    expect(url).toContain('data-catalog');
    expect(url).toContain('hurricanes_and_cyclones');

    await page.waitForSelector('.tablet\\:grid-col-9', { timeout: 10000 });
    await page.waitForTimeout(3000);

    expect(content).toContain('Hurricanes and Cyclones');
    expect(content).toContain('Datasets 2');

    const datasetItems = await page
      .locator('[data-testid="CardHeader"]')
      .count();
    expect(datasetItems).toBe(2);
  });

  test('events -> catalog -> events -> catalog navigation works', async ({
    page,
  }) => {
    test.setTimeout(60000);

    await page.goto(TEST_CONSTANTS.EVENTS_PAGE_URL);
    await waitForPageReady(page);

    const { url: firstCatalogUrl } = await navigateToHazard(
      page,
      'Tropical Cyclones',
    );
    await page.waitForSelector('.tablet\\:grid-col-9', { timeout: 10000 });
    await page.waitForTimeout(3000);

    const firstDatasetItems = await page
      .locator('[data-testid="CardHeader"]')
      .count();
    expect(firstDatasetItems).toBe(2);
    expect(firstCatalogUrl).toContain('hurricanes_and_cyclones');

    const { url: eventsUrl } = await navigateToEvents(page);
    expect(eventsUrl).toContain('/events');

    const hazardsButton = page
      .locator('[data-testid="navDropDownButton"]')
      .filter({ hasText: 'Hazards' });
    await hazardsButton.waitFor({ state: 'visible', timeout: 10000 });
    await hazardsButton.click();
    await page.waitForTimeout(1000);

    const hazardLink = page
      .getByTestId('header')
      .getByRole('link', { name: 'Tropical Cyclones' })
      .first();
    await hazardLink.click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    const secondCatalogUrl = page.url();
    await page.waitForSelector('.tablet\\:grid-col-9', { timeout: 10000 });
    await page.waitForTimeout(3000);

    const secondDatasetItems = await page
      .locator('[data-testid="CardHeader"]')
      .count();
    const hasTaxonomyParam = secondCatalogUrl.includes(
      'hurricanes_and_cyclones',
    );

    expect(hasTaxonomyParam).toBe(true);
    expect(secondDatasetItems).toBe(2);
  });

  test('catalog responds to filter changes', async ({ page }) => {
    await page.goto(TEST_CONSTANTS.CATALOG_URL);
    await waitForPageReady(page);

    const { content: tropicalCyclonesContent } = await navigateToHazard(
      page,
      'Tropical Cyclones',
    );

    const searchInput = page
      .locator(TEST_CONSTANTS.SELECTORS.SEARCH_INPUT)
      .first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('test');
      await page.waitForTimeout(TEST_CONSTANTS.TIMEOUTS.SEARCH_DELAY);

      const searchContent = await page.textContent(
        TEST_CONSTANTS.SELECTORS.CATALOG_CONTENT,
      );

      expect(tropicalCyclonesContent).not.toBe(searchContent);
    }
  });
});
