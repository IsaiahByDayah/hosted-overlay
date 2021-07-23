import { makeStyles, Grid } from "@material-ui/core"
import cx from "clsx"

import Goals from "components/widgets/Goals"
import Tasks from "components/widgets/Tasks"
import StatusBar from "components/widgets/StatusBar"

import GreenScreen from "components/common/GreenScreen"

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(3),
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  screen: {
    flexShrink: 0,
    flexGrow: 0,
    marginBottom: spacing(3),
  },
  container: {
    flexGrow: 1,
  },
  statusBar: {
    marginBottom: spacing(2),
  },
}))

export interface MainSectionProps {
  className?: string
}

const MainSection = ({ className }: MainSectionProps) => {
  const classes = useStyles()

  return (
    <div className={cx(classes.root, className)}>
      <GreenScreen className={classes.screen} aspectRatio="16:9" />

      <Grid className={classes.container} container spacing={5}>
        <Grid item xs={9}>
          <StatusBar className={classes.statusBar} />

          <Tasks />
        </Grid>
        <Grid item xs={3}>
          <Goals />
        </Grid>
      </Grid>
    </div>
  )
}

export default MainSection