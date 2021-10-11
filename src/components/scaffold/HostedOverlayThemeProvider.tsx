import { ReactNode } from "react"
import {
  ThemeProvider,
  StyledEngineProvider,
  responsiveFontSizes,
  createTheme,
} from "@mui/material"

import { OverlayTheme } from "lib/types"

declare module "@mui/material/styles" {
  interface Theme {
    overlay: OverlayTheme
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    overlay?: Partial<OverlayTheme>
  }
}

interface HostedOverlayThemeProviderProps {
  children?: ReactNode
}

const HostedOverlayThemeProvider = ({
  children,
}: HostedOverlayThemeProviderProps) => {
  const theme = responsiveFontSizes(
    createTheme({
      typography: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
      },
      palette: {
        primary: {
          main: "#416788",
          // contrastText: "#FFFFFF",
        },
        secondary: {
          main: "#81D2C7",
        },

        background: {
          default: "#CDD1DF",
          paper: "#E0E0E2",
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
              fontWeight: "bold",
              letterSpacing: "1px",
            },
          },
        },
        MuiCssBaseline: {
          styleOverrides: {
            ".firebase-emulator-warning": {
              display: "none",
            },
          },
        },
      },
      overlay: {
        mode: "light",
        mainSection: "#FFFFFF",
        sidebar: "#C4C4C4",
        statusBar: "#FFFFFF",
        card: "#E1E1E1",
        progressBackground: "#E1E1E1",
        progressFill: "#3D3D3D",
        chromaKey: "#00FF00",
      },
    })
  )

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  )
}

export default HostedOverlayThemeProvider
