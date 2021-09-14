import { makeStyles } from "@material-ui/core"
import { Switch, Route, Redirect } from "react-router-dom"

import Root from "components/scaffold/Root"

import Home from "components/pages/Home"
import Admin from "components/pages/Admin"
import Overlay from "components/pages/Overlay"

import AdminRedirect from "components/common/AdminRedirect"
import SignedIn from "components/common/SignedIn"
import SignedOut from "components/common/SignedOut"

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
          <SignedIn>
            <Admin />
          </SignedIn>
          <SignedOut>
            <Redirect to="/" />
          </SignedOut>
        </Route>
        <Route>
          <SignedIn>
            <AdminRedirect />
          </SignedIn>
          <SignedOut>
            <Home />
          </SignedOut>
        </Route>
      </Switch>
    </Root>
  )
}

export default App
