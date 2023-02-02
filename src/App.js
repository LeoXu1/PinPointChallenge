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
          <Route exact path="/cityfinder" component={Home} />
          <Route exact path="/cityfinder/survival" component={SurvivalMode} />
          <Route path="/cityfinder/standard" component={StandardMode} />
        </Switch>
      </div>
    </Router>
  );
}
