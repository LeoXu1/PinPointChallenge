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

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/cityfinder" component={Home} />
          <Route exact path="/cityfinder/survival" component={SurvivalMode} />
          <Route path="/cityfinder/standard" component={StandardMode} />
        </Switch>
      </div>
    </Router>
  );
}
