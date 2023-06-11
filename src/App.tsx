import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

interface Symbol {
  color: "red" | "black";
  icon: "club" | "diamond" | "spade" | "heart";
}

/* card 2
 * score 2
 * text '2'
 * order 2
 *
 * card J
 * text 'J'
 * order 11
 * score 10

 ** card Joker
 * text 'Joker'
 * order 0
 * score 0
 *
 */

interface CardValue {
  score: number;
  text: string; // '2', '3' ..... '10', 'J', 'Q', 'K', 'A', 'Joker'
  order: number; // 0 - 13
}

interface Card {
  symbol: Symbol;
  value: CardValue;
}

interface AppState {
}
type Deck = Card[];

class App extends Component {
  deck: Card[] | undefined;

  constructor(props: AppState) {
    super(props);
    this.initializeDeck();
  }
  

  initializeDeck() {
    //deck: Card[] =
    //  //initialize deck
    //  //create deck
    //  [
    //    {
    //      symbol: {
    //        color: "red",
    //        icon: "heart",
    //      },
    //      value: {
    //        score: 2,
    //        text: "2",
    //        order: 2,
    //      },
    //    },
    //  ];
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to hello everyone this is the
            new yaniv.
          </p>
        </header>
      </div>
    );
  }
}

export default App;
