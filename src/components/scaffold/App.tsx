import { makeStyles, Grid } from "@material-ui/core"

import Root from "components/scaffold/Root"
import MainSection from "components/scaffold/MainSection"
import Sidebar from "components/scaffold/Sidebar"

const useStyles = makeStyles(() => ({
  root: {
    maxHeight: "100vh",
    maxWidth: "100vw",
  },
  fullheight: {
    height: "100vh",
  },
}))

const App = () => {
  const classes = useStyles()

  return (
    <Root className={classes.root}>
      <Grid className={classes.fullheight} container>
        <Grid className={classes.fullheight} item xs={9}>
          <MainSection />
        </Grid>
        <Grid className={classes.fullheight} item xs={3}>
          <Sidebar />
        </Grid>
      </Grid>
    </Root>
  )
}

export default App
