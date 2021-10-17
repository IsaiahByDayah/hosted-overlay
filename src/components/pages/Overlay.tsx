import { Grid } from "@mui/material"
import { useParams } from "react-router-dom"

import useOverlay from "hooks/useOverlay"

import OverlayThemeProvider from "components/scaffold/OverlayThemeProvider"
import OverlayProvider from "components/scaffold/OverlayProvider"
import AlertsProvider from "components/scaffold/AlertsProvider"
import MainSection from "components/scaffold/MainSection"
import Sidebar from "components/scaffold/Sidebar"

const Overlay = () => {
  const { userId } = useParams<{ userId?: string }>()
  const [overlay] = useOverlay(userId)

  // TODO: Show error if overlay == null

  return (
    <OverlayProvider overlay={overlay}>
      <OverlayThemeProvider>
        <AlertsProvider>
          <Grid sx={{ height: "100vh" }} container>
            <Grid sx={{ height: "100vh" }} item xs={9}>
              <MainSection />
            </Grid>
            <Grid sx={{ height: "100vh" }} item xs={3}>
              <Sidebar />
            </Grid>
          </Grid>
        </AlertsProvider>
      </OverlayThemeProvider>
    </OverlayProvider>
  )
}

export default Overlay
