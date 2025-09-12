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
    default: 'Next.js VEDA Template Instance',
    template: '%s | Next.js VEDA Template Instance',
  },
  description: 'Next.js VEDA Template Instance.',
  openGraph: {
    title: 'Next.js VEDA Template Instance',
    description: 'Next.js VEDA Template Instance.',
    url: baseUrl,
    siteName: 'Next.js VEDA Template Instance',
    locale: 'en_US',
    type: 'website',
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
                The Disasters Program is currently providing support for the{" "}
                <a
                  className="usa-link"
                  href="/data-catalog/ca-wildfires-2025"
                >
                  California Wildfires
                </a>{" "}
                affecting the Los Angeles metropolitan area.
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
