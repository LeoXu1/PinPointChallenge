import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";

import "./App.css";

import MapChart from "./MapChart";

import hundredkpluscities from "./hundredkpluscities"
import levels from "./levels"

export default class SurvivalMode extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      content: "",
      cities: [],
      guessLoc: [-98.6, 39.8],
      step: 1,
      showCity: false,
      curCityLoc: [],
      curCityName: "",
      curCityNum: 0,
      curCityID: 0,
      roundOver: false,
      rounds: [],
      score: 0,
      gameOver: false,
      lives: 5,
      level: levels[0],
    }
  }

  calcDistance(city, guess) {
    const R = 6371e3; // metres
    const p1 = city[1] * Math.PI/180; // φ, λ in radians
    const p2 = guess[1] * Math.PI/180;
    const dp = (guess[1]-city[1]) * Math.PI/180;
    const dl = (guess[0]-city[0]) * Math.PI/180;

    const a = Math.sin(dp/2) * Math.sin(dp/2) +
              Math.cos(p1) * Math.cos(p2) *
              Math.sin(dl/2) * Math.sin(dl/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return Math.floor(d)/1000;
  }

  getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

  componentDidMount() {
    let city = hundredkpluscities[Math.floor(Math.random() * hundredkpluscities.length)];
    this.setState({
      cities: hundredkpluscities,
      curCityLoc: [city.LONGITUDE, city.LATITUDE],
      curCityName: "Find: "+city.CITY + ", " + city.STATE_CODE,
      curCityID: city.ID
    })
  }

  setGuessLoc = loc => {
    this.setState({
      guessLoc: loc
    })
  }

  submit() {
    let dist = Math.round(this.calcDistance(this.state.guessLoc, this.state.curCityLoc))
    if (this.state.curCityName.endsWith("AK")) {
      dist = Math.round(dist * 0.35)
    }
    if (dist < this.state.level.bonusThreshold) {
      let roundInfo = {
        num: this.state.curCityNum,
        city: this.state.curCityName,
        guess: this.state.guessLoc,
        cityLoc: this.state.curCityLoc,
        distance: dist,
        success: true
      }
      const newRounds = this.state.rounds.concat(roundInfo)
      this.setState({
        roundOver: true,
        showCity: true,
        curCityName: dist + " km. Amazing! +1 life.",
        score: this.state.score + 1,
        lives: this.state.lives + 1,
        rounds: newRounds,
        cities: this.state.cities.filter(c => c.ID !== this.state.curCityID)
      })
    }
    else if (dist < this.state.level.threshold) {
      let roundInfo = {
        num: this.state.curCityNum,
        city: this.state.curCityName,
        guess: this.state.guessLoc,
        cityLoc: this.state.curCityLoc,
        distance: dist,
        success: true
      }
      const newRounds = this.state.rounds.concat(roundInfo)
      this.setState({
        roundOver: true,
        showCity: true,
        curCityName: dist + " km. Good job!",
        score: this.state.score + 1,
        rounds: newRounds,
        cities: this.state.cities.filter(c => c.ID !== this.state.curCityID)
      })
    }
    else {
      let roundInfo = {
        num: this.state.curCityNum,
        city: this.state.curCityName,
        guess: this.state.guessLoc,
        cityLoc: this.state.curCityLoc,
        distance: dist,
        success: false
      }
      const newRounds = this.state.rounds.concat(roundInfo)
      this.setState({
        roundOver: true,
        showCity: true,
        curCityName: dist + " km. Too far. You lost a life.",
        lives: this.state.lives - 1,
        rounds: newRounds,
        cities: this.state.cities.filter(c => c.ID !== this.state.curCityID)
      })
    }

  }

  nextRound() {
    if (this.state.lives === 0) {
      this.setState({
        curCityName: "Game over. Final score: "+this.state.score,
        gameOver: true
      })
    }
    else {
      let city = this.state.cities[Math.floor(Math.random() * this.state.cities.length)];
      this.setState({
        curCity: city,
        curCityLoc: [city.LONGITUDE, city.LATITUDE],
        curCityName: "Find: "+city.CITY + ", " + city.STATE_CODE,
        curCityID: city.ID,
        roundOver: false,
        showCity: false
      })
      if (this.state.score === this.state.level.scoreNeeded && this.state.level.number !== 5) {
        this.setState({
          level: levels[this.state.level.number]
        })
      }
    }
  }

  playAgain() {
    let city = hundredkpluscities[Math.floor(Math.random() * hundredkpluscities.length)];
    this.setState({
      cities: hundredkpluscities,
      curCityLoc: [city.LONGITUDE, city.LATITUDE],
      curCityName: city.CITY + ", " + city.STATE_CODE,
      curCityID: city.ID,
      showCity: false,
      roundOver: false,
      rounds: [],
      score: 0,
      lives: 5,
      level: levels[0],
      gameOver: false
    })
  }

  render() {
    return (
      <div className="base">
        {this.state.gameOver ? (
          <div className="container">
            <Link style={{ textDecoration: 'none' }} to="/cityfinder">
              <button>Back</button>
            </Link>
            <h5>Final Score: {this.state.score}</h5>
            <h5>Level: {this.state.level.number}</h5>
            <button onClick={() => this.playAgain()}>Play Again</button>
            <div className="resultsList">
              {this.state.rounds.map(round => (
                <div key={round.num}
                className="roundEntry"
                onClick={() => this.setState({
                  curCityLoc: round.cityLoc,
                  guessLoc: round.guess,
                })}
                >
                  <h5>{round.city}</h5>
                  {round.success ? (
                    <>
                      <h5>Success - {round.distance} km</h5>
                    </>
                  ) : (
                    <>
                      <h5>Failure - {round.distance} km</h5>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="container">
            <Link style={{ textDecoration: 'none' }} to="/cityfinder">
              <button>Back</button>
            </Link>
            <h1>Survival Mode</h1>
            <p>Try to guess as many cities as possible before you run out of lives.</p>
            <h2>Level: {this.state.level.number}</h2>
            <p>{this.state.level.description}</p>
            {this.state.level.bonusAllowed ? (
              <h3>
                Score: {this.state.score}
                <br></br>
                Lives: {this.state.lives}
                <br></br>
                <hr></hr>
                {this.state.curCityName}
                <br></br>
                <hr></hr>
                Distance required: Within {this.state.level.threshold} km
                <br></br>
                Bonus if within {this.state.level.bonusThreshold} km
              </h3>
            ) : (
              <h3>
                Score: {this.state.score}
                <br></br>
                Lives: {this.state.lives}
                <br></br>
                <hr></hr>
                {this.state.curCityName}
                <br></br>
                Distance required: Within {this.state.level.threshold} km
              </h3>
            )}

            {this.state.roundOver ? (
              <>
                <button onClick={() => this.nextRound()}>Next</button>
              </>
            ) : (
              <>
                <button onClick={() => this.submit()}>Submit</button>
              </>
            )}
          </div>
        )}
        <div className="map">
          <MapChart mode={this.state.level.map} setGuessLoc={this.setGuessLoc} showCity={this.state.showCity} curCityLoc={this.state.curCityLoc} guessLoc={this.state.guessLoc} setTooltipContent={this.setContent} />
          <ReactTooltip>{this.state.content}</ReactTooltip>
        </div>
      </div>
    );
  }


}
