import React, { useEffect } from 'react';
import {Card, cardsScore, getSortedCards, Player} from "../game/game.model";
import {GameValidator} from "../game/game.validator";
import CardComponent from "../card/CardComponent";
import Sounds from "../sounds/sounds";
import AvatarComponent from "../avatar/avatar.controller";

interface PlayerComponentProps {
  player: Player;
  isCurrentPlayer: boolean;
  yanivThreshold: number;
  opponentClass?: string;
  yanivClick: () => void;
}

const PlayerComponent: React.FC<PlayerComponentProps> = ({
                                                           player,
                                                           isCurrentPlayer,
                                                           yanivThreshold,
                                                           opponentClass,
                                                           yanivClick
                                                         }) => {
  const cardsValidator = new GameValidator();
  const gameSounds = new Sounds();

  useEffect(() => {
    return () => {
      // Cleanup logic here (if any)
    };
  }, []);

  const handleCardClick = (card: Card) => {
    const isValidSelection =
      player.cards && cardsValidator.cardSelectionIsValid(card, player.cards);
    if (isValidSelection) {
      gameSounds.cardClickAudio.play().catch();
    }
    card.selected = !card.selected && isValidSelection;
  };

  const sortedCard = player.cards && getSortedCards(player.cards);

  return (
    <div className={`player-container ${opponentClass}`}>
      <div className="cards-container">
        {player.cards && (
          <>
            {sortedCard?.map((card, index) => (
              <CardComponent
                key={index}
                card={card}
                isActive={true}
                onClick={() => handleCardClick(card)}
              />
            ))}
          </>
        )}
      </div>
      <div className="avatar-yaniv-btn-container">
        <AvatarComponent player={player} isCurrentPlayer={isCurrentPlayer} />
        {player.cards && (
          <div className="yaniv-button-container">
            <button
              disabled={
                cardsScore(player.cards) > yanivThreshold || !isCurrentPlayer
              }
              onClick={yanivClick}
            >
              <span className="material-icons">campaign</span>
            </button>
            <div className="hand-score">
              <h2>{cardsScore(player.cards)}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerComponent;
