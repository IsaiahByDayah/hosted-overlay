import { makeStyles, Grid } from "@material-ui/core"
import { useParams } from "react-router-dom"

import useOverlay from "hooks/useOverlay"

import OverlayProvider from "components/scaffold/OverlayProvider"

import MainSection from "components/scaffold/MainSection"
import Sidebar from "components/scaffold/Sidebar"

const useStyles = makeStyles(() => ({
  fullheight: {
    height: "100vh",
  },
}))

const Overlay = () => {
  const classes = useStyles()
  const { userId } = useParams<{ userId?: string }>()
  const overlay = useOverlay(userId)

  // TODO: Show error if overlay == null

  return (
    <OverlayProvider overlay={overlay}>
      <Grid className={classes.fullheight} container>
        <Grid className={classes.fullheight} item xs={9}>
          <MainSection />
        </Grid>
        <Grid className={classes.fullheight} item xs={3}>
          <Sidebar />
        </Grid>
      </Grid>
    </OverlayProvider>
  )
}

export default Overlay
