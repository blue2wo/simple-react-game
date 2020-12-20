import * as React from "react";
import './App.css';
import styled from "styled-components";

import Router from './components/Router';

export const StyledContainer = styled.div`
  background: #f8f8f8;
  height: 100vh;
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
  const [gameState, setGameState] = React.useState({
    isPlayerTurn: true,
    characters: {
      player: {
        id: 0,
        name: "TestSPlayer",
        class: "Warrior",
        maxHp: 100,
        currentHp: 100,
        damage: 15,
        ultimateDamage: 50,
        rage: 0,
      },
      enemy: {
        id: 1,
        name: "Felipe",
        class: "Heavy Smoker",
        maxHp: 100,
        currentHp: 100,
        damage: 5,
        ultimateDamage: 95,
        rage: 0,
      },
    },
  });

  // TODO: handleOnNameChange
  const handleOnNameChange = (event) => {
    setGameState((state) => ({
      ...state, 
      characters: { 
        ...state.characters,
        player: { ...state.characters.player, name: event.target.value },
      },
    }));
  };

  return (
    <Router
      gameState={gameState} 
      handleOnNameChange={handleOnNameChange}
    />
  );
}

export default App;
