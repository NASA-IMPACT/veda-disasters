// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck : until veda-ui fixes its types: NavItem type enum
import React from 'react';
import { PageHeader } from '@lib';
import { NavItem } from '@lib';
import NasaLogoColor from 'app/components/nasa-logo-color.js';
//Official Disasters logo coloring
//import DisastersLogoColor from 'app/components/nasa-disasters-logo-color.js'; 
//Alternate blackout Disasters logo for example
import {
  DATASET_CATALOG_PATH,
  EVENTS_PATH,
  EXPLORATION_PATH,
  STORY_HUB_PATH,
} from 'app/config';
import VedaUIConfigProvider from 'app/store/providers/veda-ui-config';

export const navItems: NavItem[] = [
    {
    id: 'current',
    title: 'Current Data',
    to: `/${EXPLORATION_PATH}?datasets=%5B%5D&taxonomy=%7B"Product+Type"%3A%5B"nrt"%5D%7D`,
    type: 'internalLink',
  },
  {
    id: 'hazards',
    title: 'Hazards',
    type: 'dropdown',
    children: [
      {
        id: 'cyclones',
        title: 'Tropical Cyclones',
        to: `/${DATASET_CATALOG_PATH}?taxonomy=%7B"Disaster"%3A%5B"hurricanes_and_cyclones"%5D%7D`,
        type: 'internalLink',
      },
     {
        id: 'fires',
        title: 'Wildfires',
        to: `/${DATASET_CATALOG_PATH}?taxonomy=%7B"Disaster"%3A%5B"wildfires"%5D%7D`,
        type: 'internalLink',
      },
     {
        id: 'floods',
        title: 'Floods',
        to: `/${DATASET_CATALOG_PATH}?taxonomy=%7B"Disaster"%3A%5B"floods"%5D%7D`,
        type: 'internalLink',
      },
     {
        id: 'earthquakes',
        title: 'Earthquakes',
        to: `/${DATASET_CATALOG_PATH}?taxonomy=%7B"Disaster"%3A%5B"earthquakes"%5D%7D`,
        type: 'internalLink',
      },
    ],
  },
  {
    id: 'events',
    title: 'Events',
    to: `/${STORY_HUB_PATH}`,
    type: 'internalLink',
  },
];

export const subNavItems: NavItem[] = [
  {
    id: 'about',
    title: 'About',
    to: '/about',
    type: 'internalLink',
  },
  {    
    id: 'contact',
    title: 'Contact Us',
    to: 'mailto:brian.m.freitag@nasa.gov',
    type: 'externalLink',
  }
];

export default function Header() {
  return (
    <VedaUIConfigProvider>
      <PageHeader
        title={'NASA Disasters Program'}
        mainNavItems={navItems}
        subNavItems={subNavItems}
        logoSvg={
          <div id='logo-container-link'>
            {/*
              USWDS targets only <a> tags for styling links. However when the text is a <span>
              instead of a link, it does not inherit the color styling (it ends up being white).
              To fix this, we must add the color inline like this.
              TODO: Ideally we can address this on the veda-ui side so that the color applies to all elements within the logo.
            */}
            <NasaLogoColor />
          </div>
        }
      />
    </VedaUIConfigProvider>
  );
}
