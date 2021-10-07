import { FC } from "react"
import { BrowserRouter } from "react-router-dom"
import { Box, BoxProps } from "@mui/material"

import CssBaselined from "components/scaffold/CssBaselined"
import HostedOverlayThemeProvider from "components/scaffold/HostedOverlayThemeProvider"

const Root: FC<BoxProps> = (props) => (
  <HostedOverlayThemeProvider>
    <CssBaselined>
      <BrowserRouter>
        <Box id="scaffold-root" {...props} />
      </BrowserRouter>
    </CssBaselined>
  </HostedOverlayThemeProvider>
)

export default Root
