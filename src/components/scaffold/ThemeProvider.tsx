import { FC } from "react"
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core"

const ThemeProvider: FC = ({ children }) => {
  const theme = responsiveFontSizes(
    createMuiTheme({
      typography: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
      },
      palette: {
        // type: "dark",
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
      overrides: {
        MuiButton: {
          label: {
            textTransform: "none",
            fontWeight: "bold",
            letterSpacing: "1px",
          },
        },
        MuiCssBaseline: {
          "@global": {
            ".firebase-emulator-warning": {
              display: "none",
            },
          },
        },
      },
    })
  )

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}

export default ThemeProvider
