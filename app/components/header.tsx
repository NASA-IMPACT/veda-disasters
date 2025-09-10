// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck : until veda-ui fixes its types: NavItem type enum
import React from "react";
import { PageHeader } from "@lib";
import { NavItem } from "@lib";
import NasaLogoColor from "app/components/nasa-logo-color.js";
import DisastersLogo from "app/components/nasa-disasters-logo-color.js";
import {
  DATASET_CATALOG_PATH,
  EVENTS_PATH,
  EXPLORATION_PATH,
  STORY_HUB_PATH,
} from "app/config";
import VedaUIConfigProvider from "app/store/providers/veda-ui-config";

export const navItems: NavItem[] = [
  {
    id: "data-catalog",
    title: "Activations Gallery",
    to: `/${DATASET_CATALOG_PATH}`,
    type: "internalLink",
  },
  {
    id: "exploration",
    title: "Data Visualization",
    to: `/${EXPLORATION_PATH}`,
    type: "internalLink",
  },
  {
    id: "events",
    title: "Event Summaries",
    to: `/${STORY_HUB_PATH}`,
    type: "internalLink",
  },
];

export const subNavItems: NavItem[] = [
  {
    id: "about",
    title: "About",
    to: "/about",
    type: "internalLink",
  },
  {
    id: "contact-us",
    title: "Contact us",
    actionId: "open-google-form",
    type: "action",
  },
];

export default function Header() {
  return (
    <VedaUIConfigProvider>
      <PageHeader
        title={"NASA Disasters Program"}
        mainNavItems={navItems}
        subNavItems={subNavItems}
        logoSvg={
          <div
            id="logo-container-link"
            className="display-flex flex-align-start flex-justify-start"
            style={{ gap: "0.5rem", lineHeight: 0 }}
          >
            {/* NASA meatball -> external site */}
            <a
              href="https://appliedsciences.nasa.gov"
              aria-label="NASA Applied Sciences (opens in new tab)"
              target="_blank"
              rel="noopener noreferrer"
              className="display-inline-block"
              style={{ lineHeight: 0 }}
            >
              <div
                style={{
                  transform: "scale(0.13)",
                  transformOrigin: "top left",
                  lineHeight: 0,
                }}
              >
                <NasaLogoColor />
              </div>
            </a>

            {/* Disasters logo -> this site's homepage */}
            <a
              href="/"
              aria-label="NASA Disasters homepage"
              className="display-inline-block"
              style={{ lineHeight: 0 }}
            >
              <div
                style={{
                  transform: "scale(0.13)",
                  transformOrigin: "top left",
                  lineHeight: 0,
                }}
              >
                <DisastersLogo />
              </div>
            </a>
          </div>
        }
      />
    </VedaUIConfigProvider>
  );
}
