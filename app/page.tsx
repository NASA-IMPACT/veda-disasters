import React from 'react';
import Link from 'next/link';
import { getStoriesMetadata } from 'app/content/utils/mdx';

const featuredStories = getStoriesMetadata()
  .map((d) => ({
    ...d.metadata,
    path: `data-catalog/${d.slug}`,
  }))
  .filter((_d, idx) => idx < 3);

const topStory = featuredStories[0];
const otherStories = featuredStories.slice(1);

export default function HomePage() {
  return (
    <section>
      {/* HERO */}
      <div
        className="position-relative margin-bottom-4"
        aria-labelledby="hero-heading"
        style={{
          // TODO: replace with your actual image path
          backgroundImage: `url('/images/homepage/homepage-hero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '52vh',
        }}
      >
        {/* overlay for contrast */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)',
          }}
        />

        {/* text */}
        <div className="grid-container position-relative" style={{ zIndex: 1 }}>
          <div className="grid-row">
            <div className="grid-col-12 tablet:grid-col-10 desktop:grid-col-8">
              <p className="text-uppercase text-white font-sans-xs margin-top-7 margin-bottom-1 letter-spacing-2">
                Disasters
              </p>

              <h1
                id="hero-heading"
                className="font-sans-3xl text-white line-height-sans-2 margin-0"
                style={{ fontWeight: 800 }}
              >
                <span
                  className="display-inline-block"
                  style={{
                    backgroundColor: '#E23C2E',
                    padding: '0.25em 0.5em',
                    marginRight: '0.25em',
                  }}
                >
                  ADVANCING
                </span>{' '}
                {/* keep SCIENCE and FOR together */}
                {'SCIENCE\u00A0FOR'}
                <br />
                DISASTER RESILIENCE
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Intro / description — larger text */}
      <div className="grid-container">
        <div className="grid-row margin-top-5">
          <p
            style={{
              fontSize: '1.25rem', // bump size (~20px)
              lineHeight: 1.6,
              margin: 0,
              maxWidth: '75ch',
            }}
          >
            The NASA Disasters Program advances science and builds tools to help communities make informed decisions for disaster planning. Before, during, and after disasters strike, the Disasters Program provides partners with actionable data to recover from disaster impacts and build resilient communities.
          </p>
        </div>

        <div className="grid-row margin-top-5">
          <h2>Featured Events</h2>
        </div>

        <div className="grid-row grid-gap-md margin-top-2">
          <div className="tablet:grid-col-6">
            <div
              className="card--homepage-topstory text-base-lightest radius-md display-flex flex-align-end padding-2"
              style={{ backgroundImage: `url(${topStory.media?.src})` }}
            >
              <div className="card--homepage-topstory-text">
                <h3>{topStory.name}</h3>
                <p className="margin-top-1">{topStory.description}</p>
              </div>
              <Link className="link--block" href={topStory.path} />
            </div>
          </div>

          <div className="tablet:grid-col-6">
            {otherStories.map((d) => (
              <div key={d.id} className="grid-row">
                <div className="tablet:grid-col">
                  <div
                    className="card--homepage-substory text-base-lightest radius-md display-flex flex-align-end padding-2"
                    style={{ backgroundImage: `url(${d.media?.src})` }}
                  >
                    <div className="card--homepage-topstory-text">
                      <h3>{d.name}</h3>
                      <p className="margin-top-1">{d.description}</p>
                    </div>
                    <Link className="link--block" href={d.path} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}