import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Home from "./Home";
import Game from "./Game";

const Router = ({
  gameState,
  handleOnNameChange,
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
          <Game />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;