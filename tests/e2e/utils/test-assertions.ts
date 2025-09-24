import { expect } from '@playwright/test';

export function assertNavigationWorked(
  initialUrl: string,
  newUrl: string,
  initialContent: string | null,
  newContent: string | null,
  expectedHazard: string,
  showsHazardContent: (content: string | null, hazard: string) => boolean,
) {
  const urlChanged = initialUrl !== newUrl;
  const contentChanged = initialContent !== newContent;
  const showsExpectedContent = showsHazardContent(newContent, expectedHazard);

  expect(urlChanged && contentChanged && showsExpectedContent).toBe(true);
}

export function assertCatalogRespondsToFilters(
  previousContent: string | null,
  newContent: string | null,
) {
  const contentChanged = previousContent !== newContent;
  expect(contentChanged).toBe(true);
}
