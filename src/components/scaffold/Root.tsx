import { FC } from "react"
import { BrowserRouter } from "react-router-dom"
import { Box, BoxProps } from "@mui/material"

import CssBaselined from "components/scaffold/CssBaselined"
import HostedOverlayThemeProvider from "components/scaffold/HostedOverlayThemeProvider"
import AuthProvider from "components/scaffold/AuthProvider"

const Root: FC<BoxProps> = (props) => (
  <HostedOverlayThemeProvider>
    <CssBaselined>
      <BrowserRouter>
        <AuthProvider>
          <Box id="scaffold-root" {...props} />
        </AuthProvider>
      </BrowserRouter>
    </CssBaselined>
  </HostedOverlayThemeProvider>
)

export default Root
