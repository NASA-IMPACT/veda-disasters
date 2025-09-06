'use client';
import React from 'react';
import { CatalogContent, useFiltersWithQS } from '@lib';
import Providers from '../providers';

export default function Catalog({ events }: { events: any }) {
  const controlVars = useFiltersWithQS();

  return (
    <Providers>
      <CatalogContent
        events={events}
        search={controlVars.search}
        onAction={controlVars.onAction}
        taxonomies={controlVars.taxonomies}
      />
    </Providers>
  );
}
