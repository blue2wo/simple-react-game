import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Home from "./Home";
import Game from "./Game";
import EndGame from "./EndGame";

const Router = ({
  gameState,
  handleOnNameChange,
  damageCharacter,
  healCharacter,
  castUltimate,
  gameEnded
}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home 
            player={gameState.characters.player}
            handleOnNameChange={handleOnNameChange}
          />
        </Route>
        <Route exact path="/game">
          <Game 
            gameState={gameState}
            // players={gameState.characters.player}
            damageCharacter={damageCharacter}
            healCharacter={healCharacter}
            castUltimate={castUltimate}
            gameEnded={gameEnded}
          />
        </Route>
        <Route exact path="/end">
          <EndGame 
            gameState={gameState}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;