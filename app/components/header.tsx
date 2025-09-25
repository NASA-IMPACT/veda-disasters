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

const createTaxonomyUrl = (disaster: string) => {
  const taxonomy = JSON.stringify({ Disaster: [disaster] });
  return `/${DATASET_CATALOG_PATH}?taxonomy=${encodeURIComponent(taxonomy)}`;
};

const createExplorationUrl = (product: string) => {
  const exploreTaxonomy = JSON.stringify({ 'Product Type': [product] });
  return `/${EXPLORATION_PATH}?taxonomy=${encodeURIComponent(exploreTaxonomy)}`;
};

export const navItems: NavItem[] = [
  {
    id: 'current',
    title: 'Current Data',
    to: createExplorationUrl('nrt'),
    type: 'internalLink',
  },
  {
    id: 'hazards',
    title: 'Hazards',
    // @ts-expect-error until veda-ui fixes its types: NavItem type enum (see https://github.com/NASA-IMPACT/veda-ui/issues/1882)
    type: 'dropdown',
    children: [
      {
        id: 'cyclones',
        title: 'Tropical Cyclones',
        to: createTaxonomyUrl('hurricanes_and_cyclones'),
        type: 'internalLink',
      },
      {
        id: 'fires',
        title: 'Wildfires',
        to: createTaxonomyUrl('wildfire'),
        type: 'internalLink',
      },
      {
        id: 'floods',
        title: 'Floods',
        to: createTaxonomyUrl('floods'),
        type: 'internalLink',
      },
      {
        id: 'earthquakes',
        title: 'Earthquakes',
        to: createTaxonomyUrl('earthquakes'),
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
  {
    id: 'connect',
    title: 'Connect',
    // @ts-expect-error until veda-ui fixes its types: NavItem type enum (see https://github.com/NASA-IMPACT/veda-ui/issues/1882)
    type: 'dropdown',
    children: [
      {
        id: 'newsletter',
        title: 'Newsletter',
        href: 'https://lp.constantcontactpages.com/su/tn3iEZN',
        type: 'externalLink',
      },
      {
        id: 'activate',
        title: 'Request Activation',
        to: '/home',
        type: 'internalLink',
      },
      {
        id: 'contact',
        title: 'Contact Us',
        href: 'mailto:hq-disasters-gis@mail.nasa.gov',
        type: 'externalLink',
      },
      {
        id: 'feedback',
        title: 'Feedback',
        href: 'https://docs.google.com/forms/d/e/1FAIpQLSeCriSetRerEObzaJh0O3hv0-12oWrff_kjTxesgmJgkuOD7g/viewform',
        type: 'externalLink',
      },
    ],
  },
];

export const subNavItems: NavItem[] = [
  {
    id: 'about',
    title: 'About',
    to: '/about',
    type: 'internalLink',
  },
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
