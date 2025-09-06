import React from 'react';
import dynamic from 'next/dynamic';
import { getStoriesMetadata } from 'app/content/utils/mdx';

// @NOTE: Dynamically load to ensure only CSR since these depends on VedaUI ContextProvider for routing...
const StoriesHub = dynamic(() => import('./hub'), {
  ssr: false,
  loading: () => <p>Loading...</p>, // @NOTE @TODO: We need a loading state!!!
});

export default function Page() {
  const summaries = getStoriesMetadata().map((d) => ({
    ...d.metadata,
    path: `summaries/${d.slug}`,
  }));

  return (
    <div className='grid-container'>
      <div className='margin-top-8 margin-bottom-3'>
        <h1 className='font-sans-xl'>Activation Summaries</h1>
        <p className='font-sans-md margin-top-1'>
          This is a collection of activation summaries including resources developed by the Disasters program and a more detailed overview of each event.
        </p>
      </div>
      <StoriesHub stories={summaries} />
    </div>
  );
}
