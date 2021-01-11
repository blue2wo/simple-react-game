import * as React from "react";
import './App.css';
import styled from "styled-components";

import Router from './components/Router';

export const StyledContainer = styled.div`
  background: #f8f8f8;
  height: 100vh;
  margin: 0 auto;
  width: 100%;
  
  
  /* & > h1 {
    padding: 15px 0;
    background-color: white;
    max-width: 480px;
    border: 1px solid #000000;
    margin: 0 auto;
    padding: 15px;
    text-align: center;
  } */
`;



function App() {
  // TODO: make state but not with everything. only stuff i'll be using at the time
  const [gameEnded, setGameEnded] = React.useState(false);
  const [gameState, setGameState] = React.useState({
    isPlayerTurn: true,
    characters: {
      player: {
        id: 0,
        name: "Test Player",
        class: "Warrior",
        maxHp: 100,
        currentHp: 60,
        damage: 15,
        ultimateDamage: 50,
        rage: 10,
        maxRage: 100,
      },
      enemy: {
        id: 1,
        name: "The Bad Man",
        class: "Mage",
        maxHp: 100,
        currentHp: 25,
        damage: 50,
        ultimateDamage: 95,
        rage: 20,
        maxRage: 100,
      },
    },
  });
  

  //! ENEMY AND CHANGE TURN LOGIC - have to use useEffect so this code is run everytime the state changes i.e. when we change the isPlayerTurn to false
  React.useEffect(() => {
    const enemy = gameState.characters.enemy;

    // console.log(gameState.isPlayerTurn)

    if (gameState.isPlayerTurn) {
      console.log("it's your turn")
    } else {
      console.log("it's the enemy's turn")
      setTimeout(() => {
        if (enemy.currentHp < enemy.maxHp / 3) {
          healCharacter("enemy");
        } else if (enemy.rage === 100) {
          castUltimate("enemy", "player", enemy.ultimateDamage)
        } else {
          damageCharacter("enemy", "player", enemy.damage)
        }
      }, 1000);
      
      setTimeout(() => {
        playerTurn(true)
      }, 1500);
    }
  }, [gameState.isPlayerTurn]);

  //! ALTERNATE CHANGE TURN PROPERTY
  const playerTurn = (playerTurnBoolean) => {
    setGameState((state) => ({
      ...state,
      isPlayerTurn: playerTurnBoolean,
    }))
  }

  //! HEAL LOGIC
  const healCharacter = (target) => {
    let currentHp = gameState.characters[target].currentHp + 25;
    let rage = gameState.characters[target].rage + 10;

    if(currentHp > gameState.characters[target].maxHp) {
      currentHp = gameState.characters[target].maxHp;
    }

    if (rage > 100){
      rage = 100;
    }

    setGameState((state) => ({
      ...state,
      characters: {
        ...state.characters,
        [target]: {...state.characters[target], currentHp: currentHp, rage: rage},
        // [target]: {...state.characters[target], rage: rage}
      }
    }));

    if (gameState.isPlayerTurn) {
      playerTurn(false);
    }
  };

  //! DAMAGE LOGIC
  const damageCharacter = (caster, target, damage) => {     
    const currentHp = gameState.characters[target].currentHp - damage;
    let rage = gameState.characters[caster].rage + 20;

    if (rage > 100) {
      rage = 100;
    }

    setGameState((state) => ({
      ...state,
      characters: {
        ...state.characters,
        [target]: {...state.characters[target], currentHp: currentHp},
        [caster]: {...state.characters[caster], rage: rage},
      }
    }));

    if (gameState.isPlayerTurn) {
      playerTurn(false);
    }
  };

  //! ULT LOGIC
  const castUltimate = (caster, target, damage) => {
    const currentHp = gameState.characters[target].currentHp - damage;
    const rage = 0;

    setGameState((state) => ({
      ...state,
      characters: {
        ...state.characters,
        [target]: {...state.characters[target], currentHp: currentHp},
        [caster]: {...state.characters[caster], rage: rage}
      }
    }));

    if (gameState.isPlayerTurn) {
      playerTurn(false);
    }
  };

  //! SET PLAYER NAME LOGIC
  const handleOnNameChange = (event) => {
    setGameState((state) => ({
      ...state, 
      characters: { 
        ...state.characters,
        player: { ...state.characters.player, name: event.target.value },
      },
    }));
  };

  //! END GAME LOGIC
  React.useEffect(() => {
    if (
      gameState.characters.player.currentHp <= 0 ||
      gameState.characters.enemy.currentHp <= 0
    ) {
      setGameEnded(true);
    }
  }, [gameState.characters.player.currentHp, gameState.characters.enemy.currentHp])

  // TODO: make isPlayerTurn so if not player turn buttons are diabled 
  // TODO: end game

  

  return (
    <Router
      gameState={gameState} 
      handleOnNameChange={handleOnNameChange}
      damageCharacter={damageCharacter}
      healCharacter={healCharacter}
      castUltimate={castUltimate}
      gameEnded={gameEnded}
    />
  );
}

export default App;
