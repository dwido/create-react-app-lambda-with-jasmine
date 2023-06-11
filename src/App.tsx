import './App.css';
import { useGameContext } from './store/ctx';
import Button from './UI/Button';

const App = () => {
	const ctx = useGameContext();
	const onBtnClick = () => {
		console.log('ctx', ctx);
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<p>
					Edit <code>src/App.js</code> and save to hello everyone this is the
					new yaniv.
				</p>
				<Button onClick={onBtnClick} txt='This is my new custom button' />
			</header>
		</div>
	);
};

export default App;
