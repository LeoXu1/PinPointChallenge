import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import StandardMode from "./StandardMode"
import SurvivalMode from "./SurvivalMode"
import Home from "./Home"
import Header from "./Header"

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/PinPointChallenge" component={Home} />
          <Route exact path="/PinPointChallenge/survival" component={SurvivalMode} />
          <Route path="/PinPointChallenge/standard" component={StandardMode} />
        </Switch>
      </div>
    </Router>
  );
}
