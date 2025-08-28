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
      <div className='usa-alert usa-alert--info'>
        <div className='usa-alert__body'>
         <h4 className='usa-alert__heading'>Current Activations</h4>
          <p className='usa-alert__text'>
           The Disasters Program is currently providing support for the
           <a className='usa-link' href='https://disasters.openveda.cloud/events/ca-wildfire-2025'> California Wildfires </a>
          affecting the Los Angeles metropolitan area.
          </p>
        </div>
      </div>
      <div className='grid-container'>
        <div className='grid-row margin-top-5'>
          <h4>
          A powerful interface for viewing, analyzing, and downloading the latest near real-time and disaster specific data products in Geographic Information Systems (GIS) format. The Disasters Mapping Portal supports NASA’s Earth Applied Sciences Disasters program area in its mission to use Earth-observing data and applied research to improve the prediction of, preparation for, response to and recovery from hazards and disasters around the world.
          </h4>
        </div>

        <div className='grid-row margin-top-5'>
          <h2>Featured Events</h2>
        </div>
        <div className='grid-row grid-gap-md  margin-top-2'>
          <div className='tablet:grid-col-6'>
            <div
              className='card--homepage-topstory text-base-lightest radius-md display-flex flex-align-end padding-2'
              style={{ backgroundImage: `url(${topStory.media?.src})` }}
            >
              <div className='card--homepage-topstory-text'>
                <h3> {topStory.name}</h3>
                <p className='margin-top-1'> {topStory.description}</p>
              </div>
              <Link className='link--block' href={topStory.path} />
            </div>
          </div>
          <div className='tablet:grid-col-6'>
            {otherStories.map((d) => {
              return (
                <div key={d.id} className='grid-row'>
                  <div className='tablet:grid-col'>
                    <div
                      className='card--homepage-substory text-base-lightest radius-md display-flex flex-align-end padding-2'
                      style={{ backgroundImage: `url(${d.media?.src})` }}
                    >
                      <div className='card--homepage-topstory-text'>
                        <h3> {d.name}</h3>
                        <p className='margin-top-1'> {d.description}</p>
                      </div>
                      <Link className='link--block' href={d.path} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
