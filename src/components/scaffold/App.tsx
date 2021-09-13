import { makeStyles } from "@material-ui/core"
import { Switch, Route } from "react-router-dom"

import Root from "components/scaffold/Root"

import Admin from "components/pages/Admin"
import Overlay from "components/pages/Overlay"

const useStyles = makeStyles(() => ({
  root: {
    maxHeight: "100vh",
    maxWidth: "100vw",
  },
}))

const App = () => {
  const classes = useStyles()

  return (
    <Root className={classes.root}>
      <Switch>
        <Route exact path="/:userId/overlay">
          <Overlay />
        </Route>
        <Route path="/:userId">
          <Admin />
        </Route>
      </Switch>
    </Root>
  )
}

export default App
