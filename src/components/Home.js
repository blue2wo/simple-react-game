import * as React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

import { StyledContainer } from "../App";

const StyledMainMenu = styled.div`
  /* background-color: #d0d0d0; */
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  left: 50%;
  max-width: 400px;
  padding: 25px;
  position: absolute;
  top: 50vh;
  transform: translate(-50%, -50%);
  width: 100%;

  input,
  select {
    background-color: #e2e2e2;
    border: #d0d0d0;
    border-radius: 0.25rem;
    color: #757575;
    font-size: 1.1rem;
    height: 40px;
    margin: 5px 0;
    padding: 0 15px;
    outline-color: #d0d0d0;

    &::placeholder {
      color: #c72a31;
    }
  }

  option {
    padding: 1rem;
  }

  button {
    background-color: #0066aa;
    border: 1px solid #434343;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    height: 40px;
    font-size: 1.5rem;
    margin: 30px auto 0 auto;
    transition: 0.3s ease;
    width: 50%;
    
    a {
      color: #f8f8f8;
      text-decoration: none;
    }

    &:hover {
      background-color: #0066aa;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 16px 32px, rgba(0, 0, 0, 0.3) 0px 4px 8px;
      color: #f8f8f8;
    }
  }
`;

const Home = (player, handleOnNameChange) => {
  return (
    <StyledContainer>
      <StyledMainMenu>
        <input
          type="text"
          placeholder="Player Name"
          onChange={handleOnNameChange}
          value={player.name}
        />
        <select name="player-class">
          <option value="">Warrior</option>
          <option value="">Archer</option>
          <option value="">Mage</option>
        </select>
        <button>
          <Link to="/game">Play</Link>
        </button>
      </StyledMainMenu>
    </StyledContainer>
  )
}

export default Home