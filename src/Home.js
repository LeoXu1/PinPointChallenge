import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./Home.css"

export default function Home() {
  return (
    <div className="main">
      <div className="card">
        <div className="container">
          <h4><b><Link style={{textDecoration: 'none'}} to="/cityfinder/standard">Standard Mode</Link></b></h4>
          <p>Try to minimize your total distance over ten rounds.</p>
        </div>
      </div>

      <div className="card">
        <div className="container">
          <h4><b><Link style={{textDecoration: 'none'}} to="/cityfinder/standard">Survival Mode</Link></b></h4>
          <p>Try to guess as many cities as possible before you run out of lives.</p>
        </div>
      </div>
    </div>
  );
}
