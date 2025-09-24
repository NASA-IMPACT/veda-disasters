import React from 'react';
import dynamic from 'next/dynamic';
import { getTransformedDatasetMetadata } from 'app/content/utils/mdx';

// @NOTE: Dynamically load to ensure only CSR since this depends ContextProviders for routing and etc...
const Catalog = dynamic(() => import('./catalog'), {
  ssr: false,
  loading: () => <p>Loading...</p>, // @NOTE @TODO: We need a loading state!!!
});

export default function Page() {
  const transformed = getTransformedDatasetMetadata();

  return (
    <div className='grid-container'>
      <section>
        <div className='margin-top-8 margin-bottom-3'>
          <h1 className='font-sans-xl'>Event Catalog</h1>
          <p className='font-sans-md margin-top-1'>
            This catalog serves as a central location for event-specific data and resources developed by the Disaster Response Coordination Office to support federal, state, and local disaster response.
          </p>
        </div>

        <Catalog datasets={transformed} />
      </section>
    </div>
  );
}
