import React from 'react';
import { cardsScore, getSortedCards, Player } from '../game/game.model';
import AvatarComponent from '../avatar/avatar.controller';
import CardComponent from '../card/CardComponent';
import './opponent.component.scss';

interface OpponentProps {
    player: Player;
    showCards?: boolean;
    isCurrentPlayer?: boolean;
    opponentClass?: string;
    cardsClass?: string;
}

const OpponentComponent: React.FC<OpponentProps> = ({
                                                        player,
                                                        showCards = false,
                                                        isCurrentPlayer = false,
                                                        opponentClass,
                                                        cardsClass,
                                                    }) => {
    const sortedCards = getSortedCards(player.cards);

    return (
        <div className={`opponent-container ${opponentClass}`}>
            <AvatarComponent player={player} isCurrentPlayer={isCurrentPlayer} />

            {!player.isOut && player.cards && (
                <>
                    <div className={`opponent-cards-container ${cardsClass}`}>
                        {sortedCards?.map((card) => (
                            <div className="opponent-card">
                                <CardComponent key={card.symbol.icon+card.value.text} card={card} flipped={!showCards}  />
                            </div>
                        ))}
                    </div>

                    {showCards && (
                        <div className="hand-score">
                            <h2>{cardsScore(player.cards)}</h2>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default OpponentComponent;
