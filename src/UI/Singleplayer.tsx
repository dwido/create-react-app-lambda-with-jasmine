import "../App.css"
import {useGameContext} from "../store/ctx";
import {getInitDeckCards} from "../game/game.reducer";
import Button from "./Button";
import CardComponent from "./CardComponent";

const Singleplayer = () => {
    const ctx = useGameContext();
    const onBtnClick = () => {
        console.log('ctx', ctx);
    };

    const deck = getInitDeckCards();
    console.log("card: ", deck[0]);

    return (
        <div className='App'>
            <header className='App-header'>
                <p>
                    Edit <code>src/App.js</code> and save to hello everyone this is the
                    new yaniv.
                </p>
                <Button onClick={onBtnClick} txt='This is my new custom button' />
                <CardComponent card={deck[0]} />
                {deck.map((card) => (
                    <CardComponent
                        card={card}
                    />
                ))}
            </header>
        </div>
    );
};

export default Singleplayer;