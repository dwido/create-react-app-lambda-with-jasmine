import React from 'react';
import { Player } from '../game/game.model';
import './avatar.component.scss';

interface AvatarProps {
    player: Player;
    isCurrentPlayer?: boolean;
}

const AvatarComponent: React.FC<AvatarProps> = ({ player, isCurrentPlayer = false }) => {
    return (
        <div className="avatar-container">
        <img src={player.img} alt="" className={`avatar-img ${isCurrentPlayer ? 'current-player' : ''}`} />
    <h2>{player.name.slice(0, 10)}</h2>
    {player.totalScore !== undefined && (
        <div className="score">
            <h1>{player.totalScore}</h1>
            </div>
    )}
    </div>
);
};

export default AvatarComponent;
