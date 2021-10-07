import { ReactNode } from "react"
import { Theme, ThemeProvider, createTheme } from "@mui/material"

import { useOverlayContext } from "components/scaffold/OverlayProvider"

interface OverlayThemeProviderProps {
  children?: ReactNode
}
const OverlayThemeProvider = ({ children }: OverlayThemeProviderProps) => {
  const { overlay } = useOverlayContext()

  return (
    <ThemeProvider
      theme={(HOTheme: Theme) =>
        createTheme({
          ...HOTheme,
          palette: {
            ...HOTheme,
            mode: overlay?.defaultTheme?.mode ?? HOTheme.overlay.mode,
          },
          overlay: {
            ...HOTheme.overlay,
            ...overlay?.defaultTheme,
          },
        })
      }
    >
      {children}
    </ThemeProvider>
  )
}

export default OverlayThemeProvider
