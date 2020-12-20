import * as React from "react";
import { StyledContainer } from "../App";

const Game = (gameState) => {
  return (
    <StyledContainer>
      <p>{gameState.characters}</p>
    </StyledContainer>
  )
}

export default Game