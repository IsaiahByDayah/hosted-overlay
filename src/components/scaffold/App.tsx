import { Switch, Route, Redirect } from "react-router-dom"

import Root from "components/scaffold/Root"

import Home from "components/pages/Home"
import Admin from "components/pages/Admin"
import Overlay from "components/pages/Overlay"

import SignedIn from "components/common/SignedIn"

const App = () => {
  return (
    <Root sx={{ maxHeight: "100vh", maxWidth: "100vw" }}>
      <Switch>
        <Route exact path="/overlay/:userId">
          <Overlay />
        </Route>

        <Route path="/admin">
          <SignedIn>
            <Admin />
          </SignedIn>
        </Route>

        <Route>
          <Home />
        </Route>
      </Switch>
    </Root>
  )
}

export default App
