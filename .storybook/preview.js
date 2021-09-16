// import "typeface-nunito/index.css"
import "bootstrap"

import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport"
import { MemoryRouter } from "react-router-dom"

import decorator from "lib/decorator"

import HostedOverlayThemeProvider from "components/scaffold/HostedOverlayThemeProvider"
import CssBaselined from "components/scaffold/CssBaselined"
import SnapshotStylesDecorator from "components/scaffold/SnapshotStylesDecorator"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    hideNoControlsWarning: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
}

export const globalTypes = {}

// NOTE: [Inner Most Decorator, ..., Outer Most Decorator]
export const decorators = [
  decorator(MemoryRouter),
  SnapshotStylesDecorator,
  decorator(CssBaselined),
  decorator(HostedOverlayThemeProvider),
]
