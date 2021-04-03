import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";

import "./App.css";

import MapChart from "./MapChart";

import hundredkpluscities from "./hundredkpluscities"

export default class App extends React.Component {
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
      roundOver: false,
      rounds: [],
      score: 0,
      gameOver: false
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
    let cList = this.getRandom(hundredkpluscities, 10)
    this.setState({
      cities: cList,
      curCityLoc: [cList[0].LONGITUDE, cList[0].LATITUDE],
      curCityName: cList[0].CITY + ", " + cList[0].STATE_CODE
    })
    console.log(cList)
  }

  setGuessLoc = loc => {
    this.setState({
      guessLoc: loc
    })
  }

  submit() {
    let dist = Math.round(this.calcDistance(this.state.guessLoc, this.state.curCityLoc))
    let roundInfo = {
      num: this.state.curCityNum,
      city: this.state.curCityName,
      guess: this.state.guessLoc,
      cityLoc: this.state.curCityLoc,
      distance: dist
    }
    const newRounds = this.state.rounds.concat(roundInfo)
    this.setState({
      roundOver: true,
      showCity: true,
      curCityName: dist + " km",
      score: this.state.score + dist,
      rounds: newRounds
    })

  }

  nextRound() {
    if (this.state.curCityNum === 9) {
      this.setState({
        curCityName: "Game over. Final distance: "+this.state.score+ " km",
        gameOver: true
      })
    }
    else {
      let curNum = this.state.curCityNum + 1
      this.setState({
        curCityNum: curNum,
        curCityLoc: [this.state.cities[curNum].LONGITUDE, this.state.cities[curNum].LATITUDE],
        curCityName: this.state.cities[curNum].CITY + ", " + this.state.cities[curNum].STATE_CODE,
        roundOver: false,
        showCity: false
      })
    }
  }

  playAgain() {
    let cList = []
    for (var i = 0; i < 10; i++) {
      let item = hundredkpluscities[Math.floor(Math.random() * hundredkpluscities.length)];
      cList.push(item)
    }
    this.setState({
      cities: cList,
      curCityNum: 0,
      curCityLoc: [cList[0].LONGITUDE, cList[0].LATITUDE],
      curCityName: cList[0].CITY + ", " + cList[0].STATE_CODE,
      showCity: false,
      roundOver: false,
      rounds: [],
      score: 0,
      gameOver: false
    })
  }

  render() {
    return (
      <div className="base">
        {this.state.gameOver ? (
          <div className="container">
            <h5>Final Score: {this.state.score} km</h5>
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
                  <h5>{round.distance} km</h5>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="container">
            <h3>Standard Mode</h3>
            <p>Try to minimize your total distance over ten rounds.</p>
            <h5>Round {this.state.curCityNum+1}: {this.state.curCityName}</h5>
            <h5>Total distance: {this.state.score} km</h5>
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
          <MapChart setGuessLoc={this.setGuessLoc} showCity={this.state.showCity} curCityLoc={this.state.curCityLoc} guessLoc={this.state.guessLoc} setTooltipContent={this.setContent} />
          <ReactTooltip>{this.state.content}</ReactTooltip>
        </div>
      </div>
    );
  }


}
