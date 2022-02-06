/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';
import './styles/index.css';
import App from './components/App';
// import Pokemon from './components/Pokemon';
// import * as serviceWorker from './serviceWorker';
// const queryClient = new QueryClient();
const rootElement = document.querySelector('#root');
ReactDOM.render(
	<React.StrictMode>
		{/* <QueryClientProvider client={queryClient}> */}
		<App />
		{/* <Pokemon /> */}
		{/* </QueryClientProvider> */}
	</React.StrictMode>,
	rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
