import React from 'react';
import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { getDatasets } from 'app/content/utils/mdx';
import { PageHero, LegacyGlobalStyles } from '@lib';
import Providers from 'app/(datasets)/providers';

export default function DatasetOverviewPage({ params }: { params: any }) {
  const event = getDatasets().find((event) => event.slug === params.slug);

  if (!event) {
    notFound();
  }

  return (
    <section>
      <article className='prose'>
        <Providers>
          <LegacyGlobalStyles />
          <PageHero
            title={event.metadata.name}
            description={event.metadata.description}
            coverSrc={event.metadata.media?.src}
            coverAlt={event.metadata.media?.alt}
          />
        </Providers>
        <CustomMDX source={event.content} />
      </article>
    </section>
  );
}
