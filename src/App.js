/** @format */

import React, { useState } from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { useQuery } from 'react-query';
// import logo from './logo.svg';
import './App.css';
const fetchExchange = async (currency) => {
	const response = await fetch(
		`https://api.ratesapi.io/api/latest?base=${currency}`
	);
	const data = await response.json();
	return data;
};
const Exchange = () => {
	const [currency, setCurrency] = useState('CAD');
	const { status, data, error } = useQuery(currency, fetchExchange, {
		refetchOnWindowFocus: false,
	});
	if (status === 'loading')
		return (
			<div className='ui segment'>
				<div className='ui active dimmer'>
					<div className='ui indeterminate text loader'>Preparing Files</div>
				</div>
				<p></p>
			</div>
		);
	if (status === 'error') return <div>Error: {JSON.stringify(error)}</div>;
	return (
		<div>
			<button className='ui olive button' onClick={() => setCurrency('USD')}>
				USD
			</button>
			<button className='ui green button' onClick={() => setCurrency('CAD')}>
				CAD
			</button>
			<button className='ui pink button' onClick={() => setCurrency('EUR')}>
				EUR
			</button>
			<h1>
				Showing currency :{currency}
				<i
					className={`${currency
						.substring(0, currency.length - 1)
						.toLowerCase()} flag`}></i>
			</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>;
		</div>
	);
};
const App = () => {
	return (
		// <div className='App'>
		// 	<header className='App-header'>
		// 		<img src={logo} className='App-logo' alt='logo' />
		// 		<p>
		// 			Edit <code>src/App.js</code> and save to reload.
		// 		</p>
		// 		<a
		// 			className='App-link'
		// 			href='https://reactjs.org'
		// 			target='_blank'
		// 			rel='noopener noreferrer'>
		// 			Learn React
		// 		</a>
		// 	</header>
		// </div>
		<div className='App'>
			<Exchange />
			<ReactQueryDevtools initialIsOpen={false} />
		</div>
	);
};

export default App;
