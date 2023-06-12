import React from 'react';
import './Card.scss';
import {Card} from "../game/game.model";

interface CardComponentProps {
  card: Card;
  isActive?: boolean;
  flipped?: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({
                                                       card,
                                                       isActive = false,
                                                       flipped = false
                                                     }) => {
  return (
    <div className={`card-container ${isActive ? 'card-active' : ''} ${flipped ? 'flipped' : ''}`}>
      <div className="card-inner">
        <div className={`card card-${card.symbol.color} ${card.selected ? 'card-selected' : ''}`}>
          <div className="card-symbol">{card.symbol.icon}</div>
          <div className="card-value">{card.value.text}</div>
        </div>
        <div className="card card-back"></div>
      </div>
    </div>
  );
};

export default CardComponent;
