import { ReactNode } from "react"
import {
  ThemeProvider,
  StyledEngineProvider,
  responsiveFontSizes,
  createTheme,
} from "@mui/material"

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
        mode: "dark",
        primary: {
          main: "#006d77",
          // main: "#1B335C",
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: "#ee6c4d",
        },

        background: {
          // default: "#edf6f9",
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
    })
  )

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  )
}

export default HostedOverlayThemeProvider
