import { FC } from "react"
import { BrowserRouter } from "react-router-dom"
import { Box, BoxProps } from "@material-ui/core"

import CssBaselined from "components/scaffold/CssBaselined"
import ThemeProvider from "components/scaffold/ThemeProvider"
import AlertsProvider from "components/scaffold/AlertsProvider"
// import DrawerProvider from "components/scaffold/DrawerProvider"
import AuthProvider from "components/scaffold/AuthProvider"
// import AccountProvider from "components/scaffold/AccountProvider"

const Root: FC<BoxProps> = (props) => (
  <ThemeProvider>
    <CssBaselined>
      <BrowserRouter>
        <AuthProvider>
          {/* 
            <AccountProvider> */}
          <AlertsProvider>
            <Box id="scaffold-root" {...props} />
          </AlertsProvider>
          {/* </AccountProvider>
           */}
        </AuthProvider>
      </BrowserRouter>
    </CssBaselined>
  </ThemeProvider>
)

export default Root
