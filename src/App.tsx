import './App.css';
import { useGameContext } from './store/ctx';
import Button from './UI/Button';
import CardComponent from "./card/CardComponent";
import {getInitDeckCards} from "./game/game.reducer";
import TimerComponent from './timer/timer.controller';

const App = () => {
	const ctx = useGameContext();
	const onBtnClick = () => {
		console.log('ctx', ctx);
	};

	const deck = getInitDeckCards();
	console.log("card: ", deck[0]);
	const timer = 10;

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
				<TimerComponent timeLeft={timer}></TimerComponent>
			</header>
		</div>
	);
};

export default App;
