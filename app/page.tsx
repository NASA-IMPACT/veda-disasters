import React from 'react';
import Link from 'next/link';
import { getStoriesMetadata } from 'app/content/utils/mdx';

const featuredStories = getStoriesMetadata()
  .map((d) => ({
    ...d.metadata,
    path: `events/${d.slug}`,
  }))
  .filter((_d, idx) => idx < 3);

const topStory = featuredStories[0];
const otherStories = featuredStories.slice(1);

export default function HomePage() {
  return (
    <section>
      {/* Maintenance banner */}
      <div className="usa-alert usa-alert--error" role="alert">
        <div className="usa-alert__body">
          <h4 className="usa-alert__heading">Under Maintenance</h4>
          <p className="usa-alert__text">
            This website is currently being migrated. Some services and webpages may not work as expected.
          </p>
        </div>
      </div>

      {/* Activation banner */}
      <div className="usa-alert usa-alert--info" role="status">
        <div className="usa-alert__body">
          <h4 className="usa-alert__heading">Current Activations</h4>
          <p className="usa-alert__text">
            The Disasters Program is currently providing support for{' '}
            <a
              className="usa-link"
              href="https://deploy-preview-21--disasters-hub.netlify.app/events/ca-wildfires-2025"
            >
              California Wildfires
            </a>{' '}
            affecting the Los Angeles metropolitan area.
          </p>
        </div>
      </div>

      {/* HERO */}
      <div
        className="position-relative margin-bottom-4"
        aria-labelledby="hero-heading"
        style={{
          // TODO: replace with your actual image path
          backgroundImage: `url('/public/images/homepage/homepage-hero.jpg')`,
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
            A powerful interface for viewing, analyzing, and downloading the latest near real-time and
            disaster specific data products in Geographic Information Systems (GIS) format. The Disasters
            Mapping Portal supports NASA’s Earth Applied Sciences Disasters program area in its mission to
            use Earth-observing data and applied research to improve the prediction of, preparation for,
            response to and recovery from hazards and disasters around the world.
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
