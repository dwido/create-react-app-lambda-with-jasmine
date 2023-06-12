import {
  Card,
  cardsScore,
  CardSymbol,
  CardSymbolEnum,
  CardSymbolsMap,
  CardValue,
  CardValueEnum,
  CardValuesMap,
  GameConfig,
  GameState,
  GameStatus,
  getThrownCards,
  Move,
  Player,
  PlayerRoundScore,
  RoundResult,
} from "./game.model";

export function getNewGame(config: GameConfig, player?: Player): GameState {
  return {
    config,
    players: [player],
    deckNumberOfCards: 0,
    deck: [],
    roundsResults: [],
    moves: [],
    status: GameStatus.pending,
  } as GameState;
}

export function addPlayer(gameState: GameState, player: Player): GameState {
  const newState = { ...gameState };
  newState.players.push(player);
  return newState;
}

export function makeMove(
  gameState: GameState,
  thrownCards: Card[],
  cardToTake: Card | null = null
): GameState {
  const newState = { ...gameState };
  newState.status = GameStatus.move;
  const takeFromDeck = !cardToTake;
  const currentPlayer = newState.currentPlayer as Player;
  currentPlayer.cards = currentPlayer?.cards?.filter(
    (c) => !thrownCards.includes(c)
  );
  const drawnCard = takeFromDeck
    ? getCardFromDeck(newState)
    : getCardFromPile(newState, cardToTake as Card);
  thrownCards.forEach((card) => (card.selected = false));
  newState.moves.push({ cards: thrownCards } as Move);
  currentPlayer.cards?.push(drawnCard);
  setNextPlayer(newState);
  return newState;
}

export function yaniv(gameState: GameState): GameState {
  const newState = { ...gameState };
  const currentPlayer = newState.currentPlayer as Player;
  const otherPlayers = getActivePlayers(newState).filter(
    (player) => player.id !== currentPlayer.id
  );
  const winnerByScore = getMinScoreWinners(otherPlayers, currentPlayer);
  const asaf = winnerByScore.id !== currentPlayer.id;
  const playersRoundScores = calculateRoundScores(
    newState,
    currentPlayer,
    asaf
  );
  const winner = getRoundResultWinner(playersRoundScores);
  const roundResult = { winner, asaf, playersRoundScores } as RoundResult;
  newState.roundsResults.push(roundResult);
  newState.status = GameStatus.yaniv;
  return newState;
}

export function getRoundResultWinner(
  playersRoundScores: PlayerRoundScore[]
): Player {
  const minDiffScore: number = playersRoundScores
    .map((score) => score.diff)
    .sort()[0];
  const winners: Player[] = playersRoundScores
    .filter((score) => score.diff === minDiffScore)
    .map((score) => score.player);
  return getRandomItemFromArray(winners);
}

export function calculateRoundScores(
  newState: GameState,
  currentPlayer: Player,
  asaf: boolean
): PlayerRoundScore[] {
  return getActivePlayers(newState).map((player) => {
    let score = cardsScore(player.cards);
    if (player.id === currentPlayer.id) {
      score = asaf ? 30 + cardsScore(player.cards) : 0;
    }
    const lastTotalScore = player.totalScore;
    player.totalScore += score;
    const zeroed = score !== 0 && player.totalScore % 50 === 0;
    if (zeroed) {
      player.totalScore -= 50;
    }
    const diff = player.totalScore - lastTotalScore;
    return { player, score, diff } as PlayerRoundScore;
  });
}

export function getMinScoreWinners(
  otherPlayers: Player[],
  currentPlayer: Player
): Player {
  const sortedScores = otherPlayers
    .map((player) => cardsScore(player.cards))
    .sort();
  const otherPlayersMinScore = sortedScores[0];
  const asaf = otherPlayersMinScore <= cardsScore(currentPlayer.cards);
  const winnerPlayers: Player[] = !asaf
    ? [currentPlayer]
    : otherPlayers.filter(
        (player) => cardsScore(player.cards) === otherPlayersMinScore
      );
  return getRandomItemFromArray(winnerPlayers);
}

