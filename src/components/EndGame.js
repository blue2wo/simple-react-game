import * as React from "react";

const EndGame = ({gameState}) => {
  return (
    <h1>{gameState.characters.player.currentHp <= 0 ? "YOU LOST" : "YOU WON"}</h1>
  )
}

export default EndGame;