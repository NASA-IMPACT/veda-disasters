'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useQsStateCreator from '@teamimpact/veda-ui/node_modules/qs-state-hook/dist/index.js';
import { omit, set } from 'lodash';

/**
 * Available filter actions for the catalog
 */
export enum FilterActions {
  TAXONOMY_MULTISELECT = 'taxonomy_multiselect',
  CLEAR = 'clear',
  SEARCH = 'search',
  TAXONOMY = 'taxonomy',
  CLEAR_TAXONOMY = 'clear_taxonomy',
  CLEAR_SEARCH = 'clear_search',
}

/**
 * Function type for handling filter actions
 * @param action - The filter action to perform
 * @param value - Optional value for the action
 */
export type FilterAction = (action: FilterActions, value?: any) => void;

/**
 * Result interface for the useFiltersWithQSNextJS hook
 */
export interface UseFiltersWithQueryResult {
  /** Current search query string */
  search: string;
  /** Current taxonomy filters as key-value pairs */
  taxonomies: Record<string, string[]> | Record<string, never>;
  /** Function to perform filter actions */
  onAction: FilterAction;
}

const OPTION_ALL = { id: 'all' };

/**
 * Next.js-compatible hook for managing URL-based filters in the data catalog.
 *
 * This hook replaces the original useFiltersWithQS to work properly with Next.js routing.
 * It uses router.push() instead of window.history.pushState() to ensure proper React
 * re-renders and Next.js navigation behavior.
 *
 * @returns Object containing current filter state and action handler
 *
 * @example
 * ```tsx
 * function CatalogPage() {
 *   const { search, taxonomies, onAction } = useFiltersWithQSNextJS();
 *
 *   const handleSearch = (query: string) => {
 *     onAction(FilterActions.SEARCH, query);
 *   };
 *
 *   const handleTaxonomyFilter = (key: string, value: string) => {
 *     onAction(FilterActions.TAXONOMY, { key, value });
 *   };
 * }
 * ```
 */
export function useFiltersWithQSNextJS(): UseFiltersWithQueryResult {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [urlKey, setUrlKey] = useState(0);

  /**
   * Creates the qs-state hook with Next.js-compatible URL updates
   */
  const useQsState = useQsStateCreator({
    commit: ({ search }) => {
      if (typeof window === 'undefined') return;

      const currentUrl = new URL(window.location.href);

      // Only update URL if search parameters are provided
      if (search && search !== '?') {
        const cleanSearch = search.startsWith('?') ? search.slice(1) : search;
        currentUrl.search = cleanSearch;
      }

      const fullPath =
        currentUrl.pathname + currentUrl.search + currentUrl.hash;
      router.push(fullPath);
    },
  });

  // Search state management
  const [search, setSearch] = useQsState.memo(
    {
      key: FilterActions.SEARCH,
      default: '',
    },
    [urlKey],
  );

  // Taxonomy state management with JSON serialization
  const [taxonomies, setTaxonomies] = useQsState.memo(
    {
      key: FilterActions.TAXONOMY,
      default: {},
      dehydrator: (v) => JSON.stringify(v),
      hydrator: (v) => (v ? JSON.parse(v) : {}),
    },
    [urlKey],
  );

  /**
   * Manual hydration fallback to ensure taxonomies are loaded from URL
   * This handles cases where qs-state-hook doesn't properly hydrate
   */
  useEffect(() => {
    const taxonomyParam = searchParams.get('taxonomy');
    if (!taxonomyParam) return;

    try {
      const parsedTaxonomy = JSON.parse(taxonomyParam);
      const isEmpty = Object.keys(taxonomies || {}).length === 0;
      const isDifferent =
        JSON.stringify(taxonomies) !== JSON.stringify(parsedTaxonomy);

      if (isEmpty || isDifferent) {
        setTaxonomies(parsedTaxonomy);
      }
    } catch {
      // Silently handle JSON parsing errors
    }
  }, [searchParams, taxonomies, setTaxonomies]);

  /**
   * Force re-render when URL search parameters change
   */
  useEffect(() => {
    setUrlKey((prev) => prev + 1);
  }, [searchParams]);

  /**
   * Handles taxonomy multiselect operations
   */
  const handleTaxonomyMultiselect = useCallback(
    (key: string, value: string) => {
      if (!taxonomies || !(key in taxonomies)) {
        setTaxonomies(set({ ...taxonomies }, key, [value]));
        return;
      }

      const currentValues = Array.isArray(taxonomies[key])
        ? (taxonomies[key] as string[])
        : [taxonomies[key] as string];

      if (currentValues.includes(value)) {
        // Remove value
        const updatedValues = currentValues.filter((x) => x !== value);
        if (updatedValues.length > 0) {
          setTaxonomies(set({ ...taxonomies }, key, updatedValues));
        } else {
          setTaxonomies(omit(taxonomies, key));
        }
      } else {
        // Add value
        setTaxonomies(set({ ...taxonomies }, key, [...currentValues, value]));
      }
    },
    [taxonomies, setTaxonomies],
  );

  /**
   * Main action handler for all filter operations
   */
  const onAction = useCallback<FilterAction>(
    (action, value) => {
      switch (action) {
        case FilterActions.CLEAR:
          setSearch('');
          setTaxonomies({});
          break;

        case FilterActions.SEARCH:
          setSearch(value);
          break;

        case FilterActions.CLEAR_TAXONOMY:
          setTaxonomies({});
          break;

        case FilterActions.CLEAR_SEARCH:
          setSearch('');
          break;

        case FilterActions.TAXONOMY: {
          const { key, value: val } = value;
          if (val === OPTION_ALL.id) {
            setTaxonomies(omit(taxonomies, key));
          } else {
            setTaxonomies(set({ ...taxonomies }, key, val));
          }
          break;
        }

        case FilterActions.TAXONOMY_MULTISELECT: {
          const { key, value: val } = value;
          handleTaxonomyMultiselect(key, val);
          break;
        }

        default:
          break;
      }
    },
    [setSearch, setTaxonomies, taxonomies, handleTaxonomyMultiselect],
  );

  return {
    search: search ?? '',
    taxonomies: taxonomies ?? {},
    onAction,
  };
}
