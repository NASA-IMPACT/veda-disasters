import React from 'react';
import type { Metadata } from 'next';
import { baseUrl } from './sitemap';
import dynamic from 'next/dynamic';
import './styles/index.scss';
import '@teamimpact/veda-ui/lib/main.css';

// @NOTE: Dynamically load to ensure only CSR since these depends on VedaUI ContextProvider for routing...
const Header = dynamic(() => import('./components/header'), {
  ssr: false,
  loading: () => <p>Loading...</p>, // @NOTE @TODO: We need a loading state!!!
});

const Footer = dynamic(() => import('./components/footer'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl ?? ''),
  title: {
    default: 'NASA Disasters Program',
    template: '%s | NASA Disasters Program',
  },
  description: 'NASA Disasters Program Partnership and Learning Portal',
  openGraph: {
    title: 'NASA Disasters Program',
    description: 'NASA Disasters Program',
    url: baseUrl,
    siteName: 'NASA Disasters Program',
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon:'/images/NASA_Insignia-RGB.svg'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="minh-viewport display-flex flex-column">
          <Header />

          {/* Global site-wide banners */}
          <div className="usa-alert usa-alert--error" role="alert">
            <div className="usa-alert__body">
              <h4 className="usa-alert__heading">Under Maintenance</h4>
              <p className="usa-alert__text">
                This website is currently being migrated. Some services and webpages may not work as expected.
              </p>
            </div>
          </div>

          <div className="usa-alert usa-alert--info" role="status" aria-live="polite">
            <div className="usa-alert__body">
              <h4 className="usa-alert__heading">Activation Status</h4>
              <p className="usa-alert__text">
                The Disasters Program is currently providing support for {" "}
                <a
                  className="usa-link"
                  href="/data-catalog/hurricane-milton-2024"
                >
                  Hurricane Milton
                </a>{" "}
                affecting the Florida peninsula.
              </p>
            </div>
          </div>

          <main id="pagebody" className="flex-fill" tabIndex={-1}>
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
