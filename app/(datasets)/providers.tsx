import React, { ReactNode } from 'react';
import DataProvider from 'app/store/providers/data';
import VedaUIConfigProvider from 'app/store/providers/veda-ui-config';
import DevseedUIThemeProvider from 'app/store/providers/theme';
import { DatasetMetadata } from 'app/types/content';

interface ProviderProps {
  events?: DatasetMetadata[];
  children: ReactNode;
}

export default function Providers({ events, children }: ProviderProps) {
  return (
    <DevseedUIThemeProvider>
      <VedaUIConfigProvider>
        {events ? (
          <DataProvider initialDatasets={events}>{children}</DataProvider>
        ) : (
          children
        )}
      </VedaUIConfigProvider>
    </DevseedUIThemeProvider>
  );
}