export function getCardFromPile(gameState: GameState, cardToTake: Card): Card {
  return getThrownCards(gameState)?.find((card) => card === cardToTake) as Card;
}

export function getCardFromDeck(gameState: GameState): Card {
  return getRandomItemFromArray(gameState.deck, true);
}

export function setNextPlayer(gameState: GameState): void {
  gameState.currentPlayer = getNextPlayer(gameState);
}

export function getShuffledDeckCards(): Card[] {
  return getInitDeckCards()
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function getInitDeckCards(): Card[] {
  const initDeck = [] as Card[];
  CardValuesMap.forEach((cardValue: CardValue, valueEnum: CardValueEnum) => {
    CardSymbolsMap.forEach(
      (cardSymbol: CardSymbol, symbolEnum: CardSymbolEnum) => {
        if (
          symbolEnum !== CardSymbolEnum.Joker &&
          valueEnum !== CardValueEnum.Joker
        ) {
          initDeck.push({
            value: cardValue,
            symbol: cardSymbol,
            selected: false,
          });
        }
      }
    );
  });

  const jokerCardSymbol = CardSymbolsMap.get(
    CardSymbolEnum.Joker
  ) as CardSymbol;
  const jokerCardValue = CardValuesMap.get(CardValueEnum.Joker) as CardValue;
  initDeck.push(
    {
      value: jokerCardValue,
      symbol: { ...jokerCardSymbol, color: "red" },
      selected: false,
    },
    {
      value: jokerCardValue,
      symbol: { ...jokerCardSymbol, color: "black" },
      selected: false,
    }
  );
  return initDeck;
}

export function getNextPlayer(gameState: GameState): Player {
  const currentPlayer = gameState.currentPlayer as Player;
  const currentIndex = getActivePlayers(gameState).indexOf(currentPlayer);
  const nextIndex = (currentIndex + 1) % getActivePlayers(gameState).length;
  return getActivePlayers(gameState)[nextIndex];
}

export function startGame(gameState: GameState) {
  const newState = { ...gameState };
  newState.status = GameStatus.running;
  newState.players.forEach((player) => {
    player.totalScore = 0;
    player.isOut = false;
  });
  const startingPlayer = getRandomItemFromArray(newState.players);
  return startNewRound(newState, startingPlayer);
}

export function getRandomItemFromArray<T>(
  array: T[],
  removeItem: boolean = false
): T {
  const item = array[Math.floor(Math.random() * array.length)];
  if (removeItem) {
    array.splice(array.indexOf(item), 1);
  }
  return item;
}

export function startNewRound(
  gameState: GameState,
  startingPlayer: Player
): GameState {
  const newState = { ...gameState };
  if (isGameOver(newState)) {
    newState.status = GameStatus.gameOver;
    return newState;
  }
  updateActivePlayers(newState);
  dealCards(newState);
  newState.currentPlayer = startingPlayer;
  newState.status = GameStatus.newRound;
  return newState;
}

export function isGameOver(gameState: GameState): boolean {
  const activePlayersWithValidScore = getActivePlayers(gameState).filter(
    (player) => player.totalScore <= (gameState?.config.scoreLimit as number)
  );
  return activePlayersWithValidScore.length < 2;
}

function getActivePlayers(gameState: GameState): Player[] {
  return gameState.players.filter((player) => !player.isOut);
}

function dealCards(gameState: GameState): void {
  gameState.deck = getShuffledDeckCards();
  gameState.players.forEach((player) => {
    player.cards = player.isOut
      ? undefined
      : gameState.deck?.splice(0, gameState.config.cardsPerPlayer);
  });
  const cardToStart = getCardFromDeck(gameState);
  gameState.moves = [
    {
      cards: [cardToStart],
    },
  ];
}

function updateActivePlayers(gameState: GameState): void {
  getActivePlayers(gameState).forEach((player) => {
    if (player.totalScore > gameState.config.scoreLimit) {
      player.isOut = true;
    }
  });
}
