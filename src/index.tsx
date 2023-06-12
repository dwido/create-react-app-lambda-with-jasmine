import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AwesomeContextProvider } from './store/ctx';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<AwesomeContextProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</AwesomeContextProvider>
);
