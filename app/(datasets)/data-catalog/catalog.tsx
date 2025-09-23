'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CatalogContent, useFiltersWithQS } from '@lib';
import Providers from '../providers';

/**
 * Catalog component that displays filtered datasets
 * @param datasets - Array of dataset objects to display
 */
export default function Catalog({ datasets }: { datasets: any }) {
  const controlVars = useFiltersWithQS();
  const searchParams = useSearchParams();
  const [urlKey, setUrlKey] = useState(0);

  // Force re-render when query parameters change
  // This ensures the catalog updates when header navigation changes URL params
  // since Next.js doesn't re-render on query-only changes
  useEffect(() => {
    setUrlKey((prev) => prev + 1);
  }, [searchParams]);

  return (
    <Providers>
      <CatalogContent
        key={urlKey} // Force re-render when URL changes
        datasets={datasets}
        search={controlVars.search}
        onAction={controlVars.onAction}
        taxonomies={controlVars.taxonomies}
      />
    </Providers>
  );
}
