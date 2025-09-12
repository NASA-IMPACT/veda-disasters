import React from 'react';
import Link from 'next/link';
import { NavItem } from '@lib';
import NasaLogoColor from './nasa-logo-color';
import { PageFooter } from '@lib';
import VedaUIConfigProvider from 'app/store/providers/veda-ui-config';

export const navItems: NavItem[] = [
  {
    id: 'contact',
    title: 'Contact Us',
    to: 'mailto:hq-disasters-gis@mail.nasa.gov',
    type: 'externalLink',
  },
  {
    id: 'newsletter',
    title: 'Newsletter Signup',
    to: 'https://lp.constantcontactpages.com/su/tn3iEZN',
    type: 'externalLink',
  },
  {
    id: 'nasa',
    title: 'NASA Earth Science',
    to: 'https://science.nasa.gov/earth-science',
    type: 'externalLink',
  },
];

export default function Footer() {
  const defaultFooterSettings = {
    secondarySection: {
      division: 'NASA Earth Action 2025',
      version: 'BETA VERSION',
      title: 'NASA Official',
      name: 'Shanna McClain',
      to: 'shanna.n.mcclain@nasa.gov',
      type: 'email',
    },
    returnToTop: true,
  };

  return (
    <VedaUIConfigProvider>
      <PageFooter
        mainNavItems={navItems}
        subNavItems={}
        hideFooter={false}
        logoSvg={<NasaLogoColor />}
        footerSettings={defaultFooterSettings}
      />
    </VedaUIConfigProvider>
  );
}
