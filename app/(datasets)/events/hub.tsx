'use client';
import React from 'react';
import { StoriesHubContent, useFiltersWithQS } from '@lib';
import Providers from '../providers';

export default function Hub({ events: allStories }: { events: any }) {
  const controlVars = useFiltersWithQS();

  return (
    <Providers>
      <StoriesHubContent
        allStories={allStories}
        onFilterchanges={() => controlVars}
        storiesString={{
          one: 'event',
          other: 'events',
        }}
      />
    </Providers>
  );
}
