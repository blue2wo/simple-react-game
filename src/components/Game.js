import * as React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { StyledContainer } from "../App";

const StyledGameUI = styled.div`
  /* background-color: #e2e2e2; */
  display: flex;
  justify-content: space-between;
  left: 50%;
  max-width: 800px;
  position: absolute;
  top: 100px;
  transform: translate(-50%, -50%);
  width: 100%;
`

const StyledCharacterInformation = styled.div`
  background-color: #e2e2e2;
  border: #d0d0d0;
  border-radius: 0.25rem;
  color: #757575;
  display: flex;
  flex-direction: column;
  /* font-size: 1.1rem; */
  /* margin: 5px 0; */
  max-width: 250px;
  /* padding: 5px 15px; */
  width: 100%;

  &.enemy-char-info {
    align-items: flex-end;
  }

  .character-name,
  .character-class {
    margin: 5px 10px;
  }

  .character-name {
    font-weight: 600;
    font-size: 1.3rem;
  }

  .character-class {
    font-size: 1rem;
    font-weight: 600;
  }
`

const StyledBar = styled.div`
  /* padding: 5px; */
  /* margin: 5px 0; */
  /* background-color: #d0d0d0; */
  color: white;
  height: 30px;
  position: relative;
  text-align: center;
  width: 100%;

  &:before {
    background-color: ${(props) => `${props.backgroundColour}`};
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: 0.3s ease;
    width: ${(props) => `${props.current}%`};
  }

  &:after {
    content: " ${(props) => `${props.current} / ${props.max}`} ";
    Color: #434343;
    left: 50%;
    position: absolute;
    top: 50%;
    transition: 0.3s ease;
    z-index: 100;
    transform: translate(-50%, -50%);
  }
`;

const StyledGameActions = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 375px;
  left: 50%;
  transform: translate(-50%, -50%);

  & > div {
    border: 1px solid #000000;
    padding: 25px;
    max-width: 300px;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
  }

  button {
    height: 30px;
    border: 1px solid #000000;
    margin: 5px 0;
    background-color: white;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      background-color: #e2e2e2;
    }
  }
`;

// Dont inderstand how the class gets applied  to the styledCharacterInformation
const CharacterInformation = ({ character, typeOfCharacter = "player" }) => (
  <StyledCharacterInformation className={typeOfCharacter === "enemy" && "enemy-char-info"}> 
    <span className="character-name">{character.name}</span>
    <span className="character-class">{character.class}</span>
    <StyledBar 
      current={character.currentHp} 
      max={character.maxHp} 
      contentDesc="HP : " 
      backgroundColour="#0f9d58"/>
    <StyledBar 
      current={character.rage} 
      max={character.maxRage} 
      contentDesc="ULT : " 
      backgroundColour="#007bff"/>

  </StyledCharacterInformation>
)

const Game = ({
  gameState,
  damageCharacter,
  healCharacter,
  castUltimate,
  gameEnded
}) => {
  const history = useHistory();

  React.useEffect(() => {
    if (gameEnded) {
      history.push("/end");
    }
  }, [gameEnded])

  return (
    <StyledContainer>
    <h1>Current turn: {gameState.isPlayerTurn ? "Players TURN" : "EnemyTURN"}</h1>
      <StyledGameUI>
        {Object.keys(gameState.characters).map((characterKey) => {
          // Object.keys returns array of the objects properties then .map iterates over it's elements
          const character = gameState.characters[characterKey];
          return (
            <StyledCharacterInformation>
              <CharacterInformation 
                character={character}
                typeOfCharacter={characterKey}
                key={character.id}
              />
            </StyledCharacterInformation>
          );
        })}
      </StyledGameUI>

      <StyledGameActions>
        <div>
          <button
            // disabled={true}
            onClick={() => damageCharacter(
                "player",
                "enemy",
                gameState.characters.player.damage
              )
            }
          >Attack
          </button>
          <button
            onClick={() => healCharacter("player")}
          >Heal
          </button>
          <button
          disabled={gameState.characters.player.rage < 100}
            onClick={() => castUltimate(
                "player",
                "enemy",
                gameState.characters.player.ultimateDamage
              )
            }
          >Ultimate
          </button>
        </div>
      </StyledGameActions>
    </StyledContainer>
  )
}

export default Game