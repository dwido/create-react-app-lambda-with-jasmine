import './App.css';
import { useGameContext } from './store/ctx';
import Button from './UI/Button';
import CardComponent from "./card/CardComponent";
import {getInitDeckCards} from "./game/game.reducer";
import TimerComponent from './timer/timer.controller';
import AvatarComponent from "./avatar/avatar.controller";
import avatar1 from "./avatar/images/avatar1.png";
import avatar3 from "./avatar/images/avatar3.png";
import OpponentComponent from "./opponent/OpponentComponent";

const App = () => {
	const ctx = useGameContext();
	const onBtnClick = () => {
		console.log('ctx', ctx);
	};

	const deck = getInitDeckCards();
	console.log("card: ", deck[0]);
	const timer = 10;

	const { isOpen, handleClose, props } = dialog.useDialogController('dialogName');

	const player = {
		id: '1',
		name: 'David',
		img: avatar1,
		isOut: false,
		totalScore: 20,
		isComputerPlayer: false,
	}

	const opponent = { ...player, name: 'Alaa', img: avatar3}
	const isDialogOpen = true
	const closeDialog = () => {}

	return (
		<div className='App'>
			<header className='App-header'>
				<p>
					Edit <code>src/App.js</code> and save to hello everyone this is the
					new yaniv.
				</p>
				{/*<Dialog*/}
				{/*	isOpen={isDialogOpen}*/}
				{/*	onClose={closeDialog}*/}
				{/*	title="Dialog Title"*/}
				{/*	content="This is the dialog content."*/}
				{/*/>*/}
				<Button onClick={onBtnClick} txt='This is my new custom button' />
				<OpponentComponent player={opponent}></OpponentComponent>
				<AvatarComponent player={player}></AvatarComponent>
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
