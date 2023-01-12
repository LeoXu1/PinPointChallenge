import React from "react";
import { Link } from "react-router-dom";

import "./Home.css"

export default function Home() {
  return (
    <div className="main">
      <Link style={{textDecoration: 'none'}} to="/cityfinder/standard">
        <div className="card">
          <div className="infobox">
            <h4><b>Standard Mode</b></h4>
            <p>Try to minimize your total distance over ten rounds.</p>
          </div>
        </div>
      </Link>
      <Link style={{textDecoration: 'none'}} to="/cityfinder/survival">
        <div className="card">
          <div className="infobox">
            <h4><b>Survival Mode</b></h4>
            <p>Try to guess as many cities as possible before you run out of lives.</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
