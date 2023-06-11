import React from "react";
import { GameState } from "../game/game.model";
import { getNewGame } from "../game/game.reducer";

type AwesomeContextType = {
  game: GameState;
};

const GameContext = React.createContext<AwesomeContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const AwesomeContextProvider = ({ children }: Props) => {
  const [gameState, setGameState] = React.useState({
    game: getNewGame({
      yanivThreshold: 7,
      scoreLimit: 100,
      cardsPerPlayer: 5,
      moveTimeoutInMS: 30000,
      timeBetweenRoundsInMS: 10000,
    }),
  });

  return (
    <GameContext.Provider value={gameState}>{children}</GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = React.useContext(GameContext);

  if (!context)
    throw new Error("You need to use this hook inside a context provider");

  return context;
};
