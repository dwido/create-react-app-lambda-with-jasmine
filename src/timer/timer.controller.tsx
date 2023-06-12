import React, { useEffect } from 'react';
import { gameSounds } from '../game/game.sounds';
import './timer.component.scss';

interface TimerProps {
    timeLeft?: number;
}

const TimerComponent: React.FC<TimerProps> = ({ timeLeft }) => {
    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft === 5) {
                gameSounds.tikTokAudio.play().catch();
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [timeLeft]);

    return (
        <div className={`timer ${timeLeft !== undefined ? '' : 'hidden'}`}>
    <p>{timeLeft}</p>
    </div>
);
};

export default TimerComponent;
