import Link from 'next/link'
import NasaLogoColor from './nasa-logo-color.js'
import DisastersLogo from './disasters-logo-color.js'

export default function Header() {
  return (
    <header className="usa-header usa-header--basic">
      <div className="usa-nav-container display-flex flex-justify flex-align-center padding-x-2">
        {/* Logos on the left */}
        <div className="display-flex flex-align-center">
          <a
            href="https://appliedsciences.nasa.gov"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NASA Applied Sciences"
            className="margin-right-2"
          >
            <NasaLogoColor />
          </a>
          <Link href="/" aria-label="NASA Disasters Program">
            <DisastersLogo />
          </Link>
        </div>

        {/* Title in the middle */}
        <div className="flex-auto text-center">
          <h1 className="usa-logo__text">
            NASA Disasters Program{' '}
            <span className="usa-tag bg-secondary-dark text-white">BETA</span>
          </h1>
        </div>

        {/* Right-side nav links */}
        <nav className="usa-nav">
          <ul className="usa-nav__primary">
            <li className="usa-nav__primary-item">
              <Link href="/about">About</Link>
            </li>
            <li className="usa-nav__primary-item">
              <Link href="/contact">Contact us</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Secondary nav */}
      <nav className="usa-nav-submenu">
        <ul className="usa-nav__secondary">
          <li><Link href="/activations">Activations Gallery</Link></li>
          <li><Link href="/visualizations">Data Visualization</Link></li>
          <li><Link href="/summaries">Event Summaries</Link></li>
        </ul>
      </nav>
    </header>
  )
}
