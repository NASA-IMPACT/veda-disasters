'use client';
import React from 'react';
import { CatalogContent } from '@lib';
import { useFiltersWithQSNextJS } from '../../hooks/use-filters-with-qs-nextjs';
import Providers from '../providers';

/**
 * Catalog component that displays filtered datasets
 * @param datasets - Array of dataset objects to display
 */
export default function Catalog({ datasets }: { datasets: any }) {
  const controlVars = useFiltersWithQSNextJS();

  return (
    <Providers>
      <CatalogContent
        datasets={datasets}
        search={controlVars.search}
        onAction={controlVars.onAction}
        taxonomies={controlVars.taxonomies}
      />
    </Providers>
  );
}
