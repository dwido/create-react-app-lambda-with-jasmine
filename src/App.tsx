import './App.css';
import Button from './UI/Button';
import Singleplayer from "./UI/Singleplayer";
import {useState} from "react";
import Multiplayer from "./UI/Multiplayer";

const App = () => {
	const [showSingle, setShowSingle] = useState<boolean | null>(null);
	const onSingleBtnClick = () => {
		setShowSingle(true);
	};

	const deck = getInitDeckCards();
	console.log("card: ", deck[0]);
	const timer = 10;

	const player = {
		id: '1',
		name: 'David',
		img: avatar1,
		isOut: false,
		totalScore: 20,
		isComputerPlayer: false,
	}


	return (
		<div className='App'>
			<header className='landing-page-header header'>
				{ showSingle === null  ? <div>
					<h1>Welcome to Yaniv game</h1>
					<h3>Which way do you want to play? </h3>
					{/*<Dialog*/}
				{/*	isOpen={isDialogOpen}*/}
				{/*	onClose={closeDialog}*/}
				{/*	title="Dialog Title"*/}
				{/*	content="This is the dialog content."*/}
				{/*/>*/}
				<Button onClick={onSingleBtnClick} txt='Singleplayer' />
					<Button onClick={onMultiBtnClick} txt='Multiplayer' />
				</div> : null}
				{ showSingle ? <Singleplayer /> : null }
				{ showSingle === false ? <Multiplayer /> : null }
			</header>
		</div>
	);
};

export default App;
