import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./Header.css"

export default function Header() {
  return (
    <div className="header">
      <h2>City Finder</h2>
    </div>
  );
}
