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

	const onMultiBtnClick = () => {
		setShowSingle(false);
	};


	return (
		<div className='App'>
			<header className='landing-page-header header'>
				{ showSingle === null  ? <div>
					<h1>Welcome to Yaniv game</h1>
					<h3>Which way do you want to play? </h3>
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
