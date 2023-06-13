import React, { useEffect, useState } from 'react';
import { GameController } from './game.controller';
import { GameValidator } from './game.validator';
import { GameEvents } from './game.events';
import { takeUntil } from 'rxjs/operators';
import { Card, GameState, GameStatus, getThrownCards, Player } from './game.model';
import './game.component.scss';
import {Subject} from "rxjs";
import {gameSounds} from "./game.sounds";

interface GameComponentProps {
    gameState: GameState;
    player: Player;
}

const GameComponent: React.FC<GameComponentProps> = ({ gameState, player }) => {
    const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);
    const [timerInterval, setTimerInterval] = useState<number>();
    const dialogPosition = { top: '300px' };

    const gameService = new GameController(new GameValidator, new GameEvents);
    const cardsValidator = new GameValidator();
    const gameEvents = new GameEvents();
    const ngUnsubscribe: Subject<void> = new Subject<void>();
    useEffect(() => {
        initGameEvents();

        setTimeout(() => {
            const player1 = {
                name: 'Shamib',
                id: 'asd',
                img: '../../assets/avatar2.png',
                isComputerPlayer: true
            } as Player;
            gameService.addPlayer(gameState, player1);
        }, 500);

        setTimeout(() => {
            const player2 = {
                name: 'Dodik',
                id: 'fasdf',
                img: '../../assets/avatar3.png',
                isComputerPlayer: true
            } as Player;
            gameService.addPlayer(gameState, player2);
        }, 1000);

        setTimeout(() => {
            const player3 = {
                name: 'Kaduri',
                id: '2dsfx',
                img: '../../assets/avatar4.png',
                isComputerPlayer: true
            } as Player;
            gameService.addPlayer(gameState, player3);
        }, 2000);

        setTimeout(() => {
            gameService.startGame(gameState);
        }, 3000);

        return () => {
            alert('destroyed')
            ngUnsubscribe.complete()
            stopTimer();
        };
    }, []);

    const isCurrentPlayer = (player: Player): boolean => {
        return gameState?.currentPlayer?.id === player.id;
    };

    const opponents = gameState.players?.filter((player) => player.id !== player.id) ?? [];

    const opponentTop = opponents.length === 1 ? opponents[0] : opponents.length === 3 ? opponents[1] : undefined;
    const opponentLeft = opponents.length > 1 ? opponents[0] : undefined;
    const opponentRight = opponents.length > 1 ? opponents[opponents.length - 1] : undefined;
    const thrownCards = getThrownCards(gameState);
    const deckTopCards = gameState.deck.slice(0, 6);
    const showCards = [GameStatus.yaniv, GameStatus.gameOver].includes(gameState.status);

    const makeMove = (cardToTake: Card | null = null): void => {
        if (gameState.currentPlayer?.id === player.id) {
            const selectedCards = player.cards?.filter((c) => c.selected);
            if (selectedCards?.length && cardsValidator.selectedCardsAreValid(selectedCards)) {
                gameService.makeMove(gameState, selectedCards, cardToTake);
            }
        }
    };

    const onPlayerCallYaniv = (): void => {
        gameService.yaniv(gameState);
    };

    const initGameEvents = (): void => {
        gameEvents.gameStateUpdate.pipe(takeUntil(ngUnsubscribe)).subscribe((gameStatus: GameState) => {
            onGameStateUpdate(gameStatus);
        });
    };

    const onGameStateUpdate = (gameStatus: GameState): void => {
        gameState = gameStatus;
        gameSounds.tikTokAudio.pause();
        gameSounds.tikTokAudio.currentTime = 0;
        if (isCurrentPlayer(player)) {
            gameSounds.shortBellAudio.play().catch();
        }
        switch (gameState.status) {
            case GameStatus.move:
                gameSounds.deckCardAudio.play().catch();
                break;

            case GameStatus.newRound:
                gameSounds.shuffleCardsAudio.play().catch();
                break;

            case GameStatus.gameOver:
                onGameOver();
                break;

            case GameStatus.yaniv:
                onYaniv();
                break;
        }

        player = gameState.players.find((player) => player.id === player.id) as Player;
        startTimer();
    };

    const stopTimer = (): void => {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        setTimeLeft(undefined);
    };

    const startTimer = (): void => {
        stopTimer();
        if (![GameStatus.newRound, GameStatus.move].includes(gameState.status)) {
            return;
        }
        setTimeLeft(gameState.config.moveTimeoutInMS / 1000);
        setTimerInterval(
            window.setInterval(() => {
                if (timeLeft as number > 0) {
                    setTimeLeft((timeLeft as number) - 1);
                } else {
                    clearInterval(timerInterval);
                }
            }, 1000)
        );
    };

    const onGameOver = (): void => {
        gameSounds.gameOverAudio.play().catch();
        const result = gameState.roundsResults[gameState.roundsResults.length - 1];
        // dialog.open(DialogComponent, {
        //     position: dialogPosition,
        //     data: {
        //         title: 'GAME OVER!',
        //         content: `${result.winner.name} Wins!`
        //     } as DialogData
        // });
    };

    const onYaniv = (): void => {
        gameSounds.yanivAudio.play().catch();
        const result = gameState.roundsResults[gameState.roundsResults.length - 1];
        if (result.asaf) {
            setTimeout(() => {
                gameSounds.asafAudio.play().catch();
            }, 1200);
        }
        const resultScoresString = result.playersRoundScores
            .map((playerScore) => `${playerScore.player.name}: ${playerScore.score} \n`)
            .join('');
        setTimeout(() => {
            if (gameState.status !== GameStatus.gameOver) {
                // dialog.closeAll();
            }
        }, 5000);

        let title = result.asaf ? 'Asaf!' : 'Yaniv!';
        title = `${title} ${result.winner.name} Wins!`;

        // dialog.open(DialogComponent, {
        //     position: dialogPosition,
        //     data: {
        //         title,
        //         content: resultScoresString
        //     } as DialogData
        // });
    };

    return (
        <div className="game-container">
            <div className="top-container">
                {/* Timer component goes here */}
            </div>
            <div className="opponents-container">
                <div className="opponent-top-container">
                    {/* Opponent component for opponentTop goes here */}
                </div>
                <div className="opponents-center-container">
                    <div className="opponent-side-container">
                        {/* Opponent component for opponentLeft goes here */}
                    </div>
                    <div className="pile-deck-container">
                        <div className="deck-container" onClick={() => makeMove()} style={{ display: gameState.deck?.length ? 'block' : 'none' }}>
                            {/* Cards in deck go here */}
                        </div>
                        <div className="pile-container" style={{ display: thrownCards?.length ? 'block' : 'none' }}>
                            {/* Cards in pile go here */}
                        </div>
                    </div>
                    <div className="opponent-side-container">
                        {/* Opponent component for opponentRight goes here */}
                    </div>
                </div>
                <div className="player-container">
                    {/* Player component goes here */}
                </div>
            </div>
        </div>
    );
};

export default GameComponent;
