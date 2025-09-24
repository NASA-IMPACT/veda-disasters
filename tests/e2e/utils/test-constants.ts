export const TEST_CONSTANTS = {
  // URLs
  CATALOG_URL: '/data-catalog',
  EVENTS_PAGE_URL: '/events',
  HOME_PAGE_URL: '/',

  // Selectors
  SELECTORS: {
    CATALOG_CONTENT: '.tablet\\:grid-col-9',
    SEARCH_INPUT: 'input[type="search"]',
  },

  // Timeouts
  TIMEOUTS: {
    SEARCH_DELAY: 1000,
  },
} as const;
